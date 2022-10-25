import { ComponentMeta, ComponentStory } from '@storybook/react'

import BankInfoModal from './BankInfoModal'

export default {
  component: BankInfoModal,
  args: {
    isOpen: true,
  },
} as ComponentMeta<typeof BankInfoModal>

const Template: ComponentStory<typeof BankInfoModal> = (args) => (
  <BankInfoModal {...args} />
)

const Default = Template.bind({})
Default.args = {}

// Export as single story
export { Default as BankInfoModal }
