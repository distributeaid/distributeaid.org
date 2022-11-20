import { ComponentMeta, ComponentStory } from '@storybook/react'

import LogoMark from './LogoMark'

export default {
  component: LogoMark,
  // Set medium background by default
  parameters: {
    backgrounds: { default: 'medium' },
  },
  argTypes: {
    width: { type: 'number' },
    height: { type: 'number' },
  },
} as ComponentMeta<typeof LogoMark>

const Template: ComponentStory<typeof LogoMark> = (args) => (
  <LogoMark {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  width: 30,
  height: (60 / 70) * 30,
}

export const Large = Template.bind({})
Large.args = {
  width: 200,
  height: (60 / 70) * 200,
}
