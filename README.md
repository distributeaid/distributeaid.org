# DA Landing Site 2.0

[![CodeSee: View Architecture Diagram](./badge.svg)](https://app.codesee.io/maps/public/ddc21460-098f-11ec-b053-333e0b8cd199)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/distributeaid/distributeaid.org)

Distribute Aid's landing site, where we get to tell the world who the heck we are and what the hell we're doing!

The main goals of this project are to:

1. Create a landing site that introduces Distribute Aid, highlights our projects & services, publicly documents our impact, communicates upcoming plans to our network, highlights how to join / support us, and of course credits the many people who have contributed over the years.

2. Make it easy for any Distribute Aid volunteer to manage content and publish changes to the site directly. This includes all text & images, but also data that powers components, pages & site structure, and some site metadata.

3. Provide engaging pathways for design & dev volunteers to directly collaborate with the rest of the team, without holding them back. Our whole team will be contributing well structured content, which helps clarify what's needed without a ton of meetings. Use your favorite tools to make it shine.

**Quick Links**

- Production Site - [https://distributeaid.org](https://distributeaid.org)
- Github Repo - [https://github.com/distributeaid/distributeaid.org](https://github.com/distributeaid/distributeaid.org)

**Key Documents**

- [Project Overview](https://www.notion.so/distributeaid/Landing-2-0-c85002a23d94423bb79f4c64802c4c47)

## Development Process

### Code of Conduct

First, please read our [code of conduct](https://github.com/distributeaid/.github/blob/saga/CODE_OF_CONDUCT.md).

### Issue Tracking

Development tasks are managed in the github issues for this repository. The issues themselves are fairly light on detail in favor of a simple description of scope (i.e. the conditions for the task being considered "done"). Most tasks will be driven by content requirements, so please coordinate with the requesting content creator for context, sample content, and additional details.

Issues tagged front end will also be tagged with:

- `needs sample content` - A content creator needs to create sample content to show what information will be presented.
- `needs UI mock` - A designer needs to create a UI mock of the component.
- `has content & UI mock` - The task is ready for development!

When you begin working on an issue, please self-assign or comment on it indicating you're beginning work to avoid duplicate effort.

### Pull Requests

When you're ready to submit your code, open a pull request with "Closes #X" to link the relavant issue. When your PR is approved by at least one maintainer it is ready to submit.

It's easy for the intention of code review comments to be unclear or get misinterpreted. To help with communication, reviewers are encouraged to use [conventional comments](https://conventionalcomments.org/) and explicitly indicate that comments are `(blocking)`, where the discussion must be resolved for PR to be merged, or `(non-blocking)` where resolving the discussion is optional for the implementer.

We highly recommend you [create a CodeSee account](https://www.codesee.io/welcome), free for open source development. We use their [data-flow recordings](https://docs.codesee.io/docs/introduction-to-recordings) and [codebase maps](https://docs.codesee.io/docs/explore-your-map) tool during our development and review processes to help make it easy to understand your changes or any problems you might run into along the way.

#### Approval and merging

Reviewers should grant approval if they do not feel additional review is necessary before merging. This does not necessarily mean no more changes are required before merging, but that any further changes are expected to be minor enough to not require review.

If the pull request does not require additional changes, the reviewer should merge it immediately after approving. Otherwise, the pull request author should merge (if able) once they have addressed all comments marked `(blocking)` or `nit`. Contributors are encouraged to at least reply to `(non-blocking)` and `(if-minor)` comments if they do not address them with code changes.

## Dev Setup

### Remote development:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/distributeaid/distributeaid.org)

Gitpod allows us to pair on the cloud, as well as have an automatic setup with `.gitpod.yml` and get up and running right away.

Pressing the "Open in Gitpod" button will start up an VSCode-based instance in the cloud allowing you to be up and running with the codebase. You'll need to sign in with GitHub.

### Locally

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

**`yarn build`**

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

**`yarn serve`**

Spin up a production-ready server with the site. Don't forget to build your page beforehand.

**`yarn clean`**

Remove cached data from Gatsby, including data pulled in from Contentful. A good first step if you believe you are running into issues caused by incorrect or outdated cached data.

### Where To Put Things

React `src/` folder layout inspired by [this blog post](https://charles-stover.medium.com/optimal-file-structure-for-react-applications-f3e35ad0a145) but can be changed up as desired.

### Content management system

We use [Forestry](https://forestry.io) to manage our content. Forestry is a "git-based CMS", which means that all the content is stored inside this repo.

Visit the `.forestry` directory to view the configuration for our site, templates, and data files.

All the content is stored inside the `content` directory.

#### How do I edit content?

There are 3 ways to do edit content:

- make a pull request through GitHub's UI
- clone this repository and create a pull request
- make changes in Forestry's UI (you'll need a Forestry account)

## Deployment & Production

TODO

## Content Creation

TODO

## Technologies Used

> Our Content "Supply Chain"

The Distribute Aid Landing Site is a static TypeScript website generated by GatsbyJS with content from the Contentful headless CMS.

**Content Management**

- [Contentful](https://www.contentful.com/) - headless cms

**General Tools**

- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/) - package manager
- [Prettier](https://prettier.io/) - code formatter (via the pretty-quick node module)
- [Jest](https://jestjs.io/) - test framework

**Build Tools**

- [Gatsby.js](http://gatsbyjs.org/) - static site generator

**Front End**

- [React.js](https://reactjs.org/)
- [Tailwind.css](https://tailwindcss.com/)

**Production**

- [Netlify](https://www.netlify.com/) build runner & hosting

## Previous Work & Credits

Initial commit bootstrapped off of [Contentful Gatsby Starter Blog](https://github.com/contentful/starter-gatsby-blog/) which is MIT licensed.

The original DA Landing Site project can be found at [https://gitlab.com/distribute-aid/landing](https://gitlab.com/distribute-aid/landing). <3
