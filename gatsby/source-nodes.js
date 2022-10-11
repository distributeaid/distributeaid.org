const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const {
  isProductSurveyPage,
  productMapper,
  placeMapper,
} = require('./utils/needs-assessment-mappers')

module.exports = {
  /*
  Needs Assessment Data
  ================================================================================
  */
  sourceNeedsAssessmentData: async ({
    actions: { createNode },
    createContentDigest,
    reporter,
    createNodeId,
  }) => {
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

    surveys.forEach(async (survey) => {
      const url = `https://storage.needs-assessment.distributeaid.dev/form/${survey.id}/summary?groupBy=timeOfYear.quarter,basicInfo.region`
      const result = await fetch(url)
      if (result.status !== 200) {
        reporter.panic(
          `Build failed`,
          new Error(`Could not source needs assessment data: ${url}`),
        )
      }

      const resultData = await result.json()
      console.info(`sourced needs assessment survey from ${url}`)

      Object.entries(resultData.summary).forEach(([quarter, places]) => {
        quarter = quarter.toUpperCase()

        Object.entries(places).forEach(([placeKey, pages]) => {
          Object.entries(pages).forEach(([page, questions]) => {
            if (isProductSurveyPage(page)) {
              Object.entries(questions).forEach(([question, units]) => {
                const unitKey = Object.keys(units)[0]
                const need = Object.values(units)[0]
                const product = productMapper(page, question, unitKey)
                const place = placeMapper(placeKey)

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
              })
            }
          })
        })
      })
    })
  },
}
