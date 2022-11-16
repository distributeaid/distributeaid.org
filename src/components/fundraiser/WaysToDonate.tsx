import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import ExternalLink from '@components/link/ExternalLink'
import { useState } from 'react'

import directTransferImage from '../../images/direct_transfer.svg'
import openCollectiveImage from '../../images/opencollective-wordmark.svg'
import paypalLogo from '../../images/paypal-color.svg'

const Divider = () => <hr className="w-[110%] h-1 bg-rosemary-900 px-8" />

export const WaysToDonate = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div className="flex flex-col gap-16 justify-center md:flex-row mx-auto bg-rosemary-50">
      {/* PayPal
      ------------------------------------------------------------ */}
      <ExternalLink
        className="flex flex-col gap-2 items-center hover:drop-shadow-md"
        href="https://paypal.me/distributeaid"
      >
        <img className="h-9" src={paypalLogo} alt="PayPal Logo" />
        <Divider />
        <Button variant="rosemary">Donate with PayPal</Button>
      </ExternalLink>

      {/* Open Collective
      ------------------------------------------------------------ */}
      <ExternalLink
        className="flex flex-col gap-2 items-center hover:drop-shadow-md"
        href="https://opencollective.com/distribute-aid-usa/donate?amount=20&interval=month&platformTip=0"
      >
        <img
          className="h-9"
          src={openCollectiveImage}
          alt="Open Collective Logo"
        />
        <Divider />
        <Button variant="rosemary">Use a Debit / Credit Card</Button>
      </ExternalLink>

      {/* Bank Transfer
      ------------------------------------------------------------ */}
      <div
        className="h-full flex flex-col gap-2 items-center cursor-pointer hover:drop-shadow-md"
        onClick={() => setModalIsOpen(true)}
      >
        <img src={directTransferImage} className="h-9 w-9" alt="Dollar sign" />
        <Divider />
        <Button variant="rosemary">Make a Bank Transfer</Button>
        <BankInformationModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </div>
    </div>
  )
}
