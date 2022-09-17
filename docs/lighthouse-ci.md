# Lighthouse checks

## No PWA (Progressive Web App)

This site is not intended to be used as a progressive web app, so no PWA
features are implemented and the relevant Lighthouse CI checks are disabled.

## Disable Lighthouse (LHCI) rule `unused-javascript`

The rule has been disabled because currently Gatsby.js does not pass this check,
which is a [known issue](https://github.com/gatsbyjs/gatsby/issues/24332).
