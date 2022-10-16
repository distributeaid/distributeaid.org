import { CreateNodeArgs } from 'gatsby'
import minimatch from 'minimatch'
import path from 'path'

import slugify from '../src/utils/slugify'

import { Region } from '../src/components/regions/RegionComponentTypes'
import { Route } from '../src/components/routes/RouteComponentTypes'

/*
 * Note: some TypeScript errors have been silenced below,
 * to enable type checking for *new* code. Feel free to resolve.
 */

export default {
  /*
  Regions
  ================================================================================
  */
  createRegionsFromMarkdown: ({
    node,
    actions: { createNode },
    createNodeId,
    createContentDigest,
    getNode,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      node.fileAbsolutePath &&
      minimatch(
        node.fileAbsolutePath as string,
        '**/content/pages/regions/*/index.md',
      )
    ) {
      const fm = node.frontmatter as Region

      // @ts-ignore
      const fileNode = getNode(node.parent)
      // @ts-ignore
      const slug = slugify(fileNode.relativeDirectory.split('/').pop())
      // @ts-ignore
      const fileRelativePath = path.join('content', fileNode.relativePath)

      createNode({
        // Node Data
        name: fm.name,
        overview: fm.overview,
        governmentResponse: fm.governmentResponse,
        newsUpdates: fm.newsUpdates,
        stayInformed: fm.stayInformed,
        subregionFileRelativePaths: fm.subregions,

        // navigation
        slug: slug,
        path: `/regions/${slug}/`,

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
    }
  },

  /*
  Subregions
  ================================================================================
  */
  createSubregionsFromMarkdown: ({
    node,
    actions: { createNode },
    createNodeId,
    createContentDigest,
    getNode,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      node.fileAbsolutePath &&
      // @ts-ignore
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/!(index).md')
    ) {
      const fm = node.frontmatter

      // @ts-ignore
      const fileNode = getNode(node.parent)
      // @ts-ignore
      const slug = slugify(fileNode.name)
      // @ts-ignore
      const regionSlug = slugify(fileNode.relativeDirectory.split('/').pop())
      // @ts-ignore
      const fileRelativePath = path.join('content', fileNode.relativePath)

      createNode({
        // Node Data
        name: fm.name,
        overview: fm.overview,
        population: fm.population,
        newsUpdates: fm.newsUpdates,

        // navigation
        slug: slug,
        path: `/regions/${regionSlug}/${slug}/`,

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
    }
  },

  /*
  Routes
  ================================================================================
  */
  createRoutesFromMarkdown: ({
    node,
    actions: { createNode },
    createNodeId,
    createContentDigest,
    getNode,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      node.fileAbsolutePath &&
      // @ts-ignore
      minimatch(node.fileAbsolutePath, '**/content/pages/routes/*.md')
    ) {
      const fm = node.frontmatter as Route

      // @ts-ignore
      const fileNode = getNode(node.parent)
      // @ts-ignore
      const slug = slugify(fileNode.name)
      // @ts-ignore
      const fileRelativePath = path.join('content', fileNode.relativePath)

      createNode({
        // Node Data
        routeOrigin: fm.routeOrigin,
        routeDestination: fm.routeDestination,
        population: fm.population,
        introduction: fm.introduction,
        mapUrl: fm.mapUrl,
        aidRequestFormUrl: fm.aidRequestFormUrl,
        images: {
          deliverySection: fm.images?.deliverySection,
          reservationSection: fm.images?.reservationSection,
          groupsSection: fm.images?.groupsSection,
          storageSection: fm.images?.storageSection,
          palletsSection: fm.images?.palletsSection,
        },
        costs: fm.costs,
        deadlines: fm.deadlines,
        frontlineGroups: fm.frontlineGroups,

        // navigation
        slug: slug,
        path: `/routes/${slug}/`,

        // Metadata
        fileRelativePath: fileRelativePath,

        // Gatsby Fields
        id: createNodeId(`DA Route - ${slug}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DARoute',
          contentDigest: createContentDigest(fm),
        },
      })
    }
  },

  /*
  Team Roles
  ================================================================================
  */
  createTeamRolesFromMarkdown: ({
    node,
    actions: { createNode },
    createNodeId,
    createContentDigest,
    getNode,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      node.fileAbsolutePath &&
      // @ts-ignore
      minimatch(node.fileAbsolutePath, '**/content/blocks/roles/*.md')
    ) {
      const fm = node.frontmatter as any
      const fileRelativePath = path.join(
        'content',
        // @ts-ignore
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
    }
  },

  /*
  Team Members
  ================================================================================
  */
  createTeamMembersFromMarkdown: ({
    node,
    actions: { createNode },
    createNodeId,
    createContentDigest,
    getNode,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      node.fileAbsolutePath &&
      // @ts-ignore
      minimatch(node.fileAbsolutePath, '**/content/blocks/members/*.md')
    ) {
      const fm = node.frontmatter as any
      const fileRelativePath = path.join(
        'content',
        // @ts-ignore
        getNode(node.parent).relativePath,
      )

      // @ts-ignore
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
    }
  },

  /*
  Line Items
  ================================================================================
  */
  createLineItemsFromJson: ({
    node,
    actions: { createNode },
    createNodeId,
    createContentDigest,
  }: CreateNodeArgs) => {
    if (node.internal.type === 'CombinedManifestsJson') {
      const rawValue = node['$ Total']
      // @ts-ignore
      const value = parseFloat(rawValue?.replaceAll(/[\$,]/g, ''))
      // @ts-ignore
      const count = parseInt(node['Count']?.replaceAll(/[\,|\.]/g, ''))
      if (value && !isNaN(value) && count && !isNaN(count)) {
        const rawShipment = node['Shipment #']
        // @ts-ignore
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
        // console.warn(`Line Item missing value, raw value: ${rawValue}`)
      }
    }
  },
} // module.exports
