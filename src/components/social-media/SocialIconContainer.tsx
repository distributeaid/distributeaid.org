import { FC, useEffect, useState } from 'react'

import facebookSrc from '../../images/social-icons/facebook.svg'
import twitterSrc from '../../images/social-icons/twitter.svg'
import linkedInSrc from '../../images/social-icons/linked-in.svg'
import instagramSrc from '../../images/social-icons/instagram.svg'
import SocialMediaLink from './SocialMediaLink'
import { getThemeLargeScreenWidth } from 'utils/site-theme'

const socialMediaDetails = [
  {
    href: 'https://www.instagram.com/distributeaid',
    src: instagramSrc,
    altText: 'Instagram icon',
  },
  {
    href: 'https://twitter.com/DistributeAid',
    src: twitterSrc,
    altText: 'Twitter icon',
  },
  {
    href: 'https://www.linkedin.com/company/distribute-aid',
    src: linkedInSrc,
    altText: 'LinkedIn icon',
  },
  {
    href: 'https://www.facebook.com/DistributeAidDotOrg/',
    src: facebookSrc,
    altText: 'Facebook icon',
  },
]

const SocialIconContainer: FC = () => {
  const [screenWidth, setScreenWidth] = useState(window?.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window?.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (screenWidth < getThemeLargeScreenWidth()) {
    return null
  }

  return (
    <div>
      {socialMediaDetails.map((detail) => (
        <SocialMediaLink key={detail.href} {...detail} />
      ))}
    </div>
  )
}

export default SocialIconContainer
