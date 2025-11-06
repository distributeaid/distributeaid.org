import Footer from '@components/Footer'
import { FundraiserCard } from '@components/fundraiser/FundraiserCard'
import { WaysToDonate } from '@components/fundraiser/WaysToDonate'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC } from 'react'
import wingOfHonorSrc from '../../images/donate/wing-of-honor-transparent.png'
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

  return (
    <SimpleLayout
      className={'donate'}
      footer={<Footer showDonateButton={false} />}
    >
      <header className="bg-rosemary-50">
        <div className="px-4 py-12">
          <header className="prose max-w-none mx-auto mb-8">
            <h1 className="text-center text-rosemary-800">
              Ship aid to people in need.
              <br />
              Donate today:
            </h1>
          </header>
          <WaysToDonate />
        </div>
      </header>

      {fundraisers.length > 0 && (
        <article className="fundraisers max-w-screen-lg mx-auto">
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
      )}

      <section id="donor-wing-of-honor" className="bg-navy-50 px-4 pt-12">
        <header className="prose max-w-screen-lg mx-auto">
          <h1 className="text-center">Donor Wing of Honor</h1>
          <h3>
            These people have made extraordinary contributions to Distribute
            Aid’s work around the world. Their support has enabled us to defend
            human dignity and provide lifesaving aid to communities struck by
            natural or manmade disasters. We will be forever grateful for their
            generosity.
          </h3>
        </header>

        <img
          className="mx-auto"
          src={wingOfHonorSrc}
          alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
        />
      </section>

      <footer className="bg-rosemary-50">
        <div className="px-4 py-12">
          <header className="prose max-w-none mx-auto mb-8">
            <h1 className="text-center text-rosemary-800">
              Ship aid to people in need.
              <br />
              Donate today:
            </h1>
          </header>
          <WaysToDonate />
        </div>
      </footer>
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
              width: 640
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
