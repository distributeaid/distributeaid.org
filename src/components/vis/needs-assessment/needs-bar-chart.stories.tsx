import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Need } from '../../../types/need-types'

import { NeedsBarChart } from './needs-bar-chart'
import NeedsSampleData from './needs-sample-data.json'

export default {
  component: NeedsBarChart,
  argTypes: {
    disabled: { type: 'boolean' },
  },
  args: {
    title: 'Chart Title',
    //@ts-ignore
    needs: NeedsSampleData as Need[],
  },
} as ComponentMeta<typeof NeedsBarChart>

const Template: ComponentStory<typeof NeedsBarChart> = ({
  needs,
  title,
}: {
  needs: Need[]
  title: string
}) => <NeedsBarChart needs={needs} title={title} />

export const Default = Template.bind({})
Default.args = {}
