import { ComponentMeta, ComponentStory } from '@storybook/react'

import WordMark from './WordMark'

export default {
  component: WordMark,
  // Set medium background by default
  parameters: {
    backgrounds: { default: 'medium' },
  },
  argTypes: {
    width: { type: 'number' },
    height: { type: 'number' },
  },
} as ComponentMeta<typeof WordMark>

const Template: ComponentStory<typeof WordMark> = (args) => (
  <WordMark {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  width: 300,
  height: 44,
}

export const Large = Template.bind({})
Large.args = {
  width: 300 * 2,
  height: 44 * 2,
}
