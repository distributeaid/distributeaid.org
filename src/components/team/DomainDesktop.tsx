import { Member } from './Member'

type Props = {
  domainName: string
  members: any[]
}

const DomainDesktop = ({
  domainName,
  members,
}: {
  domainName: string
  members: any[]
}) => {
  return (
    <div className="hidden md:block">
      <h2>{domainName}</h2>
      <div
        id="memberdata"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto"
      >
        {members.map((member) => (
          <Member member={member}/>
        ))}
      </div>
    </div>
  )
}

export default DomainDesktop

// //Things that need to be done:
// /*
// 1 Fix sizing of photos Ajust height
// 2 Put members under their proper domain!!!
// 3 Create drop downs for domain does work !
// */
