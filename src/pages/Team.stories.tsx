import { ComponentMeta, ComponentStory } from '@storybook/react'

import Team from './team'

export default {
  component: Team,
} as ComponentMeta<typeof Team>

const Template: ComponentStory<typeof Team> = (args) => <Team {...args} />

const Default = Template.bind({})
Default.args = {
  data: {
    members: {
      nodes: [
        {
          name: 'Florence Creedy Smith',
          roles: [
            {
              role: {
                title: 'Ukraine Response Coordinator',
                domain: 'Staff',
                commitment: 'Full Time',
              },
            },
          ],
        },
        { name: 'Sara Lönegård', bio: 'about me', roles: [] },
        { name: 'Taylor Fairbank', bio: 'about me', roles: [] },
        { name: 'Nicole Tingle', bio: 'about me', roles: [] },
        {
          name: 'Weston Lindner',
          roles: [],
          bio: "Ad culpa ascot health goth. IPhone non green juice, chartreuse snackwave occaecat ethical. Fugiat you probably haven't heard of them photo booth intelligentsia typewriter godard food truck big mood artisan next level. Salvia iceland 90's keytar dolore before they sold out duis, gastropub ut fixie do dreamcatcher food truck next level shoreditch. Quinoa kale chips praxis ut.",
        },
      ],
    },
  },
}

// Export as single story
export { Default as Team }
