import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Image from './image'

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

  it('Toggle hidden when Mouse is Enter', async () => {
    const user = userEvent.setup()
    const component = render(
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

    const triggerElem = component.getByTestId('hover-trigger')
    //starting test - First visualization
    //expect(component.getByTestId('hover-result')).not.toBeVisible()
    // second visualization - Mouse enters div (hover)
    await user.hover(triggerElem)
    expect(component.getByTestId('hover-result')).toBeVisible()
    //third state - Mouse leave - hidden hover
    //await user.unhover(triggerElem)
    //expect(component.getByTestId('hover-result')).not.toBeVisible()
  })
})
