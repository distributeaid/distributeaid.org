import { ComponentMeta, ComponentStory } from '@storybook/react'

import Team from './team'

export default {
  component: Team,
} as ComponentMeta<typeof Team>

const Template: ComponentStory<typeof Team> = (args) => <Team {...args} />

const Default = Template.bind({})
Default.args = {
  data: {
    allDaTeamMember: {
      nodes: [
        { name: 'Florence Creedy Smith', pronouns: 'she/her' },
        { name: 'Sara Lönegård', pronouns: 'she/her' },
        { name: 'Taylor Fairbank', pronouns: 'he/him' },
        { name: 'Nicole Tingle', pronouns: 'she/her' },
        { name: 'Weston Lindner', pronouns: 'he/him' },
      ],
    },
  },
}

// Export as single story
export { Default as Team }
