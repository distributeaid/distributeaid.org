import Footer from '@components/Footer'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { summarizeFundraisers } from 'data/summarizeFundraisers'
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
        currencyConversionsToEUR: {
          currency: string
          conversionRate: number
        }[]
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
      frontmatter: { title, pageTitle, currencyConversionsToEUR },
    },
    allDaFundRaiser: { nodes: fundraisers },
  },
}) => {
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
        <FundraiserHighlight
          fundraiser={{
            currency: 'EUR',
            ...summarizeFundraisers(fundraisers, currencyConversionsToEUR),
            title: 'Overall campaign progress',
          }}
        />
      )}
      <section className="ways-to-donate">
        <WaysToDonate />
      </section>
    </SimpleLayout>
  )
}

const FundraiserHighlight: FC<{
  fundraiser: Pick<Fundraiser, 'currency' | 'raised' | 'target' | 'title'>
}> = ({ fundraiser: { currency, raised, target, title } }) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const [progress, setProgress] = useState<number>(0)

  // Animate the progress bar
  useLayoutEffect(() => {
    let isMounted = true
    const t = setTimeout(() => {
      if (isMounted) setProgress(Math.round((raised / target) * 100))
    }, 250)
    return () => {
      isMounted = false
      clearTimeout(t)
    }
  }, [])

  return (
    <section className="fundraiser">
      <h1>{title}</h1>
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
        <dd className="raised money">{moneyFormatter.format(raised)}</dd>
        <dt className="target">Target:</dt>
        <dd className="target money">{moneyFormatter.format(target)}</dd>
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
        currencyConversionsToEUR {
          currency
          conversionRate
        }
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
