import { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from '@components/button/Button'
import Footer from '@components/Footer'

import Simple from './Simple'

export default {
  component: Simple,
  args: {
    // Create an input control for layout content
    children: 'Main Content goes here',
  },
  parameters: {
    // Hide controls we don't want
    controls: { exclude: ['footer'] },
  },
} as ComponentMeta<typeof Simple>

const Template: ComponentStory<typeof Simple> = (args) => <Simple {...args} />

export const Default = Template.bind({})
Default.args = {}

export const CustomFooter = Template.bind({})
CustomFooter.args = {
  footer: <Button>Custom footer with button</Button>,
}

export const FooterWithNoDonate = Template.bind({})
FooterWithNoDonate.args = {
  footer: <Footer showDonateButton={false} />,
}
