import { processNeedsAssessment } from './sourceNeedsAssessmentData'
import {
  validNeedsAssessmentData,
  validNeedsDatas,
  validSurveyId,
} from './valid-needs-assessment-data.json'

describe('Processes Needs Assessment Data', () => {
  it('processes the needs assessment data correctly', () => {
    const { needsDatas, lookupMissLog } = processNeedsAssessment(
      validSurveyId,
      validNeedsAssessmentData,
    )
    expect(needsDatas).toStrictEqual(validNeedsDatas)
    expect(lookupMissLog).toStrictEqual([])
  })
  it('tracks data and lookup errors for logging', () => {
    const invalidNeedsAssessmentData = {
      summary: {
        q2: {
          serbia: {
            hygieneItems: {
              // valid entry
              n95Ffp2Masks: {
                masks: 3620,
              },

              // no unit key defined
              clothMasks: {},

              // need is not a number
              surgicalMasks: {
                masks: 'not_a_number',
              },

              // product mapping fails
              not_an_item: {
                masks: 100,
              },
            },
          },

          // place mapping fails
          not_a_place: {
            hygieneItems: {
              n95Ffp2Masks: {
                masks: 3620,
              },
            },
          },
        },
      },

      stats: { count: 2 },
    }

    const { needsDatas, lookupMissLog } = processNeedsAssessment(
      validSurveyId,
      // @ts-ignore - intentionally ignoring type missmatch to test error handling
      invalidNeedsAssessmentData,
    )
    expect(needsDatas.length).toBe(1)
    expect(lookupMissLog).toStrictEqual([
      'No unit key defined for hygieneItems.clothMasks',
      "Need is not a number for hygieneItems.surgicalMasks.masks.  Instead it's: not_a_number",
      'No product defined for hygieneItems.not_an_item.masks',
      'No place defined for not_a_place',
    ])
  })
})
