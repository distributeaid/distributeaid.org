const { readdirSync, readFileSync } = require('fs')
const path = require('path')

const report = {}

for (const reportFile of readdirSync(path.join(process.cwd(), '.lighthouseci'))
  .filter((f) => f.endsWith('.json'))
  .filter((f) => f.startsWith('lhr-'))) {
  const reportData = JSON.parse(
    readFileSync(
      path.join(process.cwd(), '.lighthouseci', reportFile),
      'utf-8',
    ),
  )
  console.error(
    JSON.stringify({
      reportData,
    }),
  )
  const page = new URL(reportData.requestedUrl).pathname

  Object.values(reportData.categories).forEach(({ title, score }) => {
    if (report[page] === undefined) report[page] = {}
    report[page][title] = score
  })
}

console.log(`# Lighthouse result`)
console.log('')

if (Object.values(report).length === 0) {
  console.log('No reports found.')
} else {
  const headers = Object.keys(Object.values(report)[0])

  console.log(`| ${['Page', ...headers].join(' | ')} |`)
  console.log(
    `| ${['----', ...headers.map((s) => '-'.repeat(s.length))].join(' | ')} |`,
  )
  Object.entries(report).forEach(([page, scores]) => {
    console.log(
      `| ${[page, ...headers.map((s) => Math.round(scores[s] * 100))].join(
        ' | ',
      )} |`,
    )
  })
}
