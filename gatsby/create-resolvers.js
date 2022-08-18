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

      map: imageSharpResolver(getNode, 'mapFileRelativePath'),
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

      map: imageSharpResolver(getNode, 'mapFileRelativePath'),
    },

    DATeamMember: {
      roles: {
        type: ['DATeamTenure'],
        resolve: async (source, args, context, info) => {
          const roleFileRelativePaths = source.roleData.map((role) => {
            return role.fileRelativePath
          })

          const results = await context.nodeModel.findAll({
            query: {
              filter: {
                fileRelativePath: { in: roleFileRelativePaths },
              },
            },
            type: 'DATeamRole',
          })
          const entries = Array.from(results.entries)

          const roles = source.roleData.map((role) => {
            const entry = entries.find((entry) => {
              return entry.fileRelativePath === role.fileRelativePath
            })

            return {
              role: entry,
              start: role.start,
              end: role.end,
              isActive: role.isActive,
            }
          })

          return roles
        },
      },

      profilePhoto: imageSharpResolver(getNode, 'profilePhotoFileRelativePath'),
    },
  }

  createResolvers(resolvers)
}

const imageSharpResolver = (getNode, pathKey) => {
  return {
    type: 'ImageSharp',
    resolve: async (source, args, context, info) => {
      const file = await context.nodeModel.findOne({
        query: {
          filter: {
            absolutePath: {
              glob: `**/static${source[pathKey]}`,
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
