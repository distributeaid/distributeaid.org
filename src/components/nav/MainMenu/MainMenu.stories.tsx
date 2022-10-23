import { ComponentMeta, ComponentStory } from '@storybook/react'

import MainMenu from './MainMenu'

export default {
  component: MainMenu,
} as ComponentMeta<typeof MainMenu>

const Template: ComponentStory<typeof MainMenu> = (args) => (
  <MainMenu {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const Mobile = Template.bind({})
Mobile.args = {}
Mobile.parameters = {
  viewport: {
    defaultViewport: 'iphone5',
  },
}

export const Tablet = Template.bind({})
Tablet.args = {}
Tablet.parameters = {
  viewport: {
    defaultViewport: 'ipad',
  },
}
