const Promise = require('bluebird')
const path = require('path')
const PageTreeTraversal = require('./src/utils/PageTreeTraversal.js')
const { spawn } = require('child_process')

/*
Run Scripts After Build
================================================================================
*/
exports.onCreateDevServer = async ({ reporter }) => {
  const genTypes = await spawn('yarn', ['run', 'gen-types'], {
    stdio: 'inherit',
    shell: true,
  })
  genTypes.on('exit', (code) => {
    if (code === 0) {
      reporter.success(
        'graphql-codegen: types generated from gatsby graphql endpoint',
      )
    } else {
      reporter.error(`graphql-codegen: exited with code ${code}`)
    }
  })
}

/*
Dynamic Pages
================================================================================
*/
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /*
  Site Metadata
  ------------------------------------------------------------
  */
  const metadataResult = await graphql(`
    {
      site {
        siteMetadata {
          domain
        }
        pathPrefix
      }
    }
  `)

  if (metadataResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the siteMetadata set in gatsby-config.js.
    `)
    return
  }

  const domain = metadataResult.data.site.siteMetadata.domain
  const pathPrefix = metadataResult.data.site.pathPrefix

  /*
  Site Data
  ------------------------------------------------------------
  */
  const siteResult = await graphql(
    `
      query Site {
        contentfulSiteSite(domain: {eq: "${domain}"}) {
          contentful_id
          title
          domain

          theme

          homePage {
            contentful_id
          }
        }
      }

    `,
  )

  if (siteResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the Site data from Contentful.
    `)
    return
  }

  const site = siteResult.data.contentfulSiteSite

  /*
  Pages Data
  ------------------------------------------------------------
  */
  const pagesResult = await graphql(
    `
      query Pages {
        allContentfulSitePage {
          nodes {
            contentful_id
            title
            slug

            flavor
            layout

            leadsTo {
              contentful_id
            }
          }
        }
      }
    `,
  )

  if (pagesResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the Pages data from Contentful.
    `)
    return
  }

  const pages = pagesResult.data.allContentfulSitePage.nodes

  /*
  Process The Site's Structure
  ------------------------------------------------------------
  */

  // create a page lookup by contentful_id
  //
  // ````
  // pageLookup = {contenful_id: page, ...}
  // pageLookup[contentful_id] = page | null
  // ````
  const pageLookup = pages.reduce((pageLookupAcc, page) => {
    pageLookupAcc[page.contentful_id] = page
    return pageLookupAcc
  }, {})

  // build a tree of pages by linking parent & child pages,
  // and link em all to the site
  //
  // ```
  // page.siteID = siteID
  // parent.leadsTo  = [child, ...] | []
  // child.comesFromID = parentID | homePageID | null
  // ```
  pages.forEach((page) => {
    // link each page to the site
    page.siteID = site.contentful_id

    // setup empty child pointers for leaf pages
    if (page.leadsTo === null) {
      page.leadsTo = []
    }

    // set pointers from child -> parent pages to traverse up
    const parent = page
    parent.leadsTo = parent.leadsTo.map(({ contentful_id }) => {
      child = pageLookup[contentful_id]
      child.comesFromID = parent.contentful_id
      return child
    })
  })

  // Setup the homepage as the root, the finishing touch on our page tree.
  //
  // ```
  // site.homePage = homePage
  //
  // homePage.site = site
  // homePage.comesFromID = null
  // homePage.leadsTo = [topLevelPage, ...]
  // homePage.slug = ''
  //
  // topLevelPage.comesFromID = homePageID
  // ```
  //
  // NOTE: The homepage's slug is overridden, as it must be empty and it's the
  //       only page that may have an empty slug.
  //
  // NOTE: The homepage must have `comesFromID` set to `null`, and is the only
  //       page that should.
  site.homePageID = site.homePage.contentful_id
  homePage = pageLookup[site.homePageID]
  homePage.slug = ''
  homePage.comesFromID = null
  homePage.leadsTo = pages.filter(
    (page) => page !== homePage && page.comesFromID == null,
  )
  homePage.leadsTo.forEach((page) => {
    page.comesFromID = homePage.contentful_id
  })

  /*
  Set Tree-Based Page Properties
  ------------------------------------------------------------
    - path
    - breadcrumbIDs
  */
  PageTreeTraversal.preorderDFS(homePage, (page) => {
    // root page
    if (page.contentful_id === site.homePageID) {
      page.path = '/'
      page.breadcrumbIDs = [page.contentful_id]
    }

    // parent page
    else if (page.leadsTo.length > 0) {
      parent = pageLookup[page.comesFromID]
      page.path = `${parent.path}${page.slug}/`
      page.breadcrumbIDs = [...parent.breadcrumbIDs, page.contentful_id]
    }

    // leaf page
    else {
      parent = pageLookup[page.comesFromID]
      page.path = `${parent.path}${page.slug}`
      page.breadcrumbIDs = [...parent.breadcrumbIDs, page.contentful_id]
    }
  })

  /*
  Create Content Pages
  ------------------------------------------------------------
  */
  const pageLayouts = {
    home: path.resolve(`./src/templates/MainPage.tsx`),
    main: path.resolve(`./src/templates/MainPage.tsx`),
    tabs: path.resolve(`./src/templates/TabPage.tsx`),
  }
  PageTreeTraversal.BFS(homePage, (page) => {
    layout = pageLayouts.main

    // unique homepage layout
    if (page.contentful_id === site.homePageID) {
      layout = pageLayouts.home
    }

    // tab pages (parent & children)
    else if (
      page.layout === 'Tabs' ||
      pageLookup[page.comesFromID].layout === 'Tabs'
    ) {
      layout = pageLayouts.tabs
    }

    // make the page
    createPage({
      path: page.path,
      component: layout,
      context: {
        site: site,
        pages: pages,
        pageLookup: pageLookup,
        page: page,

        // page query params
        pageContentfulId: page.contentful_id,
      },
    })
  })

  /*
  Create Data-Drive Pages: Regions
  ------------------------------------------------------------
  */
  const regionsResult = await graphql(
    `
      query Regions {
        allContentfulDataGeoRegion {
          nodes {
            contentful_id
            slug
          }
        }
      }
    `,
  )

  if (regionsResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the region data from Contentful.
    `)
    return
  }

  const regions = regionsResult.data.allContentfulDataGeoRegion.nodes
  regions.forEach((region) => {
    createPage({
      path: 'where-we-work/' + region.slug,
      component: path.resolve(`./src/templates/RegionPage.tsx`),
      context: {
        regionContentfulId: region.contentful_id,
      },
    })
  })

  /*
  Create Data-Drive Pages: Shipments
  ------------------------------------------------------------
  */

  /*
  sendingHubs {
              hub
            }
            receivingHubs {
              hub
            }
            collectionGroups {
              org
            }
            frontlineGroups {
              org
            }
  */

  const shipmentsResult = await graphql(
    `
      query Shipments {
        allContentfulDataImpactShipment {
          nodes {
            contentful_id
            name
            deliveredOn
            totalC02
            totalCommercialValue
            totalDistance
            totalWeight
            numDropoffs
            numPickups
            slug
            fromSubregions {
              region {
                mapPhoto {
                  file {
                    url
                  }
                }
                overview {
                  overview
                }
              }
              overview {
                overview
              }
              slug
            }
            toSubregions {
              region {
                mapPhoto {
                  file {
                    url
                  }
                }
                slug
                overview {
                  overview
                }
              }
              overview {
                overview
              }
            }
          }
        }
      }
    `,
  )

  if (shipmentsResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the shipment data from Contentful.
    `)
    return
  }

  const shipments = shipmentsResult.data.allContentfulDataImpactShipment.nodes
  shipments.forEach((shipment) => {
    const shipmentName = shipment.slug
    createPage({
      path: 'shipment/' + shipmentName,
      component: path.resolve(`./src/templates/ShipmentPage.tsx`),
      context: {
        shipmentContentfulId: shipment.contentful_id,
      },
    })
  })
}

// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
// This should really be handled by Gatsby but here we are
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
