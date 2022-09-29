const convert = (
  value: number,
  currency: string,
  currencyConversionsToEUR: { currency: string; conversionRate: number }[],
) => {
  if (currency === 'EUR') return value
  const conversionRate = currencyConversionsToEUR.find(
    ({ currency: c }) => c === currency,
  )?.conversionRate
  if (conversionRate === undefined)
    throw new Error(`Conversion rate for currency ${currency} not defined!`)
  return conversionRate * value
}

export const summarizeFundraisers = (
  fundraisers: {
    raised: number
    target: number
    currency: string
  }[],
  currencyConversionsToEUR: { currency: string; conversionRate: number }[],
): {
  raised: number
  target: number
} =>
  fundraisers.reduce(
    (summary, { raised, target, currency }) => ({
      ...summary,
      raised:
        summary.raised + convert(raised, currency, currencyConversionsToEUR),
      target:
        summary.target + convert(target, currency, currencyConversionsToEUR),
    }),
    { raised: 0, target: 0 },
  )
