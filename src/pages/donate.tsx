import Footer from '@components/Footer'
import { FundraiserCard as FundraiserComponent } from '@components/fundraiser/Fundraiser'
import { ProgressBar } from '@components/fundraiser/ProgressBar'
import { WaysToDonate } from '@components/fundraiser/WaysToDonate'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC } from 'react'
import { Fundraiser } from '../types/fundraiser.d'

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
          <div className="mx-auto my-8 prose">
            <ProgressBar
              title={'Overall Progress'}
              currency={'EUR'}
              allocated={allocated}
              target={target}
            />
          </div>
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
