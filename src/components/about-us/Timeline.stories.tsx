import { ComponentMeta, ComponentStory } from '@storybook/react'

import Timeline from './Timeline'

export default {
  component: Timeline,
  args: {
    items: [],
  },
} as ComponentMeta<typeof Timeline>

const Template: ComponentStory<typeof Timeline> = (args) => (
  <Timeline {...args} />
)

export const Empty = Template.bind({})
Empty.args = {}

export const OneEntry = Template.bind({})
OneEntry.args = {
  items: [
    {
      period: 'January 2022',
      description: 'What we did last January',
    },
  ],
}

export const TwoEntries = Template.bind({})
TwoEntries.args = {
  items: [
    {
      period: 'Spring 2022',
      description: 'What we did last spring',
    },
    {
      period: 'Summer 2022',
      description: 'What we did last summer',
    },
  ],
}

export const FiveEntries = Template.bind({})
FiveEntries.args = {
  items: [
    {
      period: '2020',
      description: 'What we did two years ago',
    },
    {
      period: '2021',
      description: 'What we did last year',
    },
    {
      period: 'January 2022',
      description: 'What we did last January',
    },
    {
      period: 'Spring 2022',
      description: 'What we did last spring',
    },
    {
      period: 'Summer 2022',
      description: 'What we did last summer',
    },
  ],
}
