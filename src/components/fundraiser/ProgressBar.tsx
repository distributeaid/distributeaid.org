import { FC } from 'react'

import { Direction } from '../../types/layout.d'

export const ProgressBar: FC<{
  currency: string
  allocated: number
  target: number
  slim?: boolean
  direction?: Direction
}> = ({ currency, allocated, target, slim, direction }) => {
  if (slim === undefined) {
    slim = false
  }

  if (direction === undefined) {
    direction = Direction.LTR
  }

  const moneyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })

  let progressPercent = Math.floor((allocated / target) * 100)
  if (progressPercent > 100) {
    progressPercent = 100
    console.log(
      new Error('ProgressBar Component: allocated was greater than target.'),
    )
  }

  const flexClasses = getFlexClasses(direction)
  const wrapperFlexClasses = getWrapperFlexClasses(slim, direction)

  // TODO: use more accessible element like <progress>, or add aria info
  //       https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role
  return (
    <div
      className={`${wrapperFlexClasses} my-2 prose max-w-none text-navy-700`}
    >
      <div className={`flex-grow ${flexClasses} p-1 bg-navy-400`}>
        <div
          className="bg-navy-900"
          style={{
            width: `${progressPercent}%`,
          }}
        ></div>
        <div className="font-bold mx-2 text-navy-900">{progressPercent}%</div>
      </div>
      <div className={`${flexClasses} justify-between uppercase leading-tight`}>
        {!slim && <div>Funded: {moneyFormatter.format(allocated)}</div>}
        <div className="font-bold">Goal: {moneyFormatter.format(target)}</div>
      </div>
    </div>
  )
}

const getWrapperFlexClasses = (slim?: Boolean, direction?: Direction) => {
  if (!slim) {
    return 'flex flex-col gap-2'
  }

  const commonClasses =
    'flex gap-2 justify-start items-center sm:flex-col sm:items-stretch md:items-center'
  const defaultVal = `${commonClasses} flex-row md:flex-row`

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return `${commonClasses} flex-row-reverse md:flex-row-reverse`

    default:
      return defaultVal
  }
}

const getFlexClasses = (direction?: Direction) => {
  const commonClasses = 'flex justify-start items-stretch text-left'
  const defaultVal = `${commonClasses} flex-row`

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return `${commonClasses} flex-row-reverse`

    default:
      return defaultVal
  }
}
