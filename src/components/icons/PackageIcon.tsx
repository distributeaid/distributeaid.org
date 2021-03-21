import { FunctionComponent, SVGProps } from 'react'

const PackageIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path
      d="M20 7L12 3L4 7M20 7V17L12 21M20 7L16 9L12 11M4 7L12 11M4 7V17L12 21M12 11V21"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 5L16 9V12" strokeWidth={2} strokeLinecap="round" />
  </svg>
)

export default PackageIcon
