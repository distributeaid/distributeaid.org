import { FC } from 'react'
type SectionTitleProps = {
  title: string
  subTitle?: string
}

const SectionTitle: FC<SectionTitleProps> = ({ title, subTitle }) => (
  <header className="my-4 text-center">
    <h1 className="text-4xl flex justify-center items-baseline mb-1 uppercase">
      {title}
    </h1>
    {subTitle && <h2 className="text-2xl">{subTitle}</h2>}
  </header>
)

export default SectionTitle
