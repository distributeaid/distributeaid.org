import { Fundraiser } from '@components/fundraiser/Fundraiser'
import { CreatePagesArgs } from 'gatsby'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import path from 'path'

type Images = {
  nodes: {
    parent: {
      absolutePath: string
    }
    gatsbyImageData: ImageDataLike
  }[]
}

export const createFundraisersPages = async ({
  graphql,
  actions: { createPage },
}: CreatePagesArgs) => {
  const { data } = await graphql<{
    fundraisers: { nodes: Fundraiser[] }
    thumbnails500px: Images
    size600px: Images
  }>(`
    query Fundraisers {
      fundraisers: allDaFundraiser {
        nodes {
          id
          name
          title
          abstract
          gallery {
            url
            alt
          }
          body
          allocations {
            date
            amountEUR
            purpose
          }
        }
      }
      thumbnails500px: allImageSharp(
        filter: { original: { src: { glob: "/static/**" } } }
      ) {
        nodes {
          parent {
            ... on File {
              absolutePath
            }
          }
          gatsbyImageData(width: 500)
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

  data?.fundraisers?.nodes.forEach((fundraiser) => {
    console.info(`creating fundraiser page at /donate/${fundraiser.name}`)

    // Make inline images responsive
    const allImages = fundraiser.body.matchAll(/!\[[^\]]+\]\((?<url>[^)]+)\)/g)
    const replacements: Record<string, string> = {}
    for (const match of allImages) {
      const url = match.groups?.url
      if (url === undefined) continue
      const gatsbyImageData = data?.size600px?.nodes.find(
        ({ parent: { absolutePath } }) => absolutePath.endsWith(url),
      )?.gatsbyImageData
      if (gatsbyImageData === undefined) {
        console.error(
          `Failed to find size600px gatsbyImageData for photo ${url}!`,
        )
        continue
      }
      const src = getSrc(gatsbyImageData)
      if (src === undefined) {
        console.error(
          `Failed to get src from gatsbyImageData for photo ${url}!`,
        )
        continue
      }
      replacements[url] = src
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
        abstract: fundraiser.abstract,
        gallery: fundraiser.gallery.map((photo) => {
          const gatsbyImageData = data?.thumbnails500px?.nodes.find(
            ({ parent: { absolutePath } }) => absolutePath.endsWith(photo.url),
          )?.gatsbyImageData
          if (gatsbyImageData === undefined) {
            console.error(
              `Failed to find thumbnails500px gatsbyImageData for photo ${photo.url}!`,
            )
          }
          return {
            ...photo,
            gatsbyImageData,
          }
        }),
        allocations: fundraiser.allocations,
        body,
      },
    })
  })
}
