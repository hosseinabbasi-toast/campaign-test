# Package first development

When creating components we recommend creating each with the "yarn cater create" command, this will create a Buffet ready package in you ./packages folder.

- Each component you create becomes sharable with no additional effort on your side, you can keep it inside your SPA until you have a suitable time to move it out.
- It creates a catalog of components and patterns within your SPA.
- It encourages you to think about you application in a modular way.
- Your tests are scaffolded out with sensible default.
- You can choose From a set of multiple templates, each with a best practice in toast pattern.

To import into you client code you can use package name:

```js
import { ToastLogo } from '@toasttab/buffet-pui-toast-logo'
```

If you don't immediately have access to the package run:

`yarn lerna bootstrap`

Starting storybook.

`yarn storybook`

## Mocking your API in Storybook

For restful APIs try `https://miragejs.com/tutorial/intro/`
For BFF you can use `@toasttab/graphql-mocking`
