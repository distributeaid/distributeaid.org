import Button from '@components/button/Button'
import { FC } from 'react'
import Modal from 'react-modal'
import siteSettings from '../../../content/site-settings.json'
import ExternalLink from '../link/ExternalLink'

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
    <div className="prose">
      <h3>Bank information</h3>
      <p>
        Make a donation directly to our bank account at Distribute Aid. Reach
        out to{' '}
        <ExternalLink
          className="link"
          href={`mailto:${siteSettings.donate.byBankTransfer.emailSupport}`}
        >
          {siteSettings.donate.byBankTransfer.emailSupport}
        </ExternalLink>{' '}
        if you have any questions.
      </p>
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
              {siteSettings.donate.byBankTransfer.IBAN}
            </td>
          </tr>
          <tr>
            <td className="text-gray-700 font-medium py-1">BIC:</td>
            <td className="font-semibold text-navy-700 py-1 pl-2">
              {siteSettings.donate.byBankTransfer.BIC}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <Button onClick={onRequestClose}>Close</Button>
      </div>
    </div>
  </Modal>
)

export default BankInfoModal
