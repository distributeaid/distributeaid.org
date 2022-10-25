import { ComponentMeta, ComponentStory } from '@storybook/react'

import AboutHero from './AboutHero'

export default {
  component: AboutHero,
} as ComponentMeta<typeof AboutHero>

const Template: ComponentStory<typeof AboutHero> = (args) => (
  <AboutHero {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as AboutHero }
