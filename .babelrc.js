require('dotenv').config()

const devPlugins = []
if (!process.env.DISABLE_CODESEE_INSTRUMENTATION) {
  devPlugins.push(['@codesee/instrument', { hosted: true }])
}

module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
  ],
  env: {
    development: {
      plugins: devPlugins,
    },
  },
}
