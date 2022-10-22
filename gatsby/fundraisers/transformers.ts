import { CreateNodeArgs } from 'gatsby'
import minimatch from 'minimatch'
import path from 'path'
import { getObjectProperty } from '../utils/untypedAccess/getObjectProperty'
import { getStringProperty } from '../utils/untypedAccess/getStringProperty'
import { nodeParent } from '../utils/untypedAccess/nodeParent'

/**
 * Creates the fundraiser nodes
 */
export const createFundraisersFromMarkdown = ({
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
      getStringProperty(node, 'fileAbsolutePath'),
      '**/content/blocks/fundraisers/*.md',
    )
  ) {
    const fileRelativePath = path.join(
      'content',
      getStringProperty(getNode(nodeParent(node)), 'relativePath'),
    )
    const fileName = path.parse(fileRelativePath).name

    const fm = getObjectProperty(node, 'frontmatter')
    createNode({
      name: fileName,
      title: fm.title,
      abstract: fm.abstract,
      gallery: fm.gallery,
      allocations: fm.allocations,
      body: node.rawMarkdownBody,
      fileRelativePath,
      id: createNodeId(`Fundraiser - ${fileName}`),
      parent: node.id,
      children: [],
      internal: {
        type: 'DAFundraiser',
        contentDigest: createContentDigest(fm),
      },
    })
  }
}
