import { FC } from 'react'

export const ProgressBar: FC<{
  title: string
  currency: string
  allocated: number
  target: number
}> = ({ title, currency, allocated, target }) => {
  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const progressPercent = (allocated / target) * 100

  return (
    <div className="text-navy-700">
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
          {title}
          <br />
          Funded: {moneyFormatter.format(allocated)}
        </div>
        <div>Goal: {moneyFormatter.format(target)}</div>
      </div>
    </div>
  )
}
