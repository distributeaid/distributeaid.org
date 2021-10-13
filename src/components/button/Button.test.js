import Button from './Button'
import { render, fireEvent, screen } from '@testing-library/react'

describe('Button', () => {
  it('renders the children', () => {
    render(<Button>A button</Button>)

    const button = screen.getByText('A button')
    expect(button).toBeTruthy()
  })
})
