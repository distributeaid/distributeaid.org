import fetch from 'cross-fetch'
import { SourceNodesArgs } from 'gatsby'
import {
  isProductSurveyPage,
  placeMapper,
  productMapper,
} from './needs-assessment-mappers'

type NeedsAssessmentSummary = {
  summary: Record<string, Record<string, Record<string, number>>>
  stats: { count: number }
}

export const sourceNeedsAssessmentData = async ({
  actions: { createNode },
  createContentDigest,
  reporter,
  createNodeId,
}: SourceNodesArgs) => {
  // NOTE: previous surveys were conducted with Google Forms, then Qualtrics.
  //       need to load the data manually
  const surveys = [
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

  for (const survey of surveys) {
    reporter.info(`Fetching survey ${survey.id}`)
    const url = `https://storage.needs-assessment.distributeaid.dev/form/${survey.id}/summary?groupBy=timeOfYear.quarter,basicInfo.region`
    const result = await fetch(url)
    if (result.status !== 200) {
      reporter.panic(
        `Build failed`,
        new Error(`Could not source needs assessment data: ${url}`),
      )
      continue
    }

    const resultData = (await result.json()) as NeedsAssessmentSummary
    reporter.info(`sourced needs assessment survey from ${url}`)

    for (let [quarter, places] of Object.entries(resultData.summary)) {
      for (const [placeKey, pages] of Object.entries(places)) {
        for (const [page, questions] of Object.entries(pages)) {
          if (!isProductSurveyPage(page)) continue
          for (const [question, units] of Object.entries(questions)) {
            const unitKey = Object.keys(units)[0]
            if (unitKey === undefined) {
              reporter.error(`No unit key defined for ${page}.${question}`)
              continue
            }
            const need = Object.values(units)[0]
            const product = productMapper(page, question, unitKey)
            if (product === undefined) {
              reporter.error(
                `No product defined for ${page}.${question}.${unitKey}`,
              )
              continue
            }
            const place = placeMapper(placeKey)
            if (place === undefined) {
              reporter.error(`No place defined for ${placeKey}`)
              continue
            }

            const nodeData = {
              survey: {
                ...survey,
                quarter,
              },
              place,
              product,
              need,
            }

            createNode({
              // Node Data
              ...nodeData,

              // Gatsby Fields
              id: createNodeId(
                `DA Need - ${survey.id} ${quarter} ${JSON.stringify(
                  place,
                )} ${JSON.stringify(product)}`,
              ),
              parent: null,
              children: [],
              internal: {
                type: `DANeed`,
                contentDigest: createContentDigest(nodeData),
              },
            })
          }
        }
      }
    }
  }
}
