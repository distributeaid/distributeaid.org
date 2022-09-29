import { summarizeFundraisers } from './summarizeFundraisers'

describe('summarizeFundraisers()', () => {
  it('should summarize fundraisers', () =>
    expect(
      summarizeFundraisers(
        [
          {
            id: 'd721b6dc-380d-532b-b6e5-01bb0f010125',
            name: 'afghanistan-earthquake',
            title: 'Emergency Afghanistan Earthquake Fundraiser',
            target: 15000,
            raised: 11355,
            currency: 'GBP',
          },
          {
            id: 'd19f890d-c12d-5d77-adf9-6f3f9c0ccb66',
            name: 'ukraine-response',
            title: 'Ukraine Response',
            target: 15000,
            raised: 10000,
            currency: 'EUR',
          },
        ],
        [{ currency: 'GBP', conversionRate: 1.13 }],
      ),
    ).toEqual({
      target: 15000 + 15000 * 1.13,
      raised: 10000 + 11355 * 1.13,
    }))
})
