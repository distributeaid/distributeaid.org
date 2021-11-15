import { StaticImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import ExternalLink from '@components/link/ExternalLink'
import LinkedInIcon from '@components/icons/LinkedInIcon'
import InstagramIcon from '@components/icons/InstagramIcon'
import TwitterIcon from '@components/icons/TwitterIcon'

export function Dino() {
  return <StaticImage src="../images/dino.png" alt="A dinosaur" />
}

const Footer: FC = () => (
  <footer
    style={{ background: '#F3F4F6' }}
    className="px-4 py-12 md:px-8 text-center"
  >
    <a
      className="inline-block"
      href="https://www.patreon.com/distributeaid"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Support us on Patreon (opens in a new tab)"
    >
      <StaticImage
        src="../images/become_a_patron_button.png"
        alt="Patreon logo"
        layout="fixed"
        height={58}
        width={250}
      />
    </a>
    <div className="my-4">
      <p>
        Email us at{' '}
        <ExternalLink href="mailto:hello@distributeaid.org">
          hello@distributeaid.org
          <span className="sr-only">(opens in your email client)</span>
        </ExternalLink>
      </p>
    </div>
    <div className="flex space-x-4 justify-center">
      <a
        href="https://twitter.com/DistributeAid"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit us on Twitter"
        style={{ color: '#1DA1F2' }}
        className="block p-4"
      >
        <TwitterIcon width="24" height="24" />
      </a>
      <a
        href="https://www.linkedin.com/company/distribute-aid"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit us on LinkedIn"
        style={{ color: '#0A66C2' }}
        className="block p-4"
      >
        <LinkedInIcon width="24" height="24" />
      </a>
      <a
        href="https://www.instagram.com/distributeaid"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit us on Instagram"
        style={{ color: '#E4405F' }}
        className="block p-4"
      >
        <InstagramIcon width="24" height="24" />
      </a>
    </div>
  </footer>
)

export default Footer
