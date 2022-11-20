import { ComponentMeta, ComponentStory } from '@storybook/react'

import ShipmentsOnGlobeVis from './shipments-on-globe'

export default {
  component: ShipmentsOnGlobeVis,
  args: {
    categoryVisItems: { nodes: [] },
  },
} as ComponentMeta<typeof ShipmentsOnGlobeVis>

const Template: ComponentStory<typeof ShipmentsOnGlobeVis> = ({
  categoryVisItems,
}) => (
  <section className="h-96 w-96">
    <ShipmentsOnGlobeVis categoryVisItems={categoryVisItems} />
  </section>
)

// export const Empty = Template.bind({})
// Empty.args = {}

export const OneArc = Template.bind({})
OneArc.args = {
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

export const DuplicateArc = Template.bind({})
DuplicateArc.args = {
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

export const TwoArcs = Template.bind({})
TwoArcs.args = {
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
        value: 118.11,
        count: 119,
        // @ts-ignore
        shipment: {
          origin: 'USA',
          destination: 'FRA',
        },
        item: {
          category: 'Cooking',
          item: 'Food Container',
          ageGender: '',
          sizeStyle: '',
        },
      },
    ],
  },
}
