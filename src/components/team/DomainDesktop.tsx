import { Member } from './Member'
import { Members } from '@components/team/MemberComponentTypes'

type Props = {
  domainName: string
  members: {
    nodes: Members[]
  }
}

const DomainDesktop = ({
  domainName,
  members,
}: {
  domainName: string
  members: Members[]
}) => {
  return (
    <div className="hidden md:block ">
      <h2 className="text-2xl text-left px-8 ">{domainName}</h2>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 py-4 px-8 w-screen">
        {members.map((member) => (
          <Member member={member} />
        ))}
      </div>
    </div>
  )
}

export default DomainDesktop
