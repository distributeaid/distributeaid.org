require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// default to showing the Delivery API
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
}

// show the Preview API if the host is set
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN
}

// Throw an error if the contentful environment vars aren't setup. Unless we're
// in production where they aren't needed, since the site's already been generated.
const { spaceId, accessToken } = contentfulConfig
if (process.env.NODE_ENV !== 'production' && (!spaceId || !accessToken)) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided. Run `yarn setup`.',
  )
}

module.exports = {
  siteMetadata: {
    domain: 'distributeaid.org',
  },
  pathPrefix: '/',

  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@components': 'src/components',
          '@templates': 'src/templates',
          '@pages': 'src/pages',
          '@types': 'src/types',
          '@layouts': 'src/layouts',
        },
      },
    },
  ],
}
