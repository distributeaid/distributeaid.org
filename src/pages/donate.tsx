import Footer from '@components/Footer'
import {
  Fundraiser,
  FundraiserCard as FundraiserComponent,
} from '@components/fundraiser/Fundraiser'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { WaysToDonate } from '@components/fundraiser/WaysToDonate'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC } from 'react'

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        pageTitle: string
        raisedEUR: number
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
      frontmatter: { title, raisedEUR },
    },
    allDaFundraiser: { nodes: fundraisers },
    thumbnails500px: { nodes: thumbnails500px },
  },
}) => {
  fundraisers
    .sort(() => Math.random() - Math.random())
    .forEach((fundraiser) => {
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
            raisedTitle={'Total funds raised'}
            currency={'EUR'}
            raised={raisedEUR}
          />
          <article className="fundraisers">
            {fundraisers.map((fundraiser) => (
              <FundraiserComponent
                key={fundraiser.id}
                fundraiser={fundraiser}
              />
            ))}
          </article>
        </>
      )}
      <section className="bg-gray-50">
        <div className="px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
          <h2 className="text-center text-gray-800 text-3xl font-medium mb-20">
            Support Distribute Aid to help more people in need:
          </h2>
          <WaysToDonate />
        </div>
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
        raisedEUR
      }
    }
    allDaFundraiser {
      nodes {
        id
        name
        title
        gallery {
          url
          alt
        }
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
        gatsbyImageData(
          width: 500
          aspectRatio: 1.2
          transformOptions: { fit: COVER }
        )
      }
    }
  }
`
