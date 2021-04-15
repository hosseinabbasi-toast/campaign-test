# How to create a new Template

The goal of these templates is to provides a fully bootstrapped Banquet SPA project.

## Roadmap

**base-template**

A base template provides a foundation for all the other templates providing a set of default setup files, this template is not used directly. Files within the base template can be overridden by the selectable templates.

**Current templates**

- banquet-child-spa
- banquet-layout-spa
- banquet-widget-spa
- banquet-root-config

**Future templates**

- banquet-dynamic-ui-spa

A spa designed used in a user controlled layout.

## Setup

Step 1: Copy one of the existing folders, child-spa for example.
Step 2: Inside the new template folder edit the config.json

```json
{
  "name": "<NAME>",
  "version": "1", // Manually updated version
  "hint": "<HINT>", // This text describes the templates to the developer
  "props": [
    {"name": "name", "message": "SPA name", "hint" : "describes the properties usage" },
    {"name": "cssScope", "message": "CSS scope", "hint" : "describes the properties usage" },
    {"name": "channel", "message": "Slack channel", "hint" : "describes the properties usage" }
  ]
}
```

The props names become mustache variables, when in the init command is run the user will fill this values out in the CLI. In the /template folder inside you newly duplicated template folder you can apply these in any file by using the Mustache templating format `{{mustache}}`

```js
  cssScope: '{{cssScope}}',
  rootComponent: App
```

When the developer runs the init command, these variables will be replaced.
