import { FC } from 'react'

import RoutesSection from '@components/home/RoutesSection'
import MissionSection from '@components/home/MissionSection'
import HowWeHelpSection from '@components/home/HowWeHelpSection'
import YearInNumbersSection from '@components/home/YearInNumbersSection'
import SimpleLayout from '../layouts/Simple'
import ImageCarousel from '@components/home/ImageCarousel'

const HomePage: FC = () => (
  <SimpleLayout pageTitle="Home">
    <ImageCarousel />
    <MissionSection />
    <RoutesSection />
    <HowWeHelpSection />
    <YearInNumbersSection />
  </SimpleLayout>
)

export default HomePage
