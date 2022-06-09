module.exports = createResolvers = ({ createResolvers, getNode }) => {
  const resolvers = {
    DARegion: {
      subregions: {
        type: ['DASubregion'],
        resolve: async (source, args, context, info) => {
          const { entries: subregions } = await context.nodeModel.findAll({
            query: {
              filter: {
                fileRelativePath: { in: source.subregionFileRelativePaths },
              },
            },
            type: 'DASubregion',
          })
          return subregions
        },
      },

      map: imageSharpResolver(getNode),
    },

    DASubregion: {
      region: {
        type: 'DARegion',
        resolve: async (source, args, context, info) => {
          const region = await context.nodeModel.findOne({
            query: {
              filter: {
                subregionFileRelativePaths: { eq: source.fileRelativePath },
              },
            },
            type: 'DARegion',
          })
          return region
        },
      },

      map: imageSharpResolver(getNode),
    },
  }

  createResolvers(resolvers)
}

const imageSharpResolver = (getNode) => {
  return {
    type: 'ImageSharp',
    resolve: async (source, args, context, info) => {
      const file = await context.nodeModel.findOne({
        query: {
          filter: {
            absolutePath: {
              glob: `**/static${source.mapFileRelativePath}`,
            },
          },
        },
        type: 'File',
      })

      const imageSharp = file ? getNode(file.children[0]) : null

      return imageSharp
    },
  }
}
