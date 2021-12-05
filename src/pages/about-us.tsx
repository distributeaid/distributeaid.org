import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import AboutHero from '@components/about-us/AboutHero'
import MissionStatement from '@components/about-us/MissionStatement'
import BoardMembers from '@components/about-us/BoardMembers'
import AboutOurMission from '@components/about-us/AboutOurMission'
import Timeline from '@components/about-us/Timeline'

const AboutUs: FC = () => (
  <SimpleLayout pageTitle="About us">
    <AboutHero />
    <MissionStatement />
    <BoardMembers />
    <AboutOurMission />
    <Timeline />
  </SimpleLayout>
)

export default AboutUs
