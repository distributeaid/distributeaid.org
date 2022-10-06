import type { Config } from 'jest'

const config: Config = {
  testEnvironment: `jsdom`,
  testRegex: '.+\\.(test|spec)\\.(j|t)sx?$',
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.ts'],
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '^@components/(.*)$': ['<rootDir>/src/components/$1'],
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `<rootDir>.*/e2e-tests`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
}

export default config
