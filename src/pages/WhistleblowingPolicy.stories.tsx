import { ComponentMeta, ComponentStory } from '@storybook/react'

import WhistleblowingPolicy from './whistleblowing-policy'

export default {
  component: WhistleblowingPolicy,
} as ComponentMeta<typeof WhistleblowingPolicy>

const Template: ComponentStory<typeof WhistleblowingPolicy> = (args) => (
  <WhistleblowingPolicy {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as WhistleblowingPolicy }
