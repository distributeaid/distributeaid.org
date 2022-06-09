module.exports = regionAndImageResolvers = ({ createResolvers, getNode }) => {
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

      map: {
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
      },
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

      // NOTE: Same as resolver for DARegion.map above.
      // TODO: Refactor into a graphql fragment or reusable function.
      map: {
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
      },
    },
  }

  createResolvers(resolvers)
}
