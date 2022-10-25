import { ComponentMeta, ComponentStory } from '@storybook/react'

import Footer from './Footer'

export default {
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {}

export const NoDonateButton = Template.bind({})
NoDonateButton.args = {
  showDonateButton: false,
}
