var minimatch = require('minimatch')
const path = require('path')

module.exports = onCreateNode = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode,
}) => {
  const { createNode, createNodeField } = actions

  /*
  Forestry Data
  ================================================================================
  */
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath &&
    minimatch(node.fileAbsolutePath, '**/content/**/*.md')
  ) {
    const fm = node.frontmatter

    /*
    Regions
    ------------------------------------------------------------
    */
    if (
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/index.md')
    ) {
      const fileRelativePath = path.join(
        'content',
        getNode(node.parent).relativePath,
      )

      createNode({
        // Node Data
        name: fm.name,
        overview: fm.overview,
        governmentResponse: fm.governmentResponse,
        newsUpdates: fm.newsUpdates,
        stayInformed: fm.stayInformed,
        subregionFileRelativePaths: fm.subregions,

        // Metadata
        fileRelativePath: fileRelativePath,
        mapFileRelativePath: fm.map,

        // Gatsby Fields
        id: createNodeId(`DA Region - ${fm.name}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DARegion',
          contentDigest: createContentDigest(fm),
        },
      })
    } else if (
      /*
    Subregions
    ------------------------------------------------------------
    */
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/!(index).md')
    ) {
      const fileRelativePath = path.join(
        'content',
        getNode(node.parent).relativePath,
      )

      createNode({
        // Node Data
        name: fm.name,
        overview: fm.overview,
        population: fm.population,
        newsUpdates: fm.newsUpdates,

        // Metadata
        fileRelativePath: fileRelativePath,
        mapFileRelativePath: fm.map,

        // Gatsby Fields
        id: createNodeId(`DA Subregion - ${fm.name}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DASubregion',
          contentDigest: createContentDigest(fm),
        },
      })
    } else if (
      /*
    Team Roles
    ------------------------------------------------------------
    */
      minimatch(node.fileAbsolutePath, '**/content/blocks/roles/*.md')
    ) {
      const fileRelativePath = path.join(
        'content',
        getNode(node.parent).relativePath,
      )

      createNode({
        // Node Data
        title: fm.title,
        desc: fm.desc,
        location: fm.location,
        domain: fm.domain,
        commitment: fm.commitment,
        team: fm.team,

        // Metadata
        fileRelativePath: fileRelativePath,

        // Gatsby Fields
        id: createNodeId(
          `DA Team Role - ${fm.title} ${fm.location}  ${fm.commitment} ${fm.team}`,
        ),
        parent: node.id,
        children: [],
        internal: {
          type: 'DATeamRole',
          contentDigest: createContentDigest(fm),
        },
      })
    } else if (
      /*
    Team Members
    ------------------------------------------------------------
    */
      minimatch(node.fileAbsolutePath, '**/content/blocks/members/*.md')
    ) {
      const fileRelativePath = path.join(
        'content',
        getNode(node.parent).relativePath,
      )

      const roleData = fm.roles.map((role) => {
        return {
          fileRelativePath: role.role,
          start: role.start,
          end: role.end,
          isActive: role.end === null,
          role: null,
        }
      })

      createNode({
        // Node Data
        name: fm.name,
        bio: fm.bio,
        link: fm.link,
        beyondDA: fm.beyondDA,
        pronouns: fm.pronouns,

        // Metadata
        fileRelativePath: fileRelativePath,
        profilePhotoFileRelativePath: fm.profilePhoto,
        roleData: roleData,

        // Gatsby Fields
        id: createNodeId(`DA Team Member - ${fm.name}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DATeamMember',
          contentDigest: createContentDigest(fm),
        },
      })
    } else {
      // do nothing for other markdown remark types
    }

    /*
  Json Data
  ================================================================================
  */

    /*
  Line Items
  ------------------------------------------------------------
  */
  } else if (node.internal.type === 'CombinedManifestsJson') {
    const rawValue = node['$ Total']
    const value = parseFloat(rawValue?.replaceAll(/[\$,]/g, ''))
    const count = parseInt(node['Count']?.replaceAll(/[\,|\.]/g, ''))
    if (value && !isNaN(value) && count && !isNaN(count)) {
      const rawShipment = node['Shipment #']
      const shipmentComponents = rawShipment.match(
        /^(\d{2})-(\d{3})-([A-Z]{3})-([A-Z]{3})$/,
      )
      const shipment =
        shipmentComponents !== null
          ? {
              year: shipmentComponents[1],
              number: shipmentComponents[2],
              origin: shipmentComponents[3],
              destination: shipmentComponents[4],
            }
          : undefined
      const item = {
        category: node['Category'],
        item: node['Item'],
        ageGender: node['Age / Gender'],
        sizeStyle: node['Size / Style'],
      }
      createNode({
        // Node Data
        value,
        count,
        rawShipment,
        shipment,
        item,

        // Gatsby Fields
        id: createNodeId(`DA LineItem - ${node.id}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DaLineItem',
          contentDigest: createContentDigest(`${value} ${shipment}`),
        },
      })
    } else {
      console.warn(`Line Item missing value, raw value: ${rawValue}`)
    }
    // Other Pages
  }
}
