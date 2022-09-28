import Footer from '@components/Footer'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC, useLayoutEffect, useState } from 'react'
import '../stylesheets/donate.css'
import { WaysToDonate } from './donate'

type Fundraiser = {
  id: string
  name: string
  title: string
  target: number
  raised: number
  currency: string
}

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        pageTitle: string
        fundraiserHighlight: string
      }
    }
    allDaFundRaiser: {
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
      frontmatter: { title, pageTitle, fundraiserHighlight },
    },
    allDaFundRaiser: { nodes },
  },
}) => {
  const fundraiser = nodes.find(({ name }) => name === fundraiserHighlight)
  return (
    <SimpleLayout
      className={'donate'}
      footer={<Footer showDonateButton={false} />}
    >
      <div className="bg" />
      <header>
        <h1>{title}</h1>
      </header>
      {fundraiser && <FundraiserHighlight fundraiser={fundraiser} />}
      <section className="ways-to-donate">
        <WaysToDonate />
      </section>
    </SimpleLayout>
  )
}

const FundraiserHighlight: FC<{ fundraiser: Fundraiser }> = ({
  fundraiser,
}) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: fundraiser.currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const [progress, setProgress] = useState<number>(0)

  // Animate the progress bar
  useLayoutEffect(() => {
    let isMounted = true
    const t = setTimeout(() => {
      if (isMounted)
        setProgress(Math.round((fundraiser.raised / fundraiser.target) * 100))
    }, 250)
    return () => {
      isMounted = false
      clearTimeout(t)
    }
  }, [])

  console.log(fundraiser)

  return (
    <section className="fundraiser">
      <h1>{fundraiser.title}</h1>
      <div className="progress">
        <div
          className="bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <dl>
        <dt className="raised">Raised so far:</dt>
        <dd className="raised money">
          {moneyFormatter.format(fundraiser.raised)}
        </dd>
        <dt className="target">Target:</dt>
        <dd className="target money">
          {moneyFormatter.format(fundraiser.target)}
        </dd>
      </dl>
    </section>
  )
}

export default DonatePage

export const pageQuery = graphql`
  query DonateQuery {
    markdownRemark(fileAbsolutePath: { glob: "**/content/pages/donate.md" }) {
      frontmatter {
        title
        pageTitle
        fundraiserHighlight
      }
    }
    allDaFundRaiser {
      nodes {
        id
        name
        title
        target
        raised
        currency
      }
    }
  }
`
