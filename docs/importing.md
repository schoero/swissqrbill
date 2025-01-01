
# Importing the library

Depending how you intend to use the library, there are different ways to import it. While it is straight forward to import SwissQRBill, it may be a bit more complicated to import PDFKit, which is used to create the PDF itself.

Each example below is available as a StackBlitz project.

## Table of contents

### Node.js

- [Node.js: ES Module import](#nodejs-es-module-import)
- [Node.js: CommonJS import](#nodejs-commonjs-import)

### Browser

- [Browser: Bundling with webpack](#browser-bundling-with-webpack)
- [Browser: Pre-built bundle](#browser-pre-built-bundle)

### Node JS

#### Node.js: ES Module import

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][node-esm-javascript]

Importing the library in Node.js using ES modules is straight forward. You can use the following import statement:

```ts
// PDFKit
import PDFDocument from "pdfkit";
// PDF
import { SwissQRBill } from "swissqrbill/pdf";
// SVG
import { SwissQRBill } from "swissqrbill/svg";
```

#### Node.js: CommonJS import

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][node-cjs-javascript]

SwissQRBill provides a CommonJS module for legacy Node.js applications. You can require the library as follows:

```ts
// PDFKit
const PDFDocument = require("pdfkit");
// PDF
const { SwissQRBill } = require("swissqrbill/pdf");
// SVG
const { SwissQRBill } = require("swissqrbill/svg");
```

## Browser

### Browser: Bundling with webpack

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][browser-bundling-with-webpack]

> **Warning**
>
> This demo on StackBlitz does only work in Chrome. If you want to try it in another browser, you need to download the project and run it locally.

As PDFKit internally relies on several different built in modules of Node.js, it is not possible to use it directly in the browser. Instead, you need to bundle those node dependencies with a tool like webpack. More information can be found in the [PDFKit repository](https://github.com/foliojs/pdfkit/tree/master/examples/webpack)

### Browser: Pre-built bundle

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)][browser-pre-built-bundle]

> **Warning**
>
> This demo on StackBlitz does only work in Chrome. If you want to try it in another browser, you need to download the project and run it locally.

PDFKit provides a pre-built bundle that can be used directly in the browser. Similarly SwissQRBill also provides a pre-built bundle. It can be imported from the JSDelivr CDN as follows:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pdfkit@0/js/pdfkit.standalone.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/blob-stream@latest/+esm"></script>
```

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/swissqrbill@latest/lib/bundle/swissqrbill.js"></script>
```

The bundle exposes all exports in the global variable `SwissQRBill`.

```ts
const SwissQRBill = {
  errors,
  PDF,
  SVG,
  table,
  types,
  utils
};
```

[node-esm-javascript]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/main/examples/node-esm-javascript?file=src%2Fsvg.js,src%2Fpdf.js&title=SwissQRBill%20Node%20ESM%20JavaScript&startScript=generate
[node-cjs-javascript]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/main/examples/node-cjs-javascript?file=src%2Fsvg.js,src%2Fpdf.js&title=SwissQRBill%20Node%20CJS%20JavaScript&startScript=generate
[browser-bundling-with-webpack]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/main/examples/browser-bundling-with-webpack?file=src%2Fpdf.js&title=Browser%20bundling%20with%20webpack&startScript=start
[browser-pre-built-bundle]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/main/examples/browser-pre-built-bundle?file=src%2Fpdf.js&title=Browser%20pre-built%20bundle&startScript=start
