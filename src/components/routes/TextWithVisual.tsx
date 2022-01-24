import { FunctionComponent, ReactNode } from 'react'

interface Props {
  id?: string
  positionOfVisual: 'left' | 'right'
  children: ReactNode
  visual: ReactNode
}

const TextWithVisual: FunctionComponent<Props> = ({
  id,
  positionOfVisual,
  children,
  visual,
}) => (
  <section
    className={`text-navy-700 section flex flex-col md:flex-row ${
      positionOfVisual === 'left' ? 'md:flex-row-reverse' : ''
    }`}
    {...(id && { id })}
  >
    <div className="p-4 bg-white w-full md:w-2/4 ">{children}</div>
    {visual}
  </section>
)

export default TextWithVisual
