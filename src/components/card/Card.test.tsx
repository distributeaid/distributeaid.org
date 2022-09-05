import { Card } from './Card'
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
    expect(card).toHaveTextContent(/hello world/)
    expect(card).toHaveTextContent(/card test subtitle/)
    expect(card).toHaveTextContent(/body paragraph/)
    const actionEl = getByText('test label')
    expect(actionEl).toHaveAttribute('href', 'test/path')
  })
  it('renders the children', () => {
    const { getByText } = render(<Card>Card children</Card>)
    expect(getByText('Card children')).toBeTruthy()
  })

  it('should allow to set the body color', () => {
    const { getByTestId } = render(<Card bodyColor="green" />)
    const card = getByTestId('card')
    expect(card).toHaveClass('green')
  })
})
