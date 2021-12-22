import { FC } from 'react'

import facebookSrc from '../../images/social-icons/facebook.svg'
import twitterSrc from '../../images/social-icons/twitter.svg'
import linkedInSrc from '../../images/social-icons/linked-in.svg'
import instagramSrc from '../../images/social-icons/instagram.svg'
import SocialMediaLink from './SocialMediaLink'

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

const SocialIconContainer: FC = () => (
  <>
    {socialMediaDetails.map((detail) => (
      <SocialMediaLink key={detail.href} {...detail} />
    ))}
  </>
)

export default SocialIconContainer
