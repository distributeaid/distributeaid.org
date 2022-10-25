import { ComponentMeta, ComponentStory } from '@storybook/react'

import AboutUs from './about-us'

export default {
  component: AboutUs,
} as ComponentMeta<typeof AboutUs>

const Template: ComponentStory<typeof AboutUs> = (args) => <AboutUs {...args} />

const Default = Template.bind({})
Default.args = {
  data: {
    markdownRemark: {
      frontmatter: {
        missionStatement: 'Here is our mission statement',
        aboutOurMission: 'Here is our mission description',
        timelineItems: [
          {
            period: '2020',
            description: 'What we did in 2020',
          },
          {
            period: '2021',
            description: 'What we did in 2021',
          },
          {
            period: '2022',
            description: 'What we did in summer 2021',
          },
        ],
      },
    },
  },
}

// Export as single story
export { Default as AboutUs }
