import { FC } from 'react'

export const FundraiserProgress: FC<{
  raisedTitle: string
  currency: string
  raised: number
}> = ({ currency, raised, raisedTitle }) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  return (
    <p className="progress">
      <span className="raised">{raisedTitle}:</span>{' '}
      <span className="raised money">{moneyFormatter.format(raised)}</span>
    </p>
  )
}
