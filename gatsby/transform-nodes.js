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
    }

    // Other Pages
    else {
      // do nothing for now
    }
  }
}
