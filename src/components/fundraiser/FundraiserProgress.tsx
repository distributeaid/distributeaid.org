import { FC } from 'react'

export const FundraiserProgress: FC<{
  raisedTitle: string
  currency: string
  raised: number
  goal: number
}> = ({ currency, goal, raised, raisedTitle }) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const progressPercent = (raised / goal) * 100

  return (
    <div className="prose text-navy-200">
      <div className="mb-4 py-1 px-1 bg-navy-400">
        <div
          className="bg-navy-900"
          style={{
            width: `${progressPercent}%`,
            height: '24px',
          }}
        ></div>
      </div>
      <div className="flex justify-between uppercase leading-tight">
        <div>
          {raisedTitle}
          <br />
          Funded: {moneyFormatter.format(raised)}
        </div>
        <div>Target: {moneyFormatter.format(goal)}</div>
      </div>
    </div>
  )
}
