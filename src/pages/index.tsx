import { FC } from 'react'
import HeroSection from '@components/home/HeroSection'
import RoutesSection from '@components/home/RoutesSection'
import MissionSection from '@components/home/MissionSection'
import HowWeHelpSection from '@components/home/HowWeHelpSection'
import YearInNumbersSection from '@components/home/YearInNumbersSection'
import SimpleLayout from '../layouts/Simple'

const HomePage: FC = () => (
  <SimpleLayout pageTitle="Home">
    <HeroSection />
    <MissionSection />
    <RoutesSection />
    <HowWeHelpSection />
    <YearInNumbersSection />
  </SimpleLayout>
)

export default HomePage
