import { graphql } from 'gatsby'
import { FC } from 'react'

import SimpleLayout from '@layouts/Simple'

import HowWeHelpSection from '@components/home/HowWeHelpSection'
import ImageCarousel from '@components/home/ImageCarousel'
import MissionSection from '@components/home/MissionSection'
import RoutesSection from '@components/home/RoutesSection'
import YearInNumbersSection from '@components/home/YearInNumbersSection'
import { PageHeader } from '@components/PageHeader'

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        headline: string
        missionStatement: string
        howWeHelpBlock: {
          title: string
          location: string
          description: string
          image: string
          imageAlt: string
        }[]
      }
    }
  }
}

export function Head() {
  return <PageHeader title={'Home'} />
}

const HomePage: FC<Props> = ({
  data: {
    markdownRemark: { frontmatter },
  },
}) => {
  const { headline, missionStatement, howWeHelpBlock } = frontmatter

  return (
    <SimpleLayout>
      <ImageCarousel headline={headline} />
      <MissionSection missionStatement={missionStatement} />
      <RoutesSection />
      <HowWeHelpSection blocks={howWeHelpBlock} />
      <YearInNumbersSection />
    </SimpleLayout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery {
    markdownRemark(fileAbsolutePath: { glob: "**/content/pages/home.md" }) {
      frontmatter {
        headline
        missionStatement
        howWeHelpBlock {
          description
          location
          title
          image
          imageAlt
        }
      }
    }
  }
`
