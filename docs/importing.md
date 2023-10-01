
# Importing the library

Depending how you intend to use the library, there are different ways to import it. While it is straight forward to import SwissQRBill, it may be a bit more complicated to import PDFKit, which is used to create the PDF itself.

Each example below is available as a StackBlitz project. Please note that they only work in Chrome.

## Table of contents

### Node.js

- [Node ESM import](node-esm-import)
- [Node CJS import](node-cjs-import)

### Browser

- [Browser bundling with webpack](browser-bundling-with-webpack)
- [Browser pre-built bundle](browser-prebuilt-bundle)

### Node JS

#### Node ESM import

[![Open in StackBlitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8E_Open_in_StackBlitz-1374ef?style=flat-square)
][node esm javascript]

Importing the library in Node.js using ES modules is straight forward. You can use the following import statement:

```ts
// PDFKit
import PDFDocument from "pdfkit";
// PDF
import { SwissQRBill } from "swissqrbill/pdf";
// SVG
import { SwissQRBill } from "swissqrbill/svg";
```

#### Node CJS import

[![Open in StackBlitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8E_Open_in_StackBlitz-1374ef?style=flat-square)
][node cjs javascript]

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

### Browser bundling with webpack

[![Open in StackBlitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8E_Open_in_StackBlitz-1374ef?style=flat-square)
][browser bundling with webpack]

> **Warning**
>
> This demo on StackBlitz does only work in Chrome. If you want to try it in another browser, you need to download the project and run it locally.

As PDFKit internally relies on several different built in modules of Node.js, it is not possible to use it directly in the browser. Instead, you need to bundle it with a tool like webpack. More information can be found in the [PDFKit repository](https://github.com/foliojs/pdfkit/tree/master/examples/webpack)

### Browser pre-built bundle

[![Open in StackBlitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8E_Open_in_StackBlitz-1374ef?style=flat-square)
][browser pre-built bundle]

PDFKit also provides a pre-built bundle that can be used directly in the browser.

[node esm javascript]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/v4/examples/node-esm-javascript
[node cjs javascript]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/v4/examples/node-cjs-javascript
[browser bundling with webpack]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/v4/examples/browser-bundling-with-webpack
[browser pre-built bundle]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/v4/examples/browser-pre-built-bundle
