import { ComponentMeta, ComponentStory } from '@storybook/react'

import BoardMembers from './BoardMembers'

export default {
  component: BoardMembers,
} as ComponentMeta<typeof BoardMembers>

const Template: ComponentStory<typeof BoardMembers> = (args) => (
  <BoardMembers {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as BoardMembers }
