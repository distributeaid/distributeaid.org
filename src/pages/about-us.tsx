import AboutHero from '@components/about-us/AboutHero'
import AboutOurMission from '@components/about-us/AboutOurMission'
import BoardMembers from '@components/about-us/BoardMembers'
import MissionStatement from '@components/about-us/MissionStatement'
import Timeline from '@components/about-us/Timeline'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC } from 'react'

type Props = {
  data: {
    markdownRemark: {
      frontmatter: {
        missionStatement: string
        aboutOurMission: string
        timelineItems: {
          period: string
          description: string
        }[]
      }
    }
  }
}

export function Head() {
  return <PageHeader title={'About us'} />
}

const AboutUsPage: FC<Props> = ({
  data: {
    markdownRemark: { frontmatter },
  },
}) => {
  const { missionStatement, aboutOurMission, timelineItems } = frontmatter

  return (
    <SimpleLayout>
      <AboutHero />
      <MissionStatement missionStatement={missionStatement} />
      <BoardMembers />
      <AboutOurMission content={aboutOurMission} />
      <Timeline items={timelineItems} />
    </SimpleLayout>
  )
}

export default AboutUsPage

export const pageQuery = graphql`
  query AboutUsPageQuery {
    markdownRemark(fileAbsolutePath: { glob: "**/content/pages/about-us.md" }) {
      frontmatter {
        aboutOurMission
        missionStatement
        timelineItems {
          description
          period
        }
      }
    }
  }
`
