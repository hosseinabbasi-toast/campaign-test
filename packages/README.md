# Package first development

When creating components we recommend creating each with the "yarn blueprints generate package/local" command, this will create a Buffet ready package in you ./packages folder.

- Each component you create becomes sharable with no additional effort on your side, you can keep it inside your SPA until you have a suitable time to move it out.
- It creates a catalog of components and patterns within your SPA.
- It encourages you to think about you application in a modular way.
- Your tests are scaffolded out with sensible default.
- You can choose From a set of multiple templates, each with a best practice in toast pattern.

To import into your client code or other local packages you can use package name:

```js
import { MyComponent } from '@local/my-package'
```

If you don't immediately have access to the package run:

`yarn lerna bootstrap`

You can explore your local components using storybook by running `yarn storybook`

## Mocking your API in Storybook

For restful APIs try `https://miragejs.com/tutorial/intro/`

For graphql APIs you can use `@toasttab/graphql-mocking`. Check the [buffet storybook](https://doc.toasttab.com/buffet-storybook/index.html?path=/story/abstract-tools-graphql-mocking-readme--page) for up to date docs. Some of the setup of a mock provider is done automatically for you when using the graphql-helpers blueprints in your SPA.
