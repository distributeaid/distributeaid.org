import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MarkdownContent } from './MarkdownContent'

export default {
  component: MarkdownContent,
  parameters: {
    // Hide controls we don't want
    controls: { exclude: ['wrapper'] },
  },
} as ComponentMeta<typeof MarkdownContent>

const Template: ComponentStory<typeof MarkdownContent> = (args) => (
  <MarkdownContent {...args} />
)

export const SimpleText = Template.bind({})
SimpleText.args = {
  content: 'Simple text',
}

export const FormattedText = Template.bind({})
FormattedText.args = {
  content: 'Text with **bold** and _italic_ words',
}

export const Lists = Template.bind({})
Lists.args = {
  content: `
Ordered list:
1. Item
2. Item

Bulleted list:
- Item
- Item

`,
}

export const Links = Template.bind({})
Links.args = {
  content: `
- [Markdown link](https://distributeaid.org/)
- [Link with title](https://distributeaid.org/ "Distribute Aid website")
- Web link: <https://distributeaid.org/>
- Mail link: <logistics@distributeaid.org>
- <a href="https://distributeaid.org/">HTML link</a>
`,
}

export const Images = Template.bind({})
Images.args = {
  content:
    '![](http://localhost:8000/static/be1a48621d65944f9749514e95fbe4f5/416c3/soap_relief.webp)',
}

export const Headers = Template.bind({})
Headers.args = {
  content: `# Title
## Subtitle

### Section`,
}
