import { FC } from 'react'
import boardSrc from '../../images/about-us/board.jpg'

const BoardMembers: FC = () => (
  <div className="max-w-7xl mx-auto text-center py-20 px-4 text-lg">
    <img
      className="mx-auto mb-4"
      style={{
        width: 600,
        height: 300,
        objectFit: 'cover',
        objectPosition: 'top',
      }}
      width="600"
      height="300"
      src={boardSrc}
      alt="Our board members from left to right: Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank"
    />
    <p className="text-gray-600">
      Our board members from left to right:
      <br />
      Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank
    </p>
  </div>
)

export default BoardMembers
