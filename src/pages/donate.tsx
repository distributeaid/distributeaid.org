import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import Footer from '@components/Footer'
import ExternalLink from '@components/link/ExternalLink'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { FC, useState } from 'react'

import directTransferImage from '../images/direct_transfer.svg'
import openCollectiveImage from '../images/opencollective_logo.svg'

export function Head() {
  return <PageHeader title={'How to donate'} />
}

const cardClasses = 'p-4 max-w-xl mx-auto flex flex-col items-center space-y-4'

const Donate: FC = () => (
  <SimpleLayout footer={<Footer showDonateButton={false} />}>
    <div className="pt-8 md:pt-20" style={{ minHeight: '80vh' }}>
      <h1 className="text-center text-gray-800 text-3xl font-medium mb-20">
        Support Distribute Aid to help more people in need:
      </h1>
      <div className="lg:flex max-w-5xl mx-auto">
        <WaysToDonate />
      </div>
    </div>
  </SimpleLayout>
)

export const WaysToDonate = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <div className={cardClasses} data-test="opencollective">
        <img
          src={openCollectiveImage}
          width="100"
          height="100"
          className="mx-auto block"
          alt=""
        />
        <ExternalLink
          className="link py-2"
          href="https://opencollective.com/distribute-aid-usa"
        >
          Open Collective
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
          className="mx-auto block"
          alt=""
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
    </>
  )
}

export default Donate
