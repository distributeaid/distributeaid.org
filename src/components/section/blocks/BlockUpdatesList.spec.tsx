import { render } from '@testing-library/react'
import { BlockUpdatesList as BlockUpdatesListType } from '../../../types/generic-page.d'
import { BlockUpdatesList } from './BlockUpdatesList'

describe('BlockUpdatesList', () => {
  it('renders the title and updates', () => {
    const block = {
      title: 'Updates List',
      visibleCount: 3,
      updates: [
        {
          title: 'An Event',
          date: '2022-03-09T12:00:00Z',
          content: '**Chaos At Home!** How can you help?',
        },
        {
          title: 'An Announcement',
          date: '2022-03-10T12:00:00Z',
          content:
            "How to contribute to Distribute Aid's response: \n\n1. Do this.\n2. Then do that.",
        },
      ],
    } as BlockUpdatesListType
    const { getByText } = render(<BlockUpdatesList block={block} />)

    const title = getByText('Updates List')
    expect(title).toBeTruthy()

    const updateTitle1 = getByText('An Event')
    expect(updateTitle1).toBeTruthy()
    const updateTitle2 = getByText('An Announcement')
    expect(updateTitle2).toBeTruthy()

    const updateDate1 = getByText('3/9/2022')
    expect(updateDate1).toBeTruthy()
    const updateDate2 = getByText('3/10/2022')
    expect(updateDate2).toBeTruthy()

    const updateContent1 = getByText('Chaos At Home!')
    expect(updateContent1).toBeTruthy()
    const updateContent2 = getByText('Do this.')
    expect(updateContent2).toBeTruthy()
  })
})
