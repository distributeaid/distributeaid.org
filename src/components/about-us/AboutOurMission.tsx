import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { FC } from 'react'

type Props = {
  content: string
}

const AboutOurMission: FC<Props> = ({ content }) => (
  <section className="bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800">
        About our mission
      </h2>
      <MarkdownContent content={content} />
    </div>
  </section>
)

export default AboutOurMission
