const { readdirSync, readFileSync, link } = require('fs')
const path = require('path')

const reportFolder = path.join(process.cwd(), '.lighthouseci')

const linksJson = path.join(reportFolder, 'links.json')
let links = {}
try {
  links = JSON.parse(readFileSync(linksJson, 'utf-8'))
} catch {
  console.error('Failed to load', linksJson)
}
const report = {}

for (const reportFile of readdirSync(reportFolder)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => f.startsWith('lhr-'))) {
  const reportData = JSON.parse(
    readFileSync(path.join(reportFolder, reportFile), 'utf-8'),
  )

  const page = new URL(reportData.requestedUrl).pathname

  Object.values(reportData.categories)
    .filter(({ title }) => title !== 'PWA') // this site is not a PWA
    .forEach(({ title, score }) => {
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
    const reportUrl = Object.entries(links).find(([pageUrl]) =>
      pageUrl.endsWith(page),
    )?.[1]

    let title = page
    if (reportUrl !== undefined) {
      title = `[${page}](${reportUrl})`
    }
    console.log(
      `| ${[title, ...headers.map((s) => Math.round(scores[s] * 100))].join(
        ' | ',
      )} |`,
    )
  })
}
