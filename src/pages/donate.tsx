import { FC, useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import ExternalLink from '@components/link/ExternalLink'
import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import SimpleLayout from '@layouts/Simple'
import Footer from '@components/Footer'
import { PageHeader } from '@components/PageHeader'

const openCollectiveImage = require('../images/opencollective_logo.svg')
const directTransferImage = require('../images/direct_transfer.svg')

export function Head() {
  return <PageHeader title={'How to donate'} />
}

const cardClasses = 'p-4 max-w-xl mx-auto flex flex-col items-center space-y-4'

const Donate: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <SimpleLayout footer={<Footer showDonateButton={false} />}>
      <div className="pt-8 md:pt-20" style={{ minHeight: '80vh' }}>
        <h1 className="text-center text-gray-800 text-3xl font-medium mb-20">
          Support Distribute Aid to help more people in need:
        </h1>

        <div className="lg:flex max-w-5xl mx-auto">
          <div className={cardClasses} data-test="patreon">
            <div className="text-center">
              <StaticImage
                placeholder="tracedSVG"
                src="../images/patreon_logo.png"
                width={100}
                height={100}
                alt=""
              />
            </div>
            <ExternalLink
              className="link py-2"
              href="https://www.patreon.com/distributeaid"
            >
              Patreon
            </ExternalLink>
            <p className="mt-4 text-gray-700">
              Become a monthly supporter of Distribute Aid{' '}
              <ExternalLink
                href="https://www.patreon.com/distributeaid"
                className="link"
              >
                through our Patreon
              </ExternalLink>{' '}
              account and get access to exclusive updates about our work.
            </p>
          </div>
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
              If you are in the US, you can make tax-deductible donations to
              support Distribute Aid's USA based projects, through the{' '}
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
              Make a donation directly to our bank account at Distribute Aid.
              Reach out to{' '}
              <ExternalLink
                className="link"
                href="mailto:hello@distributeaid.org"
              >
                hello@distributeaid.org
              </ExternalLink>{' '}
              if you have any questions.
            </p>
          </div>
        </div>

        <BankInformationModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </div>
    </SimpleLayout>
  )
}

export default Donate
