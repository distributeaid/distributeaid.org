import { FC, useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Modal from 'react-modal'
import openCollectiveImage from '../images/opencollective_logo.svg'
import directTransferImage from '../images/direct_transfer.svg'
import ExternalLink from '@components/link/ExternalLink'
import Button from '@components/button/Button'
import Footer from '@components/Footer'
import MainMenu from '@components/nav/MainMenu/MainMenu'
import { Helmet } from 'react-helmet'

const cardClasses = 'p-4 max-w-xl mx-auto flex flex-col items-center space-y-4'

const donate: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>How to donate</title>
      </Helmet>
      <header>
        <MainMenu />
      </header>
      <main className="pt-8 md:pt-20" style={{ minHeight: '80vh' }}>
        <h1 className="text-center text-gray-800 text-3xl font-semibold leading-loose mb-20">
          Support Distribute Aid!
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
              className="py-2"
              href="https://www.patreon.com/distributeaid"
            >
              Patreon
            </ExternalLink>
            <p className="mt-4 text-gray-700">
              Become a monthly supporter of Distribute Aid through our Patreon
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
              className="py-2"
              href="https://opencollective.com/distribute-aid-usa"
            >
              Open Collective
            </ExternalLink>
            <p className="mt-4 text-gray-700">
              If you are in the US, you can make tax-deductible donations to
              Distribute Aid through the Open Collective Foundation.
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
              <ExternalLink href="mailto:hello@distributeaid.org">
                hello@distributeaid.org
              </ExternalLink>{' '}
              if you have any questions.
            </p>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Example Modal"
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
                <td className="text-gray-700 font-medium py-1">
                  Account holder:
                </td>
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
                <td className="font-semibold text-navy-700 py-1 pl-2">
                  TRWIBEB1XXX
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <Button onClick={() => setModalIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </main>
      <Footer />
    </>
  )
}

export default donate
