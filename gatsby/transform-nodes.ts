import { CreateNodeArgs } from 'gatsby'
import minimatch from 'minimatch'
import path from 'path'
import slugify from '../src/utils/slugify'
import { getObjectProperty } from './utils/untypedAccess/getObjectProperty'
import { getStringProperty } from './utils/untypedAccess/getStringProperty'
import { nodeParent } from './utils/untypedAccess/nodeParent'

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
    reporter,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      'fileAbsolutePath' in node &&
      minimatch(
        getStringProperty(node, 'fileAbsolutePath'),
        '**/content/pages/regions/*/index.md',
      )
    ) {
      try {
        const fileNode = getNode(nodeParent(node))
        const relativeDirectory = getStringProperty(
          fileNode,
          'relativeDirectory',
        )
        const lastPart = relativeDirectory.split('/').pop()
        if (lastPart === undefined)
          throw new Error(`Could not slug from ${relativeDirectory}!`)
        const slug = slugify(lastPart)
        const fileRelativePath = path.join(
          'content',
          getStringProperty(fileNode, 'relativePath'),
        )

        const fm = getObjectProperty(node, 'frontmatter')
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
      } catch (error) {
        reporter.warn((error as Error).message)
      }
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
    reporter,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      'fileAbsolutePath' in node &&
      minimatch(
        getStringProperty(node, 'fileAbsolutePath'),
        '**/content/pages/regions/*/!(index).md',
      )
    ) {
      try {
        const fileNode = getNode(nodeParent(node))
        const slug = slugify(getStringProperty(fileNode, 'name'))
        const relativeDirectory = getStringProperty(
          fileNode,
          'relativeDirectory',
        )
        const lastPart = relativeDirectory.split('/').pop()
        if (lastPart === undefined)
          throw new Error(`Could not slug from ${relativeDirectory}!`)
        const regionSlug = slugify(lastPart)
        const fileRelativePath = path.join(
          'content',
          getStringProperty(fileNode, 'relativePath'),
        )

        const fm = getObjectProperty(node, 'frontmatter')
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
      } catch (error) {
        reporter.warn((error as Error).message)
      }
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
    reporter,
  }: CreateNodeArgs) => {
    if (
      'fileAbsolutePath' in node &&
      minimatch(
        getStringProperty(node, 'fileAbsolutePath'),
        '**/content/pages/routes/*.md',
      )
    ) {
      try {
        const fileNode = getNode(nodeParent(node))
        const slug = slugify(getStringProperty(fileNode, 'name'))
        const fileRelativePath = path.join(
          'content',
          getStringProperty(fileNode, 'relativePath'),
        )

        const fm = getObjectProperty(node, 'frontmatter')
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
      } catch (error) {
        reporter.warn((error as Error).message)
      }
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
    reporter,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      'fileAbsolutePath' in node &&
      minimatch(
        getStringProperty(node, 'fileAbsolutePath'),
        '**/content/blocks/roles/*.md',
      )
    ) {
      try {
        const fileRelativePath = path.join(
          'content',
          getStringProperty(getNode(nodeParent(node)), 'relativePath'),
        )

        const fm = getObjectProperty(node, 'frontmatter')
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
      } catch (error) {
        reporter.warn((error as Error).message)
      }
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
    reporter,
  }: CreateNodeArgs) => {
    if (
      node.internal.type === 'MarkdownRemark' &&
      'fileAbsolutePath' in node &&
      minimatch(
        getStringProperty(node, 'fileAbsolutePath'),
        '**/content/blocks/members/*.md',
      )
    ) {
      try {
        const fileRelativePath = path.join(
          'content',
          getStringProperty(getNode(nodeParent(node)), 'relativePath'),
        )
        const fm = getObjectProperty(node, 'frontmatter')
        const roleData = Array.isArray(fm.roles)
          ? fm.roles.map((role) => ({
              fileRelativePath: role.role,
              start: role.start,
              end: role.end,
              isActive: role.end === null,
              role: null,
            }))
          : []

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
      } catch (error) {
        reporter.warn((error as Error).message)
      }
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
    reporter,
  }: CreateNodeArgs) => {
    if (node.internal.type === 'CombinedManifestsJson') {
      try {
        const rawValue = getStringProperty(node, '$ Total')
        const value = parseFloat(rawValue.replaceAll(/[\$,]/g, ''))
        const count = parseInt(
          getStringProperty(node, 'Count').replaceAll(/[\,|\.]/g, ''),
        )
        if (value && !isNaN(value) && count && !isNaN(count)) {
          const rawShipment = getStringProperty(node, 'Shipment #')
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
        }
      } catch (error) {
        reporter.warn((error as Error).message)
      }
    }
  },
}
