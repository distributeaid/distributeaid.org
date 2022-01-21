import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import AboutHero from '@components/about-us/AboutHero'
import MissionStatement from '@components/about-us/MissionStatement'
import BoardMembers from '@components/about-us/BoardMembers'
import AboutOurMission from '@components/about-us/AboutOurMission'
import Timeline from '@components/about-us/Timeline'

type TemplateProps = {
  pageContext: {
    pageFields: {
      missionStatement: string
      aboutOurMission: string
      timelineItems: {
        period: string
        description: string
      }[]
    }
  }
}

const AboutUs: FC<TemplateProps> = ({ pageContext: { pageFields } }) => (
  <SimpleLayout pageTitle="About us">
    <AboutHero />
    <MissionStatement missionStatement={pageFields.missionStatement} />
    <BoardMembers />
    <AboutOurMission content={pageFields.aboutOurMission} />
    <Timeline items={pageFields.timelineItems} />
  </SimpleLayout>
)

export default AboutUs
