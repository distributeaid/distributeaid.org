import ExternalLink from '@components/link/ExternalLink'
import { Link } from 'gatsby'
import { FC } from 'react'
import siteSettings from '../../content/site-settings.json'
import SocialIconContainer from './social-media/SocialIconContainer'

const Footer: FC<{ showDonateButton?: boolean }> = ({ showDonateButton }) => (
  <footer className="px-4 py-12 bg-navy-100 md:px-8 text-center">
    {(showDonateButton ?? true) && (
      <Link
        to="/donate"
        className="py-2 px-6 rounded bg-navy-700 transition-colors text-white"
      >
        Donate
      </Link>
    )}
    <div className="my-4">
      <p>
        Email us at{' '}
        <ExternalLink
          className="link"
          href={`mailto:${siteSettings.footerEmail}`}
        >
          {siteSettings.footerEmail}
          <span className="sr-only">(opens in your email client)</span>
        </ExternalLink>
      </p>
    </div>
    <nav className="my-4">
      <Link className="link" to="/whistleblowing-policy">
        Whistleblowing Policy
      </Link>
      {' · '}
      <Link to="/code-of-conduct" className="link">
        Code of Conduct
      </Link>
    </nav>
    <div className="mx-auto w-64">
      <SocialIconContainer position="footer" />
    </div>
  </footer>
)

export default Footer
