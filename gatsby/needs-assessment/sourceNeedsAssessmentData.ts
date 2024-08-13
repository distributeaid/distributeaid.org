import fetch from 'cross-fetch'
import { SourceNodesArgs } from 'gatsby'
import { Product } from '../../src/types/product.d'
import {
  isProductSurveyPage as generatedIsProductSurveyPage,
  productMapper as generatedProductMapper,
} from './generated-needs-assessment-mappers'
import {
  isProductSurveyPage,
  placeMapper,
  PlacePartial,
  productMapper,
} from './needs-assessment-mappers'

enum SURVEY_FORMATS {
  ORIGINAL = 'ORIGINAL',
  NO_QUARTER = 'NO_QUARTER',
  GENERATED_V1 = 'GENERATED_V1',
}

export type SurveyId = {
  id: string
  year: string
  quarter?: string
  url: string
  format: SURVEY_FORMATS
}

type NASummary =
  | NASummary_ORIGINAL
  | NASummary_NO_QUARTER
  | NASummary_GENERATED_V1
type NASummary_ORIGINAL = Record<
  string,
  Record<string, Record<string, Record<string, Record<string, number>>>>
>
type NASummary_NO_QUARTER = Record<
  string,
  Record<string, Record<string, Record<string, number>>>
>
type NASummary_GENERATED_V1 = NASummary_NO_QUARTER

type NAResponse = {
  summary: NASummary
  stats: { count: number }
}

type NeedsData = {
  id: string
  survey: {
    id: string
    year: string
    quarter: string
  }
  place: PlacePartial
  product: Product
  need: number
}

// NOTE: previous surveys were conducted with Google Forms, then Qualtrics.
//       need to load the data manually

// The original format encoded quarters into the survey via a select box.
// That led to issues w/ people filling out the wrong survey, so we updated the
// format to exclude the quarter question.  This required us to change the
// structure of our url request and add some pre-processing code to put the data
// in the same structure.
const surveyIds: SurveyId[] = [
  {
    // 2022 Q2
    id: '01FXN0BYG1X8509Y8DTDCB8WKB',
    year: '2022',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01FXN0BYG1X8509Y8DTDCB8WKB/summary?groupBy=timeOfYear.quarter,basicInfo.region',
    format: SURVEY_FORMATS.ORIGINAL,
  },
  {
    // 2022 Q3
    id: '01G4X7XTMCD6MFHDT5KS7Z27GF',
    year: '2022',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01G4X7XTMCD6MFHDT5KS7Z27GF/summary?groupBy=timeOfYear.quarter,basicInfo.region',
    format: SURVEY_FORMATS.ORIGINAL,
  },
  {
    // 2022 Q4
    id: '01GCW8TQFCE92TR1NXH8NEET7F',
    year: '2022',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01GCW8TQFCE92TR1NXH8NEET7F/summary?groupBy=timeOfYear.quarter,basicInfo.region',
    format: SURVEY_FORMATS.ORIGINAL,
  },
  {
    // 2023 Q1
    id: '01GKQEXWQSERMVX0BVT3G1N5JX',
    year: '2023',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01GKQEXWQSERMVX0BVT3G1N5JX/summary?groupBy=timeOfYear.quarter,basicInfo.region',
    format: SURVEY_FORMATS.ORIGINAL,
  },
  {
    // 2023 Q2
    id: '01GVZ3652112KBNGBG43KB1F8J',
    year: '2023',
    quarter: 'Q2',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01GVZ3652112KBNGBG43KB1F8J/summary?groupBy=basicInfo.region',
    format: SURVEY_FORMATS.NO_QUARTER,
  },
  {
    // 2023 Q2 - LHI
    id: '01GVZ3R4RP5GMQPQWZH9SFR100',
    year: '2023',
    quarter: 'Q2',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01GVZ3R4RP5GMQPQWZH9SFR100/summary?groupBy=basicInfo.region',
    format: SURVEY_FORMATS.NO_QUARTER,
  },
  {
    // 2023 Q2 - IsraAID
    id: '01GVZ3SXBA8HCYTPQ1JZ53GZAX',
    year: '2023',
    quarter: 'Q2',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01GVZ3SXBA8HCYTPQ1JZ53GZAX/summary?groupBy=basicInfo.region',
    format: SURVEY_FORMATS.NO_QUARTER,
  },
  {
    // 2023 Q3
    id: '01H3KENGVF837HMQ2S4VXYCC39',
    year: '2023',
    quarter: 'Q3',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01H3KENGVF837HMQ2S4VXYCC39/summary?groupBy=basicInfo.region',
    format: SURVEY_FORMATS.GENERATED_V1,
  },
  {
    // 2023 Q4
    id: '01HAC605NVGB5ADR2PMXKWKJ6W',
    year: '2023',
    quarter: 'Q4',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01HAC605NVGB5ADR2PMXKWKJ6W/summary?groupBy=basicInfo.region',
    format: SURVEY_FORMATS.GENERATED_V1,
  },
  {
    // US NA
    id: '01HAEN4RAW941QVQ38M1WQ7QW3',
    year: '2023-24-USA',
    quarter: 'All',
    url: 'https://storage.needs-assessment.distributeaid.dev/form/01HAEN4RAW941QVQ38M1WQ7QW3/summary?groupBy=basicInfo.region',
    format: SURVEY_FORMATS.GENERATED_V1,
  },
]

export const sourceNeedsAssessments = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
  reporter,
}: SourceNodesArgs) => {
  for (const surveyId of surveyIds) {
    reporter.info(`Fetching survey id ${surveyId.id}`)
    const response = await fetchNeedsAssessment(surveyId)
    if (response instanceof Error) {
      reporter.panic(`Sourcing Failed`, response)
      continue
    }

    const summary = preprocess(surveyId, response.summary)

    const { needsDatas, lookupMissLog } = processNeedsAssessment(
      surveyId,
      summary,
    )
    for (const lookupMiss of lookupMissLog) {
      reporter.error(lookupMiss)
    }

    for (const needsData of needsDatas) {
      const nodeData = {
        // Node Data
        ...needsData,

        // Gatsby Fields
        id: createNodeId(needsData.id),
        parent: null,
        children: [],
        internal: {
          type: `DANeed`,
          contentDigest: createContentDigest(needsData),
        },
      }

      createNode(nodeData)
    }
  }
}

export const fetchNeedsAssessment = async (
  survey: SurveyId,
): Promise<NAResponse | Error> => {
  const result = await fetch(survey.url)
  if (result.status !== 200) {
    return new Error(`Could not source needs assessment data: ${survey.url}`)
  }

  const resultData = (await result.json()) as NAResponse
  return resultData
}

export const preprocess = (
  surveyId: SurveyId,
  summary: NASummary,
): NASummary_ORIGINAL => {
  switch (surveyId.format) {
    case SURVEY_FORMATS.ORIGINAL:
      return summary as NASummary_ORIGINAL

    case SURVEY_FORMATS.NO_QUARTER:
      if (surveyId.quarter === undefined) {
        throw new Error(
          `Survey has NO_QUARTER format and no hardcoded quarter: ${surveyId.id}`,
        )
      }
      const noQuarterSummary: Record<string, NASummary_NO_QUARTER> = {}
      noQuarterSummary[surveyId.quarter] = summary as NASummary_NO_QUARTER
      return noQuarterSummary

    case SURVEY_FORMATS.GENERATED_V1:
      if (surveyId.quarter === undefined) {
        throw new Error(
          `Survey has NO_QUARTER format and no hardcoded quarter: ${surveyId.id}`,
        )
      }
      const generatedV1Summary: Record<string, NASummary_GENERATED_V1> = {}
      generatedV1Summary[surveyId.quarter] = summary as NASummary_GENERATED_V1
      return generatedV1Summary

    default:
      throw new Error(`Survey had an unkown format: ${surveyId.id}`)
  }
}

export const processNeedsAssessment = (
  surveyId: SurveyId,
  summary: NASummary_ORIGINAL,
): {
  needsDatas: NeedsData[]
  lookupMissLog: string[]
} => {
  const needsDatas: NeedsData[] = []
  const lookupMissLog: string[] = []

  const testProductSurveyPage =
    surveyId.format === SURVEY_FORMATS.GENERATED_V1
      ? generatedIsProductSurveyPage
      : isProductSurveyPage

  const mapProduct =
    surveyId.format === SURVEY_FORMATS.GENERATED_V1
      ? generatedProductMapper(surveyId) // call closure
      : productMapper

  for (let [quarter, places] of Object.entries(summary)) {
    for (const [placeKey, pages] of Object.entries(places)) {
      for (const [page, questions] of Object.entries(pages)) {
        if (!testProductSurveyPage(page)) continue
        for (const [question, units] of Object.entries(questions)) {
          const unitKey = Object.keys(units)[0]
          if (unitKey === undefined) {
            lookupMissLog.push(`No unit key defined for ${page}.${question}`)
            continue
          }

          const need = Object.values(units)[0]
          if (typeof need !== 'number') {
            lookupMissLog.push(
              `Need is not a number for ${page}.${question}.${unitKey}.  Instead it's: ${need}`,
            )
            continue
          }

          const product = mapProduct(page, question, unitKey)
          if (product === undefined) {
            lookupMissLog.push(
              `No product defined for ${page}.${question}.${unitKey}`,
            )
            continue
          }
          const place = placeMapper(placeKey)
          if (place === undefined) {
            lookupMissLog.push(`No place defined for ${placeKey}`)
            continue
          }

          quarter = quarter.toUpperCase()

          const needsData = {
            id: `DA Need - ${surveyId.id} ${quarter} ${JSON.stringify(
              place,
            )} ${JSON.stringify(product)}`,
            survey: {
              ...surveyId,
              quarter,
            },
            place,
            product,
            need: Math.floor(need),
          }

          needsDatas.push(needsData)
        }
      }
    }
  }

  return { needsDatas, lookupMissLog }
}
