import { ComponentMeta, ComponentStory } from '@storybook/react'

import Donate from './index'

export default {
  component: Donate,
} as ComponentMeta<typeof Donate>

const Template: ComponentStory<typeof Donate> = (args) => <Donate {...args} />

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as Donate }
