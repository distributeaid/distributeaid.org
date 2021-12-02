import { FC, useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import openCollectiveImage from '../images/opencollective_logo.svg'
import directTransferImage from '../images/direct_transfer.svg'
import ExternalLink from '@components/link/ExternalLink'
import Button from '@components/button/Button'
import BankInformationModal from '@components/donate/BankInfoModal'
import SimpleLayout from '@layouts/Simple'

const cardClasses = 'p-4 max-w-xl mx-auto flex flex-col items-center space-y-4'

const Donate: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <SimpleLayout pageTitle="How to donate">
      <div className="pt-8 md:pt-20" style={{ minHeight: '80vh' }}>
        <h1 className="text-center text-gray-800 text-3xl font-medium mb-20">
          Support Distribute Aid to help more people in need:
        </h1>

        <div className="lg:flex max-w-5xl mx-auto">
          <div className={cardClasses}>
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
          <div className={cardClasses}>
            <img
              src={openCollectiveImage}
              width="100"
              height="100"
              className="mx-auto block"
            />
            <ExternalLink
              className="link py-2"
              href="https://opencollective.com/distribute-aid-usa"
            >
              Open Collective
            </ExternalLink>
            <p className="mt-4 text-gray-700">
              If you are in the US, you can make tax-deductible donations to
              Distribute Aid through the{' '}
              <ExternalLink
                href="https://opencollective.com/distribute-aid-usa"
                className="link"
              >
                Open Collective Foundation
              </ExternalLink>
              .
            </p>
          </div>

          <div className={cardClasses}>
            <img
              src={directTransferImage}
              width="100"
              height="100"
              className="mx-auto block"
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
