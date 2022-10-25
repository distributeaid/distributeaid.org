import { ComponentMeta, ComponentStory } from '@storybook/react'

import CodeOfConduct from './code-of-conduct'

export default {
  component: CodeOfConduct,
} as ComponentMeta<typeof CodeOfConduct>

const Template: ComponentStory<typeof CodeOfConduct> = (args) => (
  <CodeOfConduct {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as CodeOfConduct }
