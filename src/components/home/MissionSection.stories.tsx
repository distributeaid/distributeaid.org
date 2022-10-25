import { ComponentMeta, ComponentStory } from '@storybook/react'

import MissionSection from './MissionSection'

export default {
  component: MissionSection,
  args: {
    missionStatement: 'Here is our mission statement.',
  },
} as ComponentMeta<typeof MissionSection>

const Template: ComponentStory<typeof MissionSection> = ({
  missionStatement,
}) => <MissionSection missionStatement={missionStatement} />

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as MissionSection }
