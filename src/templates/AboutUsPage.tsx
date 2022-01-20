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
      mission_statement: string
      about_our_mission: string
      timeline_items: {
        period: string
        description: string
      }[]
    }
  }
}

const AboutUs: FC<TemplateProps> = ({ pageContext: { pageFields } }) => (
  <SimpleLayout pageTitle="About us">
    <AboutHero />
    <MissionStatement missionStatement={pageFields.mission_statement} />
    <BoardMembers />
    <AboutOurMission content={pageFields.about_our_mission} />
    <Timeline items={pageFields.timeline_items} />
  </SimpleLayout>
)

export default AboutUs
