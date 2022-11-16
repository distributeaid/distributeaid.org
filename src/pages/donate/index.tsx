import Footer from '@components/Footer'
import { FundraiserCard } from '@components/fundraiser/FundraiserCard'
import { ProgressBar } from '@components/fundraiser/ProgressBar'
import { WaysToDonate } from '@components/fundraiser/WaysToDonate'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC } from 'react'
import { Fundraiser } from '../../types/fundraiser.d'
import { Direction } from '../../types/layout.d'

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
  },
}) => {
  fundraisers.sort(() => Math.random() - Math.random())

  const allocated = fundraisers.reduce((total, { totalAllocated }) => {
    return total + totalAllocated
  }, 0)

  const target = fundraisers.reduce((total, fundraiser) => {
    return total + fundraiser.target
  }, 0)

  return (
    <SimpleLayout
      className={'donate'}
      footer={<Footer showDonateButton={false} />}
    >
      <header className="prose">
        <h1>{title}</h1>
      </header>
      {fundraisers.length > 0 && (
        <>
          <div className="mx-auto my-8 max-w-screen-sm">
            <ProgressBar
              currency={'EUR'}
              allocated={allocated}
              target={target}
            />
          </div>
          <article className="fundraisers">
            {fundraisers.map((fundraiser, i) => {
              const direction = i % 2 == 0 ? Direction.LTR : Direction.RTL
              return (
                <FundraiserCard
                  key={fundraiser.id}
                  fundraiser={fundraiser}
                  direction={direction}
                />
              )
            })}
          </article>
        </>
      )}
      <section className="bg-rosemary-50">
        <div className="px-4 py-12">
          <header className="prose max-w-none mx-auto mb-8">
            <h2 className="text-center text-rosemary-800">
              Ship aid to people in need.
              <br />
              Donate today:
            </h2>
          </header>
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
        donateUrl
        gallery {
          relativePath
          alt
          image {
            gatsbyImageData(
              width: 500
              aspectRatio: 1.2
              transformOptions: { fit: COVER }
            )
          }
        }
        target
        totalAllocated
        allocations {
          date
          amountEUR
          purpose
        }
      }
    }
  }
`
