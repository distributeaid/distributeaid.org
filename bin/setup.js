const spaceImport = require('contentful-import')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileSync } = require('fs')

const argv = require('yargs-parser')(process.argv.slice(2))

console.log(`
  To set up this project you need to provide your ${chalk.green('Space ID')}
  and a ${chalk.green('Content Delivery API Token')}.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red(
      '->',
    )} API keys`,
  )}

  Ready? Let's do it! 🎉
`)

const questions = [
  {
    name: 'spaceId',
    message: 'Your Space ID',
    when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID,
    validate: (input) =>
      /^[a-z0-9]{12}$/.test(input) ||
      'Space ID must be 12 lowercase characters',
  },
  {
    name: 'accessToken',
    when: !argv.accessToken,
    message: 'Your Content Delivery API Token',
  },
]

inquirer
  .prompt(questions)
  .then(({ spaceId, accessToken }) => {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

    // env vars are given precedence followed by args provided to the setup
    // followed by input given to prompts displayed by the setup script
    spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId
    accessToken = CONTENTFUL_ACCESS_TOKEN || argv.accessToken || accessToken

    console.log('Writing config file...')
    const configFiles = [`.env.development`, `.env.production`].map((file) =>
      path.join(__dirname, '..', file),
    )

    const fileContents =
      [
        `# All environment variables will be sourced`,
        `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
        `# Do NOT commit this file to source control`,
        `CONTENTFUL_SPACE_ID='${spaceId}'`,
        `CONTENTFUL_ACCESS_TOKEN='${accessToken}'`,
      ].join('\n') + '\n'

    configFiles.forEach((file) => {
      writeFileSync(file, fileContents, 'utf8')
      console.log(`Config file ${chalk.yellow(file)} written`)
    })
    return { spaceId }
  })
  .then((_, error) => {
    console.log(
      `All set! You can now run ${chalk.yellow(
        'yarn dev',
      )} to see it in action.`,
    )
  })
  .catch((error) => console.error(error))
