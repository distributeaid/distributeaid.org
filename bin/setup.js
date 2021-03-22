const spaceImport = require('contentful-import')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileSync } = require('fs')

const argv = require('yargs-parser')(process.argv.slice(2))

console.log(`
  To set up this project you need to provide your:

    - ${chalk.green('Space ID')},
    - ${chalk.green('Content Delivery API Token')}
    - ${chalk.green('Content Preview API Token')}
    - (optional) ${chalk.green('Content Management API Personal Access Token')}


  ${chalk.yellow.bold(
    '⚠ NOTE:',
  )} We recommend you setup a read-only service user
          which owns the ${chalk.green(
            'Content Management API Personal Access Token',
          )}
          as it is only used for generating TypeScript types from Contentful.
          
          https://github.com/intercom/contentful-typescript-codegen/issues/37#issuecomment-646766728


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
    name: 'deliveryToken',
    when: !argv.deliveryToken,
    message: 'Your Content Delivery API Token',
  },
  {
    name: 'previewToken',
    when: !argv.previewToken,
    message: 'Your Content Preview API Token',
  },
  {
    name: 'managementToken',
    when: !argv.managementToken,
    message: '(optional) Content Management API Personal Access Token',
  },
]

inquirer
  .prompt(questions)
  .then(({ spaceId, deliveryToken, previewToken, managementToken }) => {
    const {
      CONTENTFUL_SPACE_ID,
      CONTENTFUL_DELIVERY_TOKEN,
      CONTENTFUL_PREVIEW_TOKEN,
      CONTENTFUL_MANAGEMENT_TOKEN,
    } = process.env

    // env vars are given precedence followed by args provided to the setup
    // followed by input given to prompts displayed by the setup script
    spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId
    deliveryToken =
      CONTENTFUL_DELIVERY_TOKEN || argv.deliveryToken || deliveryToken
    previewToken = CONTENTFUL_PREVIEW_TOKEN || argv.previewToken || previewToken
    managementToken =
      CONTENTFUL_MANAGEMENT_TOKEN || argv.managementToken || managementToken

    console.log('Writing config file...')
    const configFiles = [`.env.development`, `.env.production`].map((file) =>
      path.join(__dirname, '..', file),
    )

    const fileContents =
      [
        `# Do NOT commit this file to source control`,
        `#`,
        `# All environment variables will be sourced and made available to`,
        `# gatsby-config.js, gatsby-node.js, getContentfulEnvironment.js, etc.`,
        ``,
        `CONTENTFUL_SPACE_ID='${spaceId}'`,
        `CONTENTFUL_ENVIRONMENT='master'`,
        ``,
        `# Uncomment to use the Preview API instead of the Delivery API.`,
        `# CONTENTFUL_HOST='preview.contentful.com'`,
        ``,
        `CONTENTFUL_DELIVERY_TOKEN='${deliveryToken}'`,
        `CONTENTFUL_PREVIEW_TOKEN='${previewToken}'`,
        `CONTENTFUL_MANAGEMENT_TOKEN='${managementToken}'`,
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
