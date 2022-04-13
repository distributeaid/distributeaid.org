import { FC } from 'react'
import { graphql } from 'gatsby'

import SimpleLayout from '@layouts/Simple'

import RoutesSection from '@components/home/RoutesSection'
import MissionSection from '@components/home/MissionSection'
import HowWeHelpSection from '@components/home/HowWeHelpSection'
import YearInNumbersSection from '@components/home/YearInNumbersSection'
import ImageCarousel from '@components/home/ImageCarousel'

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

const HomePage: FC<Props> = ({
  data: {
    markdownRemark: { frontmatter },
  },
}) => {
  const { headline, missionStatement, howWeHelpBlock } = frontmatter

  return (
    <SimpleLayout pageTitle="Home">
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
