import { FC } from 'react'
import ExternalLink from '@components/link/ExternalLink'
import { Link } from 'gatsby'
import SocialIconContainer from './social-media/SocialIconContainer'

const Footer: FC = () => (
  <footer
    style={{ background: '#F3F4F6' }}
    className="px-4 py-12 md:px-8 text-center"
  >
    <Link
      to="/donate"
      className="py-2 px-6 rounded bg-navy-700 transition-colors text-white"
    >
      Donate
    </Link>
    <div className="my-4">
      <p>
        Email us at{' '}
        <ExternalLink className="link" href="mailto:hello@distributeaid.org">
          hello@distributeaid.org
          <span className="sr-only">(opens in your email client)</span>
        </ExternalLink>
      </p>
    </div>
    <div className="mx-auto w-64">
      <SocialIconContainer position="footer" />
    </div>
  </footer>
)

export default Footer
