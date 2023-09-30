
# Importing the library

Depending how you intend to use the library, there are different ways to import it. While it is straight forward to import SwissQRBill, it may be a bit more complicated to import PDFKit, which is used to create the PDF itself.

Each example below is available as a StackBlitz project. Please note that they only work in Chrome.

## Table of contents

### Node.js

- [Node ESM import](node-esm-import) - [StackBlitz][node esm javascript]
- [Node CJS import](node-cjs-import) - [StackBlitz][node cjs javascript]

### Browser

- [Node CJS import](node-cjs-import) - [bundling with webpack][bundling with webpack]

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

[node esm javascript]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/feat/stackblitz-examples/examples/node-esm-javascript
[node cjs javascript]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/feat/stackblitz-examples/examples/node-cjs-javascript
[bundling with webpack]: https://stackblitz.com/fork/github/schoero/swissqrbill/tree/feat/stackblitz-examples/examples/browser-bundling-with-webpack
