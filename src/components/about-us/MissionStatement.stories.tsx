import { ComponentMeta, ComponentStory } from '@storybook/react'

import MissionStatement from './MissionStatement'

export default {
  component: MissionStatement,
  args: {
    missionStatement: 'Here is our mission statement.',
  },
} as ComponentMeta<typeof MissionStatement>

const Template: ComponentStory<typeof MissionStatement> = (args) => (
  <MissionStatement {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as MissionStatement }
