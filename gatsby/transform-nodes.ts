import { CreateNodeArgs } from 'gatsby'
import minimatch from 'minimatch'
import path from 'path'

import {
  Region,
  Subregion,
} from '../src/components/regions/RegionComponentTypes'
import { Route } from '../src/components/routes/RouteComponentTypes'

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
      const fileRelativePath = path.join(
        'content',
        getNode(node.parent).relativePath,
      )
      const fileNode = getNode(node.parent)
      const slug = fileNode.relativeDirectory.split('/').pop()

      createNode({
        // Node Data
        slug: slug,
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
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/!(index).md')
    ) {
      const fm = node.frontmatter
      const fileNode = getNode(node.parent)
      const fileRelativePath = path.join('content', fileNode.relativePath)
      const slug = fileNode.name

      createNode({
        // Node Data
        slug: slug,
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
      minimatch(node.fileAbsolutePath, '**/content/pages/routes/*.md')
    ) {
      const fm = node.frontmatter as Route
      const fileRelativePath = path.join(
        'content',
        getNode(node.parent).relativePath,
      )
      const fileNode = getNode(node.parent)
      const slug = fileNode.name

      createNode({
        // Node Data
        slug: slug,
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
      minimatch(node.fileAbsolutePath, '**/content/blocks/roles/*.md')
    ) {
      const fm = node.frontmatter as any
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
      minimatch(node.fileAbsolutePath, '**/content/blocks/members/*.md')
    ) {
      const fm = node.frontmatter as any
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
        // console.warn(`Line Item missing value, raw value: ${rawValue}`)
      }
    }
  },
} // module.exports
