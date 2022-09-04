import Card from './Card'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('renders the children', () => {
    const { getByText } = render(<Card>Card children</Card>)
    expect(getByText('Card children')).toBeInTheDocument()
  })
})
