import { FC } from 'react'
import Favicon from './Favicon'

export const PageHeader: FC<{
  title: string
  description?: string | undefined
}> = ({ title, description }) => (
  <>
    <title>{title} · Distribute Aid</title>
    <meta
      name="description"
      content={
        description ??
        'Humanitarian aid delivery reimagined. By supporting a huge network of grassroots organisations, we ensure that donations get to where they are needed most.'
      }
    />
    <Favicon />
  </>
)
