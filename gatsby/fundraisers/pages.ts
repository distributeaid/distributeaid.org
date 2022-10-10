import { getSrc } from 'gatsby-plugin-image'
import path from 'path'

export const createFundraisersPages = async ({
  graphql,
  actions: { createPage },
}) => {
  const {
    data: {
      fundraisers: { nodes: fundraisers },
      thumbnails350px: { nodes: thumbnails350px },
      size600px: { nodes: size600px },
    },
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
      size600px: allImageSharp(
        filter: { original: { src: { glob: "/static/**" } } }
      ) {
        nodes {
          parent {
            ... on File {
              absolutePath
            }
          }
          gatsbyImageData(width: 600)
        }
      }
    }
  `)

  fundraisers.forEach((fundraiser) => {
    console.info(`creating fundraiser page at /donate/${fundraiser.name}`)

    // Make inline images responsive
    const allImages = fundraiser.body.matchAll(/!\[[^\]]+\]\((?<url>[^)]+)\)/g)
    const replacements = {}
    for (const match of allImages) {
      const gatsbyImageData = size600px.find(({ parent: { absolutePath } }) =>
        absolutePath.endsWith(match.groups.url),
      ).gatsbyImageData
      if (gatsbyImageData === undefined) {
        console.error(
          `Failed to find size600px gatsbyImageData for photo ${match.groups.url}!`,
        )
      }
      replacements[match.groups.url] = getSrc(gatsbyImageData)
    }
    const body = Object.entries(replacements)
      .sort(([k1], [k2]) => k1.localeCompare(k2))
      .reduce((body, [k, v]) => body.replaceAll(k, v), fundraiser.body)

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
          const gatsbyImageData = thumbnails350px.find(
            ({ parent: { absolutePath } }) => absolutePath.endsWith(photo.url),
          ).gatsbyImageData
          if (gatsbyImageData === undefined) {
            console.error(
              `Failed to find thumbnails350px gatsbyImageData for photo ${photo.url}!`,
            )
          }
          return {
            ...photo,
            gatsbyImageData,
          }
        }),
        body,
      },
    })
  })
}
