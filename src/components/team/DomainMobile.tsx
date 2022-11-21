import { Member } from '@components/team/MemberComponentTypes'
import { MemberCard } from './MemberCard'

const DomainMobile = ({
  domainName,
  members,
}: {
  domainName: string
  members: Member[]
}) => {
  return (
    <div className="block md:hidden">
      <details>
        <summary className="bg-navy-800 w-full px-4 py-2 w-screen text-xl text-white rounded-none text-left mb-1">
          {domainName}
        </summary>
        {members.map((member) => (
          <MemberCard member={member} />
        ))}
      </details>
    </div>
  )
}

export default DomainMobile
