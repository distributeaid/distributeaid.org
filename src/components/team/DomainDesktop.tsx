import { Member } from '@components/team/MemberComponentTypes'
import { MemberCard } from './Member'

type Props = {
  domainName: string
  members: {
    nodes: Member[]
  }
}

const DomainDesktop = ({
  domainName,
  members,
}: {
  domainName: string
  members: Member[]
}) => {
  return (
    <div className="hidden md:block ">
      <h2 className="text-2xl text-left px-8 ">{domainName}</h2>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 py-4 px-8 w-screen">
        {members.map((member) => (
          <MemberCard member={member} />
        ))}
      </div>
    </div>
  )
}

export default DomainDesktop
