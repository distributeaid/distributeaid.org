import Button from '@components/button/Button'
import { FC } from 'react'
import Modal from 'react-modal'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
}

const BankInfoModal: FC<Props> = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Bank information"
    style={{
      content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: 500,
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, .65)',
      },
    }}
  >
    <h3 className="text-xl leading-loose mb-4 tracking-wide text-navy-800">
      Bank information
    </h3>
    <table>
      <tbody>
        <tr>
          <td className="text-gray-700 font-medium py-1">Account holder:</td>
          <td className="font-semibold text-navy-700 py-1 pl-2">
            Distribute Aid
          </td>
        </tr>
        <tr>
          <td className="text-gray-700 font-medium py-1">IBAN:</td>
          <td className="font-semibold text-navy-700 py-1 pl-2">
            BE72 9672 1338 5616
          </td>
        </tr>
        <tr>
          <td className="text-gray-700 font-medium py-1">BIC:</td>
          <td className="font-semibold text-navy-700 py-1 pl-2">TRWIBEB1XXX</td>
        </tr>
      </tbody>
    </table>

    <div className="mt-6 text-right">
      <Button onClick={onRequestClose}>Close</Button>
    </div>
  </Modal>
)

export default BankInfoModal
