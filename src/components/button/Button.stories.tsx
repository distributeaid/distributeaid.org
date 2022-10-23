import { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from './Button'

export default {
  component: Button,
  argTypes: {
    disabled: { type: 'boolean' },
  },
  args: {
    // Create an input control for button label
    children: 'Label',
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
)

export const Default = Template.bind({})
Default.args = {}

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Slim = Template.bind({})
Slim.args = {
  slim: true,
}
