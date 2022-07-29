# T2 CLI Documentation Examples

This document explains how the files in this directory are used, and how to add new documentation examples.

## How does it work?
The AG Grid examples loosely follow this format:

`https://www.ag-grid.com/examples/<page>/<example>/<ag-grid-installation-method>/<framework>/<file>`.

For example, to add the [Range Selection](https://www.ag-grid.com/react-data-grid/range-selection/#example-range-selection) example, the URL is:

`https://www.ag-grid.com/examples/range-selection/range-selection/packages/react/index.html`

The above link tells us that the URL is pointing to the `index.html` file for React using AG Grid Packages.

If we wanted to get the `index.jsx` using AG Grid Modules, we can change the link to the following:

`https://www.ag-grid.com/examples/range-selection/range-selection/modules/react/index.jsx`

In short, this means that as long as we have a partial URL link to the example (`https://www.ag-grid.com/examples/range-selection/range-selection`), we can dynamically get a file (`index.js`, `styles.css`, `app.component.ts`) for any framework (`vanilla`/`vue`/`angular`/`react`), built in Packages or Modules (`packages`/`modules`), simply by changing these values.

## Adding Documentation Examples to the CLI
To add a new example to the CLI, open `docs-core.json` and add the partial URL (strip away the framework and the file extension) for the example to the `baseURL` property.

For example, for Range Selection, the partial URL is:

`https://www.ag-grid.com/examples/range-selection/range-selection/packages`.

So we add the example like this:
```json
{
    "baseURL": {
        "range-selection": "https://www.ag-grid.com/examples/range-selection/range-selection/packages",
    }
}
```

By default, the CLI knows to get a list of default files for every framework because every example in the documentation has them, you can view these inside `docs-core.json` under the `filesToFetch` for a given framework.

When there are extra files for the CLI to import that aren't listed inside `docs-core.json`, you have to define it in the json file for that example.

For example, Range Selection has a file `range-selection.json` which contains a list of extra files to import:

```json
{
    "react": {
        "filesToFetch": []
    },
    "angular": {
        "filesToFetch": [
            {
                "url": "app/interfaces.ts",
                "destination": "src/app/interfaces.ts"
            }
        ]
    },
    "vue": {
        "filesToFetch": []
    },
    "vanilla": {
        "filesToFetch": []
    }
}
```