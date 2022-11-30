import { render } from '@testing-library/react'
import IconWithText, { getFlexAlignment, getImgAlignment } from './IconWithText'

describe('IconWithText', () => {
  it('renders the children', () => {
    const { getByText, getByAltText } = render(
      <IconWithText
        icon=""
        altText="Truck Icon: A truck in motion."
        description={'Regular shipments, scaled to demand'}
        positionOfVisual="top"
      />,
    )

    const label = getByText('Regular shipments, scaled to demand')
    const image = getByAltText('Truck Icon: A truck in motion.')
    expect(label).toBeTruthy()
    expect(image).toBeTruthy()
  })

  it('Align content to the top or left', () => {
    let contentAlignmentTop = getFlexAlignment('top')
    let contentAlignmentLeft = getFlexAlignment('left')

    expect(contentAlignmentTop).toBe(
      'flex-wrap flex-col content-around w-1/2 h-40',
    )
    expect(contentAlignmentLeft).toBe('justify-around py-4')
  })

  it('Align image to the top or left', () => {
    let imgAlignmentTop = getImgAlignment('top')
    let imgAlignmentLeft = getImgAlignment('left')

    expect(imgAlignmentTop).toBe('flex items-center justify-center')
    expect(imgAlignmentLeft).toBe('')
  })
})
