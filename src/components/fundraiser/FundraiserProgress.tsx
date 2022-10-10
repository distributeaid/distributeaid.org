import classNames from 'classnames'
import { FC, useLayoutEffect, useState } from 'react'
import { Fundraiser } from './Fundraiser'

export const FundraiserProgress: FC<{
  title: string
  fundraiser: Pick<Fundraiser, 'currency' | 'raised' | 'target'>
  converted?: boolean
}> = ({ fundraiser: { currency, raised, target }, title, converted }) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  return (
    <section className="progress">
      <FundraiserProgressBar fundraiser={{ currency, raised, target }} />
      <h1>{title}</h1>
      <ul>
        <li>
          <span className="raised">Raised so far:</span>{' '}
          <span className="raised money">
            {converted ? '~' : ''}
            {moneyFormatter.format(raised)}
          </span>
        </li>
        <li>
          <span className="target">Target:</span>{' '}
          <span className="target money">
            {converted ? '~' : ''}
            {moneyFormatter.format(target)}
          </span>
        </li>
      </ul>
      {converted && (
        <p className="conversionNote">
          <small>Note: sums include currency conversions.</small>
        </p>
      )}
    </section>
  )
}

export const FundraiserProgressBar: FC<{
  fundraiser: Pick<Fundraiser, 'currency' | 'raised' | 'target'>
}> = ({ fundraiser: { currency, raised, target } }) => {
  const [progress, setProgress] = useState<number>(0)

  // Animate the progress bar
  useLayoutEffect(() => {
    let isMounted = true
    const t = setTimeout(() => {
      if (isMounted)
        setProgress(Math.min(100, Math.round((raised / target) * 100)))
    }, 250)
    return () => {
      isMounted = false
      clearTimeout(t)
    }
  }, [])

  return (
    <div className={classNames('progressBar', { over75: progress > 75 })}>
      <div
        className="bar"
        style={{
          width: `${progress}%`,
        }}
      />
      <span
        style={{
          left: `${progress}%`,
        }}
      >
        {progress}%
      </span>
    </div>
  )
}
