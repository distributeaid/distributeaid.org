import Footer from '@components/Footer'
import { Fundraiser } from '@components/fundraiser/Fundraiser'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { FundraisersOverview } from '@components/fundraiser/FundraisersOverview'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { summarizeFundraisers } from 'data/summarizeFundraisers'
import { graphql } from 'gatsby'
import { FC } from 'react'
import { WaysToDonate } from './donate'

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        pageTitle: string
        currencyConversionsToEUR: {
          currency: string
          conversionRate: number
        }[]
      }
    }
    allDaFundraiser: {
      nodes: Fundraiser[]
    }
    thumbnails500px: {
      nodes: {
        parent: {
          absolutePath: string
        }
        gatsbyImageData: any
      }[]
    }
  }
}

export function Head({
  data: {
    markdownRemark: {
      frontmatter: { title, pageTitle },
    },
  },
}: Props) {
  return <PageHeader title={pageTitle} description={title} />
}

const DonatePage: FC<Props> = ({
  data: {
    markdownRemark: {
      frontmatter: { title, pageTitle, currencyConversionsToEUR },
    },
    allDaFundraiser: { nodes: fundraisers },
    thumbnails500px: { nodes: thumbnails500px },
  },
}) => {
  fundraisers.forEach((fundraiser) => {
    fundraiser.gallery = fundraiser.gallery.map((photo) => {
      const gatsbyImageData = thumbnails500px.find(
        ({ parent: { absolutePath } }) => absolutePath.endsWith(photo.url),
      )?.gatsbyImageData
      if (gatsbyImageData === undefined) {
        console.error(`Could not find gatsbyImageData for ${photo.url}`)
      }
      return {
        ...photo,
        gatsbyImageData,
      }
    })
  })

  return (
    <SimpleLayout
      className={'donate'}
      footer={<Footer showDonateButton={false} />}
    >
      <div className="bg" />
      <header>
        <h1>{title}</h1>
      </header>
      {fundraisers.length > 0 && (
        <>
          <FundraiserProgress
            title={'Overall campaign progress'}
            fundraiser={{
              currency: 'EUR',
              ...summarizeFundraisers(fundraisers, currencyConversionsToEUR),
            }}
            converted={true}
          />
          <FundraisersOverview fundraisers={fundraisers} />
        </>
      )}
      <section className="ways-to-donate">
        <WaysToDonate />
      </section>
    </SimpleLayout>
  )
}

export default DonatePage

export const pageQuery = graphql`
  query DonateQuery {
    markdownRemark(fileAbsolutePath: { glob: "**/content/pages/donate.md" }) {
      frontmatter {
        title
        pageTitle
        currencyConversionsToEUR {
          currency
          conversionRate
        }
      }
    }
    allDaFundraiser {
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
  }
`
