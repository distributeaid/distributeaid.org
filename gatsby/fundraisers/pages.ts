import path from 'path'

export const createFundraisersPages = async ({
  graphql,
  actions: { createPage },
}) => {
  const {
    data: { fundraisers, thumbnails350px },
  } = await graphql(`
    query Fundraisers {
      fundraisers: allDaFundraiser {
        nodes {
          id
          name
          title
          target
          raised
          currency
          abstract
          gallery {
            url
            alt
          }
          body
        }
      }
      thumbnails350px: allImageSharp(
        filter: { original: { src: { glob: "/static/**" } } }
      ) {
        nodes {
          parent {
            ... on File {
              absolutePath
            }
          }
          gatsbyImageData(width: 350)
        }
      }
    }
  `)

  fundraisers.nodes.forEach((fundraiser) => {
    console.info(`creating fundraiser page at /donate/${fundraiser.name}`)
    createPage({
      path: `/donate/${fundraiser.name}`,
      component: path.resolve(`./src/templates/FundraiserPage.tsx`),
      context: {
        id: fundraiser.id,
        name: fundraiser.name,
        title: fundraiser.title,
        target: fundraiser.target,
        raised: fundraiser.raised,
        currency: fundraiser.currency,
        abstract: fundraiser.abstract,
        gallery: fundraiser.gallery.map((photo) => {
          const gatsbyImageData = thumbnails350px.nodes.find(
            ({ parent: { absolutePath } }) => absolutePath.endsWith(photo.url),
          ).gatsbyImageData
          if (gatsbyImageData === undefined) {
            console.error(
              `Failed to find gatsbyImageData for photo ${photo.url}!`,
            )
          }
          return {
            ...photo,
            gatsbyImageData,
          }
        }),
        body: fundraiser.body,
      },
    })
  })
}
