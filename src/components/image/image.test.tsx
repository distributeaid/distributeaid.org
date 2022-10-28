import { fireEvent, render } from '@testing-library/react'
import Image from './image'

//capitalize image

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
    expect(attr).toBe('DistributeAid')

  })

  it('Toggle hidden when Mouse is Enter', () => {
    const hovOnMouseEnter = jest.fn()
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
    expect(hovOnMouseEnter).not.toHaveBeenCalled()

    fireEvent.onMouseEnter(getByText('A clickable button'))

    expect(hovOnMouseEnter).toHaveBeenCalled()
  })

})
