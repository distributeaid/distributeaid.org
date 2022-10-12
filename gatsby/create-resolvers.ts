import { CreateResolversArgs } from 'gatsby'

/*
 * Note: some TypeScript errors have been silenced below,
 * to enable type checking for *new* code. Feel free to resolve.
 */

export default {
  /*
  Regions
  ================================================================================
  */
  resolveRegionFields: ({ createResolvers, getNode }: CreateResolversArgs) => {
    createResolvers({
      DARegion: {
        subregions: {
          type: ['DASubregion'],
          // @ts-ignore
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
  resolveSubregionFields: ({
    createResolvers,
    getNode,
  }: CreateResolversArgs) => {
    createResolvers({
      DASubregion: {
        region: {
          type: 'DARegion',
          // @ts-ignore
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
  resolveTeamMemberFields: ({
    createResolvers,
    getNode,
  }: CreateResolversArgs) => {
    createResolvers({
      DATeamMember: {
        roles: {
          type: ['DATeamTenure'],
          // @ts-ignore
          resolve: async (source, args, context, info) => {
            // @ts-ignore
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

            // @ts-ignore
            const roles = source.roleData.map((role) => {
              const entry = entries.find((entry) => {
                // @ts-ignore
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
const imageSharpResolver = (
  getNode: CreateResolversArgs['getNode'],
  pathKey: string,
) => {
  return {
    type: 'ImageSharp',
    // @ts-ignore
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
