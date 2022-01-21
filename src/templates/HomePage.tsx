import { FC } from 'react'

import RoutesSection from '@components/home/RoutesSection'
import MissionSection from '@components/home/MissionSection'
import HowWeHelpSection from '@components/home/HowWeHelpSection'
import YearInNumbersSection from '@components/home/YearInNumbersSection'
import ImageCarousel from '@components/home/ImageCarousel'
import SimpleLayout from '../layouts/Simple'

type TemplateProps = {
  pageContext: {
    pageFields: {
      headline: string
      missionStatement: string
      howWeHelpBlock: {
        title: string
        location: string
        description: string
      }[]
    }
  }
}

const HomePage: FC<TemplateProps> = ({ pageContext: { pageFields } }) => (
  <SimpleLayout pageTitle="Home">
    <ImageCarousel headline={pageFields.headline} />
    <MissionSection missionStatement={pageFields.missionStatement} />
    <RoutesSection />
    <HowWeHelpSection blocks={pageFields.howWeHelpBlock} />
    <YearInNumbersSection />
  </SimpleLayout>
)

export default HomePage
