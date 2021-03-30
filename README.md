# Toast Frontend Template

[![Web
2.0](https://img.shields.io/badge/web-2.0-blue.svg?logo=internet-explorer&logoColor=fff)](https://toasttab.atlassian.net/wiki/spaces/ENG/pages/309428526/Web+2.0)
[![Chat in Slack #front-end-dev](https://img.shields.io/badge/chat-%23front--end--dev-blue.svg?logo=slack)](https://toasttab.slack.com/app_redirect?channel=CBWRBBJEL)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-f7df1e.svg?logo=javascript&logoColor=f7df1e)](https://github.com/standard/standard)
[![Build
Status](https://jorkins.eng.toasttab.com/buildStatus/icon?job=spa/frontend-template/master)](https://jorkins.eng.toasttab.com/job/spa/job/frontend-template/job/master/)
[![Deploy to
Preprod](https://img.shields.io/badge/deploy%20to-preprod-orange.svg)](https://jorkins.eng.toasttab.com/job/deploy/job/register-spa-with-svcmgmt/parambuild/?SERVICE_NAME=frontend-template)
[![Elevate in
Preprod](https://img.shields.io/badge/elevate%20in-preprod-orange.svg)](https://preprod.eng.toasttab.com/toastg2ops/service?service=frontend-template)
[![Destroy in
Preprod](https://img.shields.io/badge/destroy%20in-preprod-red.svg)](https://jorkins.eng.toasttab.com/job/destroy/job/destroy-spa/parambuild/?SERVICE_NAME=frontend-template)

## Overview

> The future, today.

Note: this template is usable, but is not yet finished. However, there's a [v1.0
roadmap in JIRA](https://toasttab.atlassian.net/browse/W0-48)!

Want to build in TypeScript? Check out https://github.com/toasttab/frontend-template/tree/feature/add-typescript.

## Creating a New Web App

This process will eventually be refined, but for now:

```bash
# Clone this repo into a new project directory
cd ~/toast/git-repos
git clone git@github.com:toasttab/frontend-template.git your-repo-name

# Enter the project directory
cd your-repo-name

# Reset the git history
rm -rf .git
git init

# Edit the "name" property in package.json to be your-repo-name

# Make your initial commit
git add .
git commit -m "Initial commit."
```

## Developing

Make sure you have [Volta](https://volta.sh/) installed. Volta will automatically use the correct version of Node and Yarn for this project.

To run the SPA:

```bash
# First time only, install SSL certs
yarn fetch-certs
# Install dependencies
yarn
# Run the dev server
yarn dev
```

## Package first Development

Frontend template comes with a local buffet development setup. With it, you can follow a package first development approach. What this means in practice is we provide you with the tools to develop new components as packages, without any slowdown in you development process. This is achieved using the caterer CLI tool which handles all of the setup work for you, and a local storybook that helps you develop new components in isolation. The packages developed in this way can easily be moved to Buffet when they have proven there worth in your application, equally you can choose to keep your component as a local package.

## Tailwindcss config - @toasttab/buffet-pui-styles

The frontend template is setup with a customised version of Tailwindcss that codifies the new Project UI styles, this is the recommend way to create new SPAs in the project UI style. 

### Project Commands

* `yarn` - Install project node module dependencies
* `yarn start` - Start the production node server using HTTP
* `yarn dev` - Start the node server in dev mode, on an available port, using
  HTTPS, with webpack middleware
* `yarn build` - Build client app assets to `dist/` directory (used by Jenkins)
* `yarn fetch-certs` - Download `toast-gateway` SSL certs into
  `.build/ssl-certs/` for the dev server
* `yarn lint` - Lint all JS & CSS files
* `yarn lint:js` - Lint all JS files
* `yarn lint:css` - Lint all CSS files
* `yarn prepush` - Runs `test` command on git prepush hook
* `yarn reference:build [git-ref]` - Creates a reference prod build of the
  project in `.build/reference/` at the specified git ref for easy comparison
  of file size deltas when `yarn build` is run. If no git-ref is specified,
  defaults to `master`
* `yarn reference:remove` - Delete any existing reference build.
* `yarn report:size` - Display size report for built assets in `dist`. If a
  reference build exists, will show size deltas
* `yarn test` - Runs `lint` and `test:unit` commands (used by Jenkins)
* `yarn test:unit` - Runs JS unit tests, generating files for test/coverage report
* `yarn test:coverage` - Runs JS unit tests, generating coverage summary table
* `yarn watch` - Runs JS unit tests, re-running when files change
* `yarn storybook` - Starts a local storybook
* `yarn caterer` - alias to yarn cater
* `yarn cater create` - Starts the caterer CLI and helps you create a new package.
* `yarn cater add` - Lets you yarn add packages to locally scoped package.

### Developing without Toastweb
This will allow you to develop your SPA without having to make changes to Toastweb.
* Run `yarn dev`
* Navigate to https://dev.eng.toastteam.com/spa-dev/your-repo-name

### Environment Variables

* `NODE_ENV` - Current environment. May be `production` or `development`.
  If not set, defaults to `development`.
* `SERVER_HOST` - Node server host. If not set, defaults to `localhost` in
  production or `dev.eng.toastteam.com` in development.
* `SERVER_PORT` - Node server port. If not set, defaults to `3000`. In
  development, if the port is already in use, an available port will be
  automatically chosen.
* `SERVER_SSL` - Should node server use SSL? May be `1` or empty. If not set,
  defaults to true (HTTPS) in development and false (HTTP) in production.
* `BUILD_DIR` - Absolute path to `public/temp` directory inside of toastweb.
  Used to determine where files are built in development for previewing in
  toastweb. If not set, `${TOAST_GIT}/toastweb/public/temp` is used.
* `TOAST_GIT` - Absolute path to toast git-repos directory. This should have been
  set by the [development-setup](https://github.com/toasttab/development-setup)
  process. If it wasn't, you can manually add `export TOAST_GIT=~/toast/git-repos`
  to your `~/.bashrc` file.

### Project Directory Structure

React app code:

* `client/`
  * `index.jsx` - Client entry point. Import `App` component and global styles here
  * `components/`
    * `App/`
      * `App.jsx` - Top-level App component
    * `SampleComponent/`
      * `SampleComponent.jsx` - A sample component
      * `SampleComponent.test.jsx` - Component tests
      * `SampleComponent.css` - Component-specific styles
* `packages/` - Location of local packages
  
  
Node server code:

* `server/`
  * `index.js` - Server entry point. Imports routes and dev middleware
  * `routes/` - Customize server routes (etc) here
  * `webpack-dev-middleware.js` - Dev middleware with Hot Module Reloading

Generated files:

* `dist/` - Client app assets are built here
* `.build/` - Generated/downloaded development files are put here
* `.build/test-results/` - junit-formatted test results are put here (used by Jenkins)
* `.build/coverage-results/` - cobertura-formatted code coverage results are put here (used by Jenkins)
* `node_modules/` - Project node module dependencies are put here
* `.env` - Environment vars for dev may be specified here in the format `VAR=value`

Other files:

* `scripts/` - Scripts needed for build / deployment
* `webpack/` - Webpack configuration
* `(root)` - Other configuration files

## Static Assets
### Images in JSX
> ❗️ Be careful when importing assets into jsx, this could cause the size of the bundle to explode!
```js
import Heart from './heart.png'

const App = () => (
  <div>
    <img src={Heart} />
  </div>
)
```

### Images in CSS
> Note: the leading `./` is mandatory.
```css
.heart {
  background: url('./heart.png');
}
```

### SVGs in JSX
```js
import Star from './star.svg'

const App = () => (
  <div>
    <Star />
  </div>
)
```

### SVGs in CSS
> Note: the leading `./` is mandatory.
```css
.star {
  background: url('./star.svg');
}
```

### Fonts in CSS
> Note: the leading `./` is mandatory.
```css
@font-face {
  font-family: 'myFont';
  src: url('./fonts/myFont.woff');
}
```

### Absolute URLS for CDN hosted files
```css
@font-face {
  font-family: 'myFont';
  src: url('https://cdn.toasttab.com/path/to/myFont.woff');
}
```

## Deployment

TBD
