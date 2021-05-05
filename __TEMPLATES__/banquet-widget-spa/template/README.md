# banquet-widget-spa

A `banquet-widget-spa` is a SPA that can be mounted on any page across Toastweb, it is primarily used for elements that exist outside of page-specific layouts

Current examples include:

- <https://github.com/toasttab/wex-left-rail-spa>
- <https://github.com/toasttab/toast-onboarding-checklist-spa>
- <https://github.com/toasttab/spa-customer-sessions>

In general Widgets are mounted at the root level in `wex-banquet-root` rather than inside of a BanquetLoader. It is possible to do so, an example being `wex-left-rail-spa` which uses a "modes" pattern, to render a version of `wex-left-rail-spa` which contains the search bar onto the home page.

When defining the paths for a widget spa, you may choose to list the paths it does not exist upon. It is also common to use the domElementGetter function
to control the mount position of the widget SPA. This only effects SPAs mounted via the RegisterApplication function and not BanquetLoader mounted SPAs.

```js
const lifecycles = banquetSingleSpaReact({
  React,
  ReactDOM,
  rootComponent: AppSetup,
  errorBoundary: sentryErrorBoundary('data-cs'),
  domElementGetter: (customProps) =>
    // You have access to the customProps passed down from the RegisterApp function here
    // you may use them to control the mount point on a per route basis
    document.getElementById('single-spa-application:customer-sessions')
})
```

## How to register a SPA

Once you've created you SPA via the `banquet-frontend-spa-template` you need to register it with Banquet.

1. Clone the <https://github.com/toasttab/wex-banquet-root>
2. If you have not registered you spa in the `manifest.json`, please do now. In the `src/static/manifest.json` file register your new SPA.

```js
  {
    "name": "your-spa-name", // Must match this repos package.json
    "src": "app.banquet.js",
    "cssPath": "main.css",
    "prodReady": false // Set to true when you want to release your SPA to production.
  }
```

3. Register your widget SPA, the setup below will render the widget SPA in every page, except the home page, when the feature flag 'your-teams-feature-flag' is set to true.

```js
  flagMatch(['your-teams-feature-flag']) &&
    registerApplication({
      name: 'your-teams-widget-spa',
      activeWhen: [!/restautant\/admin\/home/.test(pathname)], 
      customProps: globalCustomProps,
      app: () => global.System.import('toast-onboarding-checklist-spa')
    })
```

## Developing a Widget SPA

Banquet V2 offers an excellent set of tools for SPA development, these tools allow for the development of SPA within dev, or directly within pre-production.

### How to develop in your local dev environment

If you haven't merged your `wex-banquet-root` changes, you will need to run it and your widget SPA locally. When you start each of these SPA, they will create a import-map-override file inside of the toastweb public folder. When you start toastweb locally these files are read by banquet and override the CDN versions of these files. You should now be able to make changes to any of these files and see the changes update automatically in your browser.

You may need to delete this file if you no long require it to be overridden.
`toastweb/public/temp-import-map-overrides/wex-banquet-root-import-map.json`

In `dev` and `preprod` you can run `importMapOverrides.enableUI()` this will enable a tool that gives you visibility of the SPAs currently being overridden, along with a bunch of other great features.

### How to develop in live in preprod environment

This is a great option if your making purely frontend changes.

   1. Start the tooling by running the following command in your browser's devtools console `importMapOverrides.enableUI()`
   2. Override any SPAs that are not currently released to preprod, in this case, override `wex-banquet-root` with your locally running version running at `https://dev.eng.toastteam.com:9990/bundle.js` ( port may differ ) and your new SPA `https://dev.eng.toastteam.com:9991/bundle.js`. Its probably worth getting `wex-banquet-root` merged and released adhoc on preprod as soon as possible, but the above approach will allow you to develop in preprod immediately.

## Best practices

- Never add routers to widget SPA. Ideally they represent a single screen.
- Mount widget SPAs via RegisterApplication in wex-banquet-root.
- If using with layout, follow the "modes" pattern. <https://github.com/toasttab/wex-left-rail-spa/blob/a6de891c2ff5cdf6a44d35266872a5273d3e16d3/src/components/App/App.jsx#L45>
