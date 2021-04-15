# banquet-child-spa

A banquet-child-spa is designed to be loaded by either the banquet-root-config or a banquet-layout spa.
Ideally it should not have child SPAs of it own, but this is a convention rather than a technical limitation.

## Best practices

- Avoid adding routers to child SPA where possible. Ideally they represent an single screen.
- Load child SPAs into layout-spas using the BanquetLoader package.
- If you need to load your SPA as into legacy pages consider using the Widget SPA template.

## Adding a child spa to a banquet-layout

Child SPAs are designed to be loaded via the BanquetLoader component. <https://github.com/toasttab/banquet-tools/blob/develop/packages/banquet-loader/BanquetLoader/README.story.mdx>
It is a thin wrapper around the <https://single-spa.js.org/docs/ecosystem-react#parcels>, It uses the `name` prop to resolve the correct bundle in the `import-map` and loads it. 

```jsx
// Basic usage
<BanquetLoader name={name} />
```

Any properties passed to BanquetLoader are available in the `App.jsx` of the loaded SPA

## Registering a child SPA  

