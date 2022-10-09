import { MarkdownContent } from '@components/markdown/MarkdownContent'
import SocialIconContainer from '@components/social-media/SocialIconContainer'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import logoBlueSrc from '../../images/logomark_blue.svg'

type Props = {
  missionStatement: string
}

const MissionStatement: FC<Props> = ({ missionStatement }) => (
  <section className="bg-navy-50 px-4 py-20 flex">
    <div className="max-w-5xl mx-auto">
      <div className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:leading-snug">
        <div className="lg:flex justify-between items-center lg:space-x-8">
          <img
            className="mx-auto my-6"
            width="130"
            height="60"
            src={logoBlueSrc}
            alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
          />
          <div className="flex-grow">
            <ReactMarkdown children={missionStatement} />
          </div>
        </div>
      </div>
    </div>
    <SocialIconContainer position="side" />
  </section>
)

export default MissionStatement
