# Distribute Aid's Landing Site

[![CodeSee: View Architecture Diagram](./codesee-badge.svg)](https://app.codesee.io/maps/public/ddc21460-098f-11ec-b053-333e0b8cd199)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/distributeaid/distributeaid.org)

Distribute Aid's landing site provides general information about our org, specific information about our projects / operations, and public access to the materials and tools we have developed. The main goals of this project are to:

1. Introduce Distribute Aid, the work we do, our impact to date, and the many people who have contributed over the years.

2. Make it easy for our non-dev volunteers to directly manage content and publish changes to the site.

3. Share relevant knowledge / data / tools that inspire visitors to take action in support of DA, our network, and grassroots aid groups in general.

**Quick Links**

- Production Site - [https://distributeaid.org](https://distributeaid.org)
- Github Repo - [https://github.com/distributeaid/distributeaid.org](https://github.com/distributeaid/distributeaid.org)
- \*\* Forestry CMS - [https://app.forestry.io/sites/0pvklfck1gkdpg/#/](https://app.forestry.io/sites/0pvklfck1gkdpg/#/)
- \*\* Netlify Admin - [https://app.netlify.com/sites/da-landing-2/overview](https://app.netlify.com/sites/da-landing-2/overview)

\*\* require an account to access, please tag @jtfairbank in a comment if you need one

## Development Process

### Code of Conduct

First, please read our [code of conduct](https://github.com/distributeaid/.github/blob/saga/CODE_OF_CONDUCT.md).

### Issue Tracking

We use [Github issues](https://github.com/distributeaid/distributeaid.org/issues_) to manage development tasks for this repository. The issues themselves are fairly light on detail in favor of a simple description of scope (i.e. the conditions for the task being considered "done"). Most tasks will be driven by content requirements, so please coordinate with the requesting content creator for context, sample content, and additional details. We strive to include an issue-specific CodeSee Map to highlight relevant files and folders.

When you begin working on an issue, please self-assign or comment on it indicating you're beginning work to avoid duplicate effort.

Issues with `triage` labels are still being finalized and are not ready for work.

### Pull Requests

When you're ready to submit your code, open a pull request with "Closes #X" in
the description to link the relevant issue. Our automated checks will run,
and then your PR will be reviewed by a maintainer. Once any pending issues are
resolved, the maintainer will merge it into our production branch, `saga`.

We recommend creating a "draft" pull request while you are still working on the issue.
This allows you to ask maintainers for help / feedback during the dev process,
and allows other contributors to see what you are working on for inspiration and
to prevent duplicate efforts. You can make a draft pull request by following steps:

1. Create a new branch to work on and make at least 1 commit (ex: add your name to the `/CONTRIBUTORS.md` file).
2. Push the new branch and go to [pull request page](https://github.com/distributeaid/distributeaid.org/pulls) on Github. Accept the prompt that appears at the top of the page asking if you want to create a new pull request.
3. Create the pull request like normal. Before submitting it, click the dropdown arrown on the "Create Pull Request" submit button and select "Create Draft" instead.
4. You can now share your code and collaborate with other contributors / maintainers through the draft pull request. The draft pull request will automatically include any new commits pushed to your branch, just like a normal pull request.
5. Once you've finished working on the issue, click the "ready for review" button on the pull request page and the "draft" status will be removed and a maintainer can begin the review phase.

### Reviews

DA aims to create a welcoming and encouraging environment for our contributors. It's easy for the intention of code review comments to be unclear or get misinterpreted. To help with communication, reviewers are encouraged to use [conventional comments](https://conventionalcomments.org/) and explicitly indicate that comments are `(blocking)`, where the discussion must be resolved for PR to be merged, or `(non-blocking)` where resolving the discussion is optional for the implementer.

#### Approval and Merging

Reviewers should grant approval if they do not feel additional review is necessary before merging. This does not necessarily mean no more changes are required before merging, but that any further changes are expected to be minor enough to not require review.

If the pull request does not require additional changes, the reviewer should merge it immediately. Otherwise, the pull request author should address all comments marked `(blocking)` or `nit`. Contributors are encouraged to at least reply to `(non-blocking)` and `(if-minor)` comments if they do not address them with code changes. After addressing the comments, the pull request author should tag the reviewer in a comment to indicate they are ready for a final review.

## Dev Setup

### Remote Development

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/distributeaid/distributeaid.org)

Pressing the "Open in Gitpod" button will start up a VSCode instance in the cloud, getting you up and running easily / quickly. You can share this instance with other contributors to pair remotely. Gitpod uses the `.gitpod.yml` settings to automatically configure your dev environment. You'll need to sign in with GitHub.

> **Note**: When choosing VS Code desktop with Gitpod always be sure to select Linux from the dropdown as the operating system when prompted.

> **Note**: Your Gitpod instance will expire after you stop using it. To ensure your code is saved, you MUST create a branch, commit code changes, and push the branch up to Github.

> **Troubleshooting**: Sometimes Gitpod runs into trouble when configuring the dev environment. If you run into problems, double check the different terminals to ensure that the `yarn install` and `npx playwright install-deps` setup commands completed successfully, the dev server is running, and the storybook server is running.

### Local Development

Install system dependencies:

- Node v16
- Yarn v1.22.5

Install project dependencies:

- `yarn`

Run the dev server:

- `yarn dev`

Finally, checkout the local site & GraphQL sandbox at:

- [http://localhost:8000/](http://localhost:8000/)
- [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql)

## Dev Notes

### Crucial Commands

**`yarn dev`**

Run the project locally with live reload in development mode.

Live reload works when changing files in `/src`, but if you are changing
`/gatsby-node.js` or files in `/gatsby` you will have to restart the dev server
and possibly run a `yarn clean` to have them take effect. That's because these
files control Gatsby's build process which is run once when starting the server,
as opposed to `/src` files which control the site's UI.

**`yarn clean`**

Remove data and build artifacts from Gatsby's cache.

We recommend doing this whenever you change branches or think you may be running
into issues caused by incorrect / outdated cached data. You may also need to run
this between builds if you are changing `/gatsby-node.js` or files in `/gatsby`.

**`yarn build`**

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

**`yarn serve`**

Spin up a production-ready server with the site. Don't forget to build your page beforehand.

### Prettify Your Code

**`yarn pretty`**

This is included in our pre-commit hook so all committed code is formatted the same.

### Running the unit tests

**`yarn test`**

### Running the end to end tests

First start the local server with `yarn dev`.
Then run `yarn test:e2e` in another terminal.

### Running TypeScript Checks

**`yarn test:types`**

This is included in our pre-commit hook so all committed code is type safe.

### Component development with Storybook

[Storybook](https://storybook.js.org/) is a frontend workshop for building UI components and pages in isolation. Components can have an arbitrary number of stories, gathered in files ending with `.stories.tsx` next to the component source file.

The documentation site has extensive [guides](https://storybook.js.org/docs/react/why-storybook) and [tutorials](https://storybook.js.org/tutorials/). The page [What's a Story](https://storybook.js.org/docs/react/get-started/whats-a-story) is a must read. In short, each story describes a specific usage of a component, rendered in isolation within the Storybook UI. Controls and knobs can be used to change the component properties dynamically.

First run the dev server with `yarn dev`. Then run `yarn storybook` in another termainal. This will start the Storybook server at the following address:

[http://localhost:6006/](http://localhost:6006/)

### Code visibility with CodeSee

We recommend you [create a CodeSee account](https://www.codesee.io/welcome), free for open source development. We use their [codebase maps](https://docs.codesee.io/docs/explore-your-map) tool during our development and review processes to help make it easy to understand your changes or any problems you might run into along the way.

### Where To Put Things

Please see these CodeSee Maps for more comprehensive signposting:

- [Architecture Diagram](https://app.codesee.io/maps/public/ddc21460-098f-11ec-b053-333e0b8cd199)

Our react `src/` folder layout was inspired by [this blog post](https://charles-stover.medium.com/optimal-file-structure-for-react-applications-f3e35ad0a145) but can be changed up as desired.

Data sourcing & processing code used by `/gatsby-node.js` should go in `/gatsby`.

Content is committed to `/content` by Forestry, our CMS. You can also place images, pdfs, and other file-based content in `/static`, but it's usually more appropriate to add them through Forestry.

### Content management system

We use [Forestry](https://forestry.io) to manage our content. Forestry is a "git-based CMS", which means that all the content is stored inside this repo.

Visit the `/.forestry` directory to view the configuration for our site, templates, and data files.

All the content is stored inside the `/content` directory.

#### How do I edit content?

There are 2 ways to edit content:

- edit files in the `/content` directory and make a pull request through github
- make changes in Forestry's UI (requires an account, tag @jtfairbank in a comment if you need one)

## Deployment & Production

[Netlify](https://www.netlify.com/) auto-generates build previews when pull requests are submitted on Github
(including draft pull requests). You can access them by going to the relevant
PR and clicking the "details" link on the `netlify/da-landing-2/deploy-preview`
check. Note that all other checks have to pass for a build preview to be made.

Netlify also automatically deploys the production site from our `saga` branch.
Pushing commits or merging pull requests into `saga` will trigger the deploy
after all checks are passed. If the checks or build process fail, Netlify will
continue to serve the existing version of the site.

## Technologies Used

**Content Management**

- [Forestry](https://forestry.io/) - headless cms

**General Tools**

- [Typescript](https://www.typescriptlang.org/) - scripting language
- [Yarn](https://yarnpkg.com/) - package manager
- [Prettier](https://prettier.io/) - code formatter (via the pretty-quick node module)
- [Jest](https://jestjs.io/) - unit test framework
- [Playwright](https://playwright.dev/) - end-to-end (E2E) test framework
- [Storybook](https://storybook.js.org/) - component and page development workshop
- [CodeSee](https://www.codesee.io/) - codebase maps and code visibility

**Build Tools**

- [Gatsby.js](http://gatsbyjs.org/) - static site generator

**Front End**

- [React.js](https://reactjs.org/) - UI framework
- [Tailwind.css](https://tailwindcss.com/) - CSS framework

**Production**

- [Netlify](https://www.netlify.com/) - build runner & hosting

## Previous Work & Credits

Initial commit bootstrapped off of [Contentful Gatsby Starter Blog](https://github.com/contentful/starter-gatsby-blog/) which is MIT licensed.

The original DA Landing Site project can be found at [https://gitlab.com/distribute-aid/landing](https://gitlab.com/distribute-aid/landing). <3
