import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Need } from '../../../types/need.d'

import { NeedsBarChart } from './needs-bar-chart'
import { AxisOption, NeedsBarChartOptions } from './needs-options-helpers'
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
  options,
}: {
  needs: Need[]
  title?: string | undefined
  options?: NeedsBarChartOptions | undefined
}) => <NeedsBarChart needs={needs} title={title} options={options} />

export const Default = Template.bind({})
Default.args = {}

export const ByItem = Template.bind({})
ByItem.args = {
  title: 'By Item Chart',
  options: {
    axis: {
      indexBy: AxisOption.Item,
    },
  },
}

export const BySubregion = Template.bind({})
BySubregion.args = {
  title: 'By Subregion Chart',
  options: {
    axis: {
      indexBy: AxisOption.Subregion,
    },
  },
}

const largeAmountNeeds = [
  {
    need: 500000,
    product: {
      category: 'Hygiene',
      item: 'Mask',
      sizeStyle: 'Cloth',
      unit: 'Item',
    },
    place: {
      region: { name: 'Greece' },
      subregion: { name: 'Southern Greece' },
    },
    survey: {
      id: '01FXN0BYG1X8509Y8DTDCB8WKB',
      year: '2022',
      quarter: 'Q2',
    },
  },
  {
    need: 5000,
    product: {
      category: 'Hygiene',
      item: 'Mask',
      sizeStyle: 'FFP2',
      unit: 'Item',
    },
    place: {
      region: { name: 'Greece' },
      subregion: { name: 'Southern Greece' },
    },
    survey: {
      id: '01FXN0BYG1X8509Y8DTDCB8WKB',
      year: '2022',
      quarter: 'Q2',
    },
  },
  {
    need: 250000,
    product: {
      category: 'Hygiene',
      item: 'Soap',
      sizeStyle: 'Liquid',
      unit: 'Item',
    },
    place: {
      region: { name: 'Greece' },
      subregion: { name: 'Southern Greece' },
    },
    survey: {
      id: '01FXN0BYG1X8509Y8DTDCB8WKB',
      year: '2022',
      quarter: 'Q2',
    },
  },
  {
    need: 1000000,
    product: {
      category: 'Hygiene',
      item: 'Soap',
      sizeStyle: 'Bar',
      unit: 'Item',
    },
    place: {
      region: { name: 'Greece' },
      subregion: { name: 'Southern Greece' },
    },
    survey: {
      id: '01FXN0BYG1X8509Y8DTDCB8WKB',
      year: '2022',
      quarter: 'Q2',
    },
  },
]

export const Over1Million = Template.bind({})
Over1Million.args = {
  title: 'Over 1 Million Chart',
  //@ts-ignore
  needs: largeAmountNeeds,
  options: {
    axis: {
      indexBy: AxisOption.Item,
    },
  },
}
