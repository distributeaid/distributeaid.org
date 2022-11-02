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
    title={
      <ExternalLink className="link" href={member.link}>
        {member.name}
      </ExternalLink>
    }
    subtitle={`${member?.roles[0]?.role?.title} (${member?.roles[0]?.role?.commitment})`}
    body={member.bio}
  />
)
