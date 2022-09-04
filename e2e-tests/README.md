This folder contains end-to-end tests implemented using
[Playwright](https://playwright.dev/).

## Running end-to-end tests during development

Start the development server, then run

    yarn run test-e2e

to run the end-to-end tests.

### Debug mode

You can launch the [Playwright Inspector](https://playwright.dev/docs/debug) by setting the environment variable `PWDEBUG` to `1`.

    PWDEBUG=1 yarn run test-e2e
