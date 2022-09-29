import path from 'path'

export const createFundraisersPages = async ({
  graphql,
  actions: { createPage },
}) => {
  const fundraisers = await graphql(`
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
          hero
          gallery
          body
        }
      }
    }
  `)

  fundraisers.data.fundraisers.nodes.forEach((fundraiser) => {
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
        hero: fundraiser.hero,
        gallery: fundraiser.gallery,
        body: fundraiser.body,
      },
    })
  })
}
