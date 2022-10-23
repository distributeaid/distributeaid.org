import { ComponentMeta, ComponentStory } from '@storybook/react'

import AboutOurMission from './AboutOurMission'

export default {
  component: AboutOurMission,
  args: {
    content: 'Here is our mission description.',
  },
} as ComponentMeta<typeof AboutOurMission>

const Template: ComponentStory<typeof AboutOurMission> = (args) => (
  <AboutOurMission {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as AboutOurMission }
