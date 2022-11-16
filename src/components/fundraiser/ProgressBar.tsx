import { FC } from 'react'

export const ProgressBar: FC<{
  currency: string
  allocated: number
  target: number
  slim?: boolean
}> = ({ currency, allocated, target, slim }) => {
  if (slim === undefined) {
    slim = false
  }

  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  const progressPercent = (allocated / target) * 100

  // TODO: use more accessible element like <progress>, or add aria info
  //       https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role
  return (
    <div className="text-navy-700 prose max-w-none">
      <div className="my-2 py-1 px-1 bg-navy-400">
        <div
          className="bg-navy-900"
          style={{
            width: `${progressPercent}%`,
            height: '24px',
          }}
        ></div>
      </div>
      {!slim && (
        <div className="flex justify-between uppercase leading-tight">
          <div>Funded: {moneyFormatter.format(allocated)}</div>
          <div>Goal: {moneyFormatter.format(target)}</div>
        </div>
      )}
    </div>
  )
}
