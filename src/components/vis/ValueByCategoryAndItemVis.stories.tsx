import { ComponentMeta, ComponentStory } from '@storybook/react'

import ValueByCategoryAndItemVis from './value-by-category-and-item'

export default {
  component: ValueByCategoryAndItemVis,
  args: {
    categoryVisItems: { nodes: [] },
  },
} as ComponentMeta<typeof ValueByCategoryAndItemVis>

const Template: ComponentStory<typeof ValueByCategoryAndItemVis> = ({
  categoryVisItems,
}) => (
  <section className="h-96 w-96">
    <ValueByCategoryAndItemVis categoryVisItems={categoryVisItems} />
  </section>
)

// export const Empty = Template.bind({})
// Empty.args = {}

export const OneShipment = Template.bind({})
OneShipment.args = {
  categoryVisItems: {
    nodes: [
      {
        value: 38255.58,
        count: 2502,
        // @ts-ignore
        shipment: {
          origin: 'GBR',
          destination: 'GRC',
        },
        item: {
          category: 'Baby',
          item: 'Clothes',
          ageGender: '',
          sizeStyle: '',
        },
      },
    ],
  },
}

export const TwoShipments = Template.bind({})
TwoShipments.args = {
  categoryVisItems: {
    nodes: [
      {
        value: 38255.58,
        count: 2502,
        // @ts-ignore
        shipment: {
          origin: 'GBR',
          destination: 'GRC',
        },
        item: {
          category: 'Baby',
          item: 'Clothes',
          ageGender: '',
          sizeStyle: '',
        },
      },
      {
        value: 3750.45,
        count: 165,
        // @ts-ignore
        shipment: {
          origin: 'GBR',
          destination: 'GRC',
        },
        item: {
          category: 'Baby',
          item: 'Coat',
          ageGender: '',
          sizeStyle: '',
        },
      },
    ],
  },
}
