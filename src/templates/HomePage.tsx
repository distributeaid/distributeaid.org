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
      mission_statement: string
      how_we_help_block: {
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
    <MissionSection missionStatement={pageFields.mission_statement} />
    <RoutesSection />
    <HowWeHelpSection blocks={pageFields.how_we_help_block} />
    <YearInNumbersSection />
  </SimpleLayout>
)

export default HomePage
