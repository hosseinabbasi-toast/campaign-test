# banquet-child-spa

A banquet-child-spa is designed to be loaded by a banquet-layout eg <https://github.com/toasttab/restaurant-admin-layout>
Ideally it should not have child SPAs of it own, but this is a convention rather than a technical limitation.

## How to register a SPA

Once you've created you SPA via the `banquet-frontend-spa-template` you need to register it with Banquet.

1. Pull the latest <https://github.com/toasttab/wex-banquet-root>
2. If you have not registered you spa in the `manifest.json`, please do now. In the `src/static/manifest.json` file register your new SPA.

```js
  {
    "name": "your-spa-name", // Must match this repos package.json
    "src": "app.banquet.js",
    "cssPath": "main.css",
    "prodReady": false // Set to true only when you want to release your SPA to production.
  }
```

3. Assuming your SPA is a child with a base path of `/restaurants/admin/`, you will need to add your SPA to `src/registration/restaurant-admin.ts` the restaurantAdminMatch array. This array is passed into the `restaurant-admin-layout` SPA registration function. This tells the layout to mount at this route, later, we will add a `BanquetLoader` to mount your SPA at the same route.

```js
  const restaurantAdminMatch = routeMatcher([
    '/restaurants/admin/<your_path_here>',
    '/restaurants/admin/home',
    '/restaurants/admin/:id/homepage',
    ...
  ])
```

4. Pull the latest <https://github.com/toasttab/restaurant-admin-layout>. This is a Banquet layout SPA, it is a react application, within its App.js you will find a react-router setup. This is where you tell your SPA to mount via a `BanquetLoader`.

```jsx
      <Route path='/<your_path_here>'> 
        <SpaContainer name='<your-spa-name>' /> 
      </Route>
```

Note: `<SpaContainer>` wraps a `BanquetLoader`, this will change in upcoming release, yes, its confusing :)

5. At this point you should have the following: a new spa that you can run locally, an open PR against `wex-banquet-root` where you have added a path to the layout engine you wish to use and a PR against the layout SPA you wish to load your SPA into.

## Developing a child SPA inside of a banquet layout SPA

Banquet V2 offers an excellent set of tools for SPA development, these tools allow for the running/development of SPAs within dev, or directly within pre-production.

### How to develop in your local dev environment

If you haven't merged your `wex-banquet-root` changes, you will need to run it, `restaurant-admin-layout` and your SPA locally. When you start each of these SPAs, they will create an import-map-override file inside of the toastweb public folder. When you start toastweb locally these files are read by banquet and override the CDN versions of these files. You should now be able to make changes to any of these SPAs and see the changes update automatically in your browser.

You may need to delete this file if you no long require it to be overridden.
`toastweb/public/temp-import-map-overrides/wex-banquet-root-import-map.json`

In `dev` and `preprod` you can run `importMapOverrides.enableUI()` in your browser devtools' console. This will enable a tool that gives you visibility of the SPAs currently being overridden, along with a bunch of other great features.

![image](https://user-images.githubusercontent.com/40170037/117135513-ef876d00-ad9e-11eb-8111-4d81d51dd834.png)

### How to develop live in preprod environment

This is a great option if you're making purely frontend changes.

   1. Start the tooling by running the following command in your browser's devtools console `importMapOverrides.enableUI()`
   2. Override any SPAs that are not currently released to preprod, in this case, override `wex-banquet-root` with your locally running version running at `https://dev.eng.toastteam.com:9990/bundle.js` ( port may differ ) `restaurant-admin-layout` `https://dev.eng.toastteam.com:9991/bundle.js` and your new SPA `https://dev.eng.toastteam.com:9992/bundle.js`. Its probably worth getting `wex-banquet-root` and `restaurant-admin-layout` merged and released adhoc on preprod as soon as possible, but the above approach will allow you to develop in preprod immediately.


## Best practices
    
- Avoid adding routers to child SPA where possible. Ideally they represent an single screen.
- Load child SPAs into layout-spas using the BanquetLoader package.
- If you need to load your SPA into legacy pages consider using the Widget SPA template.
