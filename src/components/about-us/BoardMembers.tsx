import Image from '@components/image/Image'
import { FC } from 'react'
import boardSrc from '../../images/about-us/board.jpg'

const BoardMembers: FC = () => (
  <div>
    <Image
      image={boardSrc}
      width={600}
      height={300}
      altText={
        'Our board members from left to right: Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank'
      }
      caption={
        'Our board members from left to right: Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank'
      }
      attribution={'DistributeAid'}
      alignment={'center'}
    />
  </div>
)

export default BoardMembers
