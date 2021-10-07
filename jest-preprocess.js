const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
}

module.exports = require('babel-jest').default.createTransformer(babelOptions)
