import { render } from '@testing-library/react'
import IconWithText from './IconWithText'

describe('IconWithText', () => {
  it('renders the children', () => {
    const { getByText, getByAltText } = render(
      <IconWithText
        icon=""
        altText="Truck Icon: A truck in motion."
        description={'Regular shipments, scaled to demand'}
        positionOfVisual="vertical"
      />,
    )

    const label = getByText('Regular shipments, scaled to demand')
    const image = getByAltText('Truck Icon: A truck in motion.')
    expect(label).toBeTruthy()
    expect(image).toBeTruthy()
  })
})
