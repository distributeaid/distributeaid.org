import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import ExternalLink from '@components/link/ExternalLink'
import { useState } from 'react'

import directTransferImage from '../../images/direct_transfer.svg'
import openCollectiveImage from '../../images/opencollective-wordmark.svg'
import paypalLogo from '../../images/paypal-color.svg'

import siteSettings from '../../../content/site-settings.json'

const Divider = () => <hr className="w-[110%] h-1 bg-rosemary-300 px-8" />

export const WaysToDonate = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div className="flex flex-col gap-8 md:gap-16 items-center justify-center md:flex-row bg-rosemary-50">
      {/* PayPal
      ------------------------------------------------------------ */}
      <ExternalLink
        className="flex flex-col gap-2 items-center hover:drop-shadow-md"
        href={siteSettings.donate.byPaypal}
      >
        <img className="h-9" src={paypalLogo} alt="PayPal Logo" />
        <Divider />
        <Button variant="rosemary">Donate with PayPal</Button>
      </ExternalLink>

      {/* Open Collective
      ------------------------------------------------------------ */}
      <ExternalLink
        className="flex flex-col gap-2 items-center hover:drop-shadow-md"
        href={siteSettings.donate.byOpenCollective}
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
      </div>
      {/* NOTE: absolutely positioned, so not in flex flow */}
      <BankInformationModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  )
}
