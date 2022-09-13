module.exports = {
  /*
  Regions
  ================================================================================
  */
  resolveRegionFields: ({ createResolvers, getNode }) => {
    createResolvers({
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
    })
  },

  /*
  Subregions
  ================================================================================
  */
  resolveSubregionFields: ({ createResolvers, getNode }) => {
    createResolvers({
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
    })
  },

  /*
  Team Members
  ================================================================================
  TODO: Consider creating the DATeamTenure nodes in transform-nodes and
        using Gatsby's @link directive in createSchemaCustomization to
        automatically link them to the DATeamMember.

        This technique may be applicable to all our resolvers.

        https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#foreign-key-fields
  */
  resolveTeamMemberFields: ({ createResolvers, getNode }) => {
    createResolvers({
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

        profilePhoto: imageSharpResolver(
          getNode,
          'profilePhotoFileRelativePath',
        ),
      },
    })
  },
}

/*
Helpers
================================================================================
*/
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
