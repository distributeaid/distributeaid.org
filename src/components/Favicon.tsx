import { FC } from 'react'
import { Helmet } from 'react-helmet'

const Favicon: FC = () => (
  <Helmet>
    <link rel="shortcut icon" href="/favicon.ico"></link>
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon-96x96.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicon-192x192.png"
    ></link>
  </Helmet>
)

export default Favicon
