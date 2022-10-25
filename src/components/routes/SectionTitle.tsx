import { FC } from 'react'
type SectionTitleProps = {
  title: string
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <header className="mb-4 text-center">
    <h2 className="text-4xl flex justify-center items-baseline mb-0 uppercase">
      {title}
    </h2>
  </header>
)

export default SectionTitle
