const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = {
  /*
  Needs Assessment Data
  ================================================================================
  */
  sourceNeedsAssessmentData: async ({
    actions: { createNode },
    createContentDigest,
    createNodeId,
  }) => {
    const survey = {
      id: '01G4X7XTMCD6MFHDT5KS7Z27GF',
      year: '2022',
      quarter: 'q3',
      region: 'southernGreece',
    }
    const result = await fetch(
      `https://storage.needs-assessment.distributeaid.dev/form/${survey.id}/summary?basicInfo.region=${survey.region}&timeOfYear.quarter=${survey.quarter}`,
    )
    const resultData = await result.json()

    createNode({
      // Node Data
      survey: {
        ...survey,
        responseCount: resultData.stats.count,
      },
      results: {
        ...resultData.summary,
      },

      // Gatsby Fields
      id: createNodeId(
        `DA Needs Assessment Summary - ${survey.id} ${survey.year} ${survey.quarter} ${survey.region}`,
      ),
      parent: null,
      children: [],
      internal: {
        type: `DANeedsAssessmentSummary`,
        contentDigest: createContentDigest(resultData),
      },
    })
  },
}
