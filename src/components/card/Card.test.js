import Card from './Card'
import { render } from '@testing-library/react'

describe('<Card/>', () => {
  it('renders the card component', () => {
    const { getByTestId } = render(<Card />)
    const card = getByTestId('card')
    expect(card).toBeDefined()
  })
  it('renders card props', () => {
    const { getByTestId, getByText } = render(
      <Card
        title="hello world"
        subtitle="card test subtitle"
        body={<p>body paragraph</p>}
        actions={[
          {
            url: 'test/path',
            label: 'test label',
          },
        ]}
      />,
    )

    const card = getByTestId('card')
    expect(card).toContainHTML(
      '<h2 class="text-xl font-semibold mb-1">hello world</h2>',
    )
    expect(card).toContainHTML(
      '<p class="text-gray-600 mb-6">card test subtitle</p>',
    )
    expect(card).toContainHTML('<div><p>body paragraph</p></div>')
    const actionEl = getByText('test label')
    expect(actionEl).toHaveAttribute('href', 'test/path')
  })
  it('renders the children', () => {
    const { getByText } = render(<Card>Card children</Card>)
    expect(getByText('Card children')).toBeTruthy()
  })
})
