import { Card } from '@components/card/Card'
import ExternalLink from '@components/link/ExternalLink'

type Props = {
  member: any
}

export const Member = ({ member }: { member: any }) => (
  <Card
    dynamicCardImage={{
      image: member?.profilePhoto?.gatsbyImageData,
      alt: member.name,
    }}
  >
    <h3 className="text-2xl text-gray-600 mb-4 pl-4 pr-4">
      <ExternalLink className="link" href={member.link}>
        {member.name}
      </ExternalLink>
    </h3>

    <h4 className="text-xl text-gray-600 mb-4 pl-4 pr-4">{`${member?.roles[0]?.role?.title} (${member?.roles[0]?.role?.commitment})`}</h4>

    <h4 className="pb-8 pl-4 pr-4 space-y-2">{member.bio}</h4>
  </Card>
)
