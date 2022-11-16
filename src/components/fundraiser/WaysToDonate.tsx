import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import ExternalLink from '@components/link/ExternalLink'
import { useState } from 'react'

import directTransferImage from '../../images/direct_transfer.svg'
import openCollectiveImage from '../../images/opencollective_logo.svg'
import paypalLogo from '../../images/paypal-color.svg'

export const WaysToDonate = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div>
      <div className="grid space-4 grid-flow-col grid-rows-[repeat(3,_auto)] items-start justify-items-center prose mx-auto">
        {/* PayPal
        ------------------------------------------------------------ */}
        <ExternalLink
          className="self-center link block"
          href="https://paypal.me/distributeaid"
        >
          <img src={paypalLogo} width="188" height="49" alt="" />
        </ExternalLink>
        <ExternalLink href="https://paypal.me/distributeaid" className="button">
          <Button variant="primary">PayPal.me</Button>
        </ExternalLink>
        <p className="text-gray-700 text-sm">
          Donate via{' '}
          <ExternalLink href="https://paypal.me/distributeaid" className="link">
            Paypal
          </ExternalLink>
          .
        </p>

        {/* Open Collective
        ------------------------------------------------------------ */}
        <ExternalLink
          className="self-center link block"
          href="https://opencollective.com/distribute-aid-usa/donate?amount=20&interval=month&platformTip=0"
        >
          <img
            src={openCollectiveImage}
            width="100"
            height="100"
            alt="Open Collective"
          />
        </ExternalLink>
        <ExternalLink
          href="https://opencollective.com/distribute-aid-usa/donate?amount=20&interval=month&platformTip=0"
          className="button"
        >
          <Button variant="primary">Open Collective</Button>
        </ExternalLink>
        <p className="text-gray-700 text-sm">
          If you are in the US, you can make tax-deductible donations to support
          Distribute Aid's USA based projects, through the{' '}
          <ExternalLink
            href="https://opencollective.com/distribute-aid-usa/"
            className="link"
          >
            Open Collective Foundation
          </ExternalLink>
          .
        </p>

        {/* Bank Transfer
        ------------------------------------------------------------ */}
        <img
          src={directTransferImage}
          width="100"
          height="100"
          className="self-center cursor-pointer"
          alt="Dollar sign"
          onClick={() => setModalIsOpen(true)}
        />
        <Button variant="primary" onClick={() => setModalIsOpen(true)}>
          View bank info
        </Button>
        <p className="text-gray-700 text-sm">
          Make a donation directly to our bank account at Distribute Aid. Reach
          out to{' '}
          <ExternalLink className="link" href="mailto:hello@distributeaid.org">
            hello@distributeaid.org
          </ExternalLink>{' '}
          if you have any questions.
        </p>
      </div>
      <BankInformationModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  )
}
