import { FC, useLayoutEffect, useState } from 'react'
import { Fundraiser } from './Fundraiser'

export const FundraiserProgress: FC<{
  title: string
  fundraiser: Pick<Fundraiser, 'currency' | 'raised' | 'target'>
}> = ({ fundraiser: { currency, raised, target }, title }) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const [progress, setProgress] = useState<number>(0)

  // Animate the progress bar
  useLayoutEffect(() => {
    let isMounted = true
    const t = setTimeout(() => {
      if (isMounted) setProgress(Math.round((raised / target) * 100))
    }, 250)
    return () => {
      isMounted = false
      clearTimeout(t)
    }
  }, [])

  return (
    <section className="progress">
      <h1>{title}</h1>
      <div className="progress">
        <div
          className="bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <dl>
        <dt className="raised">Raised so far:</dt>
        <dd className="raised money">{moneyFormatter.format(raised)}</dd>
        <dt className="target">Target:</dt>
        <dd className="target money">{moneyFormatter.format(target)}</dd>
      </dl>
    </section>
  )
}
