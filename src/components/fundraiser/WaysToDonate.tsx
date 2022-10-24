import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import ExternalLink from '@components/link/ExternalLink'
import { useState } from 'react'

import directTransferImage from '../../images/direct_transfer.svg'
import openCollectiveImage from '../../images/opencollective_logo.svg'
import paypalLogo from '../../images/paypal-color.svg'

const cardClasses = 'p-4 flex flex-col items-center space-y-4'

// TODO: use grid to align logos and text better
export const WaysToDonate = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div className="md:grid md:space-y-0 space-y-8 grid-flow-col grid-cols-3 max-w-5xl mx-auto">
      <div className={cardClasses} data-test="paypal">
        <ExternalLink
          className="link py-2"
          href="https://paypal.me/distributeaid"
        >
          <img
            src={paypalLogo}
            width="188"
            height="49"
            className="mx-auto block"
            alt=""
          />
        </ExternalLink>
        <p className="mt-4 text-gray-700">
          Donate via{' '}
          <ExternalLink href="https://paypal.me/distributeaid" className="link">
            Paypal
          </ExternalLink>
          .
        </p>
      </div>
      <div className={cardClasses} data-test="opencollective">
        <ExternalLink
          className="link py-2"
          href="https://opencollective.com/distribute-aid-usa"
        >
          <img
            src={openCollectiveImage}
            width="100"
            height="100"
            className="mx-auto block"
            alt="Open Collective"
          />
        </ExternalLink>
        <p className="mt-4 text-gray-700">
          If you are in the US, you can make tax-deductible donations to support
          Distribute Aid's USA based projects, through the{' '}
          <ExternalLink
            href="https://opencollective.com/distribute-aid-usa"
            className="link"
          >
            Open Collective Foundation
          </ExternalLink>
          .
        </p>
      </div>
      <div className={cardClasses} data-test="bank">
        <img
          src={directTransferImage}
          width="100"
          height="100"
          className="mx-auto blockn cursor-pointer"
          alt="Dollar sign"
          onClick={() => setModalIsOpen(true)}
        />
        <Button variant="primary" onClick={() => setModalIsOpen(true)}>
          View bank info
        </Button>
        <p className="mt-4 text-gray-700">
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
