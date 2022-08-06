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
  // Forestry Files
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath &&
    minimatch(node.fileAbsolutePath, '**/content/**/*.md')
  ) {
    const fm = node.frontmatter
    // Regions
    if (
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/index.md')
    ) {
      const fileRelativePath = path.join(
        'content',
        'pages',
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
    }

    // Subregions
    else if (
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/!(index).md')
    ) {
      const fileRelativePath = path.join(
        'content',
        'pages',
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
    } else {
      // do nothing for other markdown remark types
    }
  } else if (node.internal.type === 'CombinedManifestsJson') {
    const value = parseFloat(node['$ Total']?.replaceAll(/[\$,]/g, ''))
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
