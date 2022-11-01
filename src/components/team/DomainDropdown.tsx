import { Card } from '@components/card/Card'
import { FC, useState } from 'react'

type Props = {
  domainName: string
  members: any[]
}

const DomainDropdown = ({
  domainName,
  members,
}: {
  domainName: string
  members: any[]
}) => {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={toggleShow}
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <h1>
              {domainName}</h1>
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          {show && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tab-index="-1"
            >
              <div className="py-1" role="none">
                {members.map((member) => (
                  <a
                    href="#"
                    className="text-gray-700 block px-8 py-2 text-sm hover:bg-slate-100"
                    role="menuitem"
                    tab-index="-1"
                    id="menu-item-0"
                  >
                    <h2>{member.name}</h2>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DomainDropdown

// //Things that need to be done:
// /*
// 1 Fix sizing of photos Ajust height
// 2 Put members under their proper domain!!!
// 3 Create drop downs for domain does work !
// */
