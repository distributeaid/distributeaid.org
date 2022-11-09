import { render } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Image from './Image'

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
    const attr = getByText('DistributeAid')
    const paragraph = getByText('Our board members')

    expect(paragraph).toBeTruthy()
    expect(attr).toBeTruthy()
  })

  it('Display image to the left, center or right', () => {
    render(<Image />)
  })
})
