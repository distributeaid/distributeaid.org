import { Member } from './Member'

type Props = {
  domainName: string
  members: any[]
}

const DomainMobile = ({
  domainName,
  members,
}: {
  domainName: string
  members: any[]
}) => {
  return (
    <div className="block md:hidden">
      <details>
        <summary className="bg-navy-800 w-full px-4 py-2 w-screen text-xl text-white rounded-none text-left mb-1">
          {domainName}
        </summary>
        {members.map((member) => (
          <Member member={member} />
        ))}
      </details>
    </div>
  )
}

export default DomainMobile
