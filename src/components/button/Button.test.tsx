import Button from './Button'
import { render, fireEvent, screen } from '@testing-library/react'

describe('Button', () => {
  it('renders the children', () => {
    const { getByText } = render(<Button>A button</Button>)

    const button = getByText('A button')
    expect(button).toBeTruthy()
  })

  it('sets aria-disabled as true if disabled is passed as a prop', () => {
    const { getByText } = render(<Button disabled>A disabled button</Button>)

    const button = getByText('A disabled button')

    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toBeDisabled()
  })

  it('triggers the onClick if clicked', () => {
    const mockOnClick = jest.fn()

    const { getByText } = render(
      <Button onClick={mockOnClick}>A clickable button</Button>,
    )
    expect(mockOnClick).not.toHaveBeenCalled()

    fireEvent.click(getByText('A clickable button'))

    expect(mockOnClick).toHaveBeenCalled()
  })
})
