import { render } from '@testing-library/react'
import Image from './image'

//capitalize image

describe('image', () => {
  it('renders the image', () => {
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

    const paragraph = getByText('Our board members')
    expect(paragraph).toBeTruthy()
  })
})
