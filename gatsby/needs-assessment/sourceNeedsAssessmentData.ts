import fetch from 'cross-fetch'
import { SourceNodesArgs } from 'gatsby'
import { Product } from '../../src/types/product-types'
import {
  isProductSurveyPage,
  placeMapper,
  PlacePartial,
  productMapper,
} from './needs-assessment-mappers'

type SurveyId = {
  id: string
  year: string
}

type NeedsAssessmentSummary = {
  summary: Record<
    string,
    Record<string, Record<string, Record<string, Record<string, number>>>>
  >
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
const surveyIds: SurveyId[] = [
  {
    // Q2
    id: '01FXN0BYG1X8509Y8DTDCB8WKB',
    year: '2022',
  },
  {
    // Q3
    id: '01G4X7XTMCD6MFHDT5KS7Z27GF',
    year: '2022',
  },
  {
    // Q4
    id: '01GCW8TQFCE92TR1NXH8NEET7F',
    year: '2022',
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
    const summary = await fetchNeedsAssessment(surveyId)
    if (summary instanceof Error) {
      reporter.panic(`Sourcing Failed`, summary)
      continue
    }

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
): Promise<NeedsAssessmentSummary | Error> => {
  const url = `https://storage.needs-assessment.distributeaid.dev/form/${survey.id}/summary?groupBy=timeOfYear.quarter,basicInfo.region`

  const result = await fetch(url)
  if (result.status !== 200) {
    return new Error(`Could not source needs assessment data: ${url}`)
  }

  const resultData = (await result.json()) as NeedsAssessmentSummary
  return resultData
}

export const processNeedsAssessment = (
  surveyId: SurveyId,
  survey: NeedsAssessmentSummary,
): {
  needsDatas: NeedsData[]
  lookupMissLog: string[]
} => {
  const needsDatas: NeedsData[] = []
  const lookupMissLog: string[] = []

  for (let [quarter, places] of Object.entries(survey.summary)) {
    for (const [placeKey, pages] of Object.entries(places)) {
      for (const [page, questions] of Object.entries(pages)) {
        if (!isProductSurveyPage(page)) continue
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

          const product = productMapper(page, question, unitKey)
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
            need,
          }

          needsDatas.push(needsData)
        }
      }
    }
  }

  return { needsDatas, lookupMissLog }
}
