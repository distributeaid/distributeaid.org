import { render } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Image, { getFlexAlignment, getTextAlignment } from './Image'

describe('image', () => {
  it('renders texts', () => {
    const { getByText } = render(
      <Image
        image={''}
        width={600}
        height={300}
        altText={
          'Our board members from left to right: Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank'
        }
        caption={'Our board members'}
        attribution={'DistributeAid'}
        alignment={'center'}
      />,
    )
    const attr = getByText('Photo Credit: DistributeAid')
    const paragraph = getByText('Our board members')

    expect(paragraph).toBeTruthy()
    expect(attr).toBeTruthy()
  })

  it('Align image to the left, center or right', () => {
    let flexAlignmentRight = getFlexAlignment('right')
    let flexAlignmentLeft = getFlexAlignment('left')
    let flexAlignmentElse = getFlexAlignment('')
    let flexAlignmentCenter = getFlexAlignment('center')

    expect(flexAlignmentRight).toBe('justify-end')
    expect(flexAlignmentLeft).toBe('justify-start')
    expect(flexAlignmentElse).toBe('justify-center')
    expect(flexAlignmentCenter).toBe('justify-center')
  })

  it('Align text to the left, center or right', () => {
    let textAlignmentRight = getTextAlignment('right')
    let textAlignmentLeft = getTextAlignment('left')
    let textAlignmentElse = getTextAlignment('')
    let textAlignmentCenter = getTextAlignment('center')

    expect(textAlignmentRight).toBe('text-right')
    expect(textAlignmentLeft).toBe('text-left')
    expect(textAlignmentElse).toBe('text-center')
    expect(textAlignmentCenter).toBe('text-center')
  })
})
