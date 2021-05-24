# banquet-layout-spa

A layout SPA is registered in wex-banquet-root, it should for full and multiple page SPAs. It has a react-router and can each route can use the BanquetLoader to mount child spas. A layout can mount multiple child SPAs on a single page.

## How to register a SPA

Once you've created you SPA via the `banquet-frontend-spa-template` you need to register it with Banquet.

1. Pull the latest <https://github.com/toasttab/wex-banquet-root>
2. If you have not registered your spa in the `manifest.json`, please do so now. In the `src/static/manifest.json` file register your new SPA.

```js
  {
    "name": "your-spa-name", // Must match this repos package.json
    "src": "app.banquet.js",
    "cssPath": "main.css",
    "prodReady": false // Set to true only when you want to release your SPA to production.
  }
```
 3. Feature flags need to be added to the `__TOAST_BANQUET_INITIAL_DATA__` in the `app/controllers/Banquet.java`. 
 4. If you are creating a layout spa you should create a new registration function in `wex-banquet-root/src/registration/`, the general structure of this registration function is as follows:

```js

  export const productArea = ({ auth, restaurantInfo }) => {

    // Create globals values 
    const globalCustomProps = {
      // Copy over from other registration fuctions and extend as needed. 
      // Avoid api requests here as it will slow registration.
    }

    // Define the matcher functions for feature flags and routes
    const flagMatch = featureFlagsMatch(globalData?.featureFlags)
    const toastAdminMatch = routeMatcher(['product/area', 'product/area/*'])

    // Register your layout SPA 
    flagMatch(['team-feature-flag'],false) &&
      registerApplication({
        name: 'team-layout-name',
        activeWhen: ({ pathname }) => Boolean(toastAdminMatch(pathname)),
        customProps: globalCustomProps,
        // @ts-ignore
        app: () => global.System.import('team-layout-name')
      })

  }

```

Then call the new registration function in `wex-banquet-root/src/index.ts`

## Developing a Widget SPA

Banquet V2 offers an excellent set of tools for SPA development, these tools allow for the development of SPA within dev, or directly within pre-production.

### How to develop in your local dev environment

If you haven't merged your `wex-banquet-root` changes, you will need to run it and your widget SPA locally. When you start each of these SPA, they will create a import-map-override file inside of the toastweb public folder. When you start toastweb locally these files are read by banquet and override the CDN versions of these files. You should now be able to make changes to any of these files and see the changes update automatically in your browser.

You may need to delete this file if you no long require it to be overridden.
`toastweb/public/temp-import-map-overrides/wex-banquet-root-import-map.json`

In `dev` and `preprod` you can run `importMapOverrides.enableUI()` this will enable a tool that gives you visibility of the SPAs currently being overridden, along with a bunch of other great features.

### How to develop in live in preprod environment

This is a great option if you're making purely frontend changes.

   1. Start the tooling by running the following command in your browser's devtools console `importMapOverrides.enableUI()`
   2. Override any SPAs that are not currently released to preprod, in this case, override `wex-banquet-root` with your locally running version running at `https://dev.eng.toastteam.com:9990/bundle.js` ( port may differ ) and your new SPA `https://dev.eng.toastteam.com:9991/bundle.js`. Its probably worth getting `wex-banquet-root` merged and released adhoc on preprod as soon as possible, but the above approach will allow you to develop in preprod immediately.

## Best practices

- Avoid making layout SPAs to large, treat them like dashboards, a good example of a layout SPA is the home page.
- Consider adding new features via child spas, there are some additional setup costs but in the long run you will end up with smaller, easier to manage SPAs.
- If in doubt, reach out to the WEX team.
