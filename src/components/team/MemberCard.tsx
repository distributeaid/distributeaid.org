import { Card } from '@components/card/Card'
import ExternalLink from '@components/link/ExternalLink'
import { Member } from '@components/team/MemberComponentTypes'

export const MemberCard = ({ member }: { member: Member }) => (
  <Card
    dynamicCardImage={
      member?.profilePhoto?.gatsbyImageData
        ? {
            image: member?.profilePhoto?.gatsbyImageData,
            alt: member.name,
          }
        : undefined
    }
    title={
      member.link ? (
        <ExternalLink className="link" href={member.link}>
          {member.name}
        </ExternalLink>
      ) : (
        member.name
      )
    }
    subtitle={`${member?.roles[0]?.role?.title} (${member?.roles[0]?.role?.commitment})`}
    body={member.bio}
  />
)
