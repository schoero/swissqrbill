<div align="center">
  <img alt="SwissQRBill" src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/swissqrbill-logo.svg">
</div>

---
<div align="center">
  <a href="https://github.com/schoero/SwissQRBill/blob/master/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/npm/l/swissqrbill?color=brightgreen&style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/swissqrbill">
    <img alt="Version" src="https://img.shields.io/npm/v/swissqrbill?color=brightgreen&style=flat-square">
  </a>
  <a href="https://github.com/schoero/SwissQRBill/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues-raw/schoero/swissqrbill?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/swissqrbill">
    <img alt="Downloads" src="https://img.shields.io/npm/dw/swissqrbill?style=flat-square">
  </a>
  <a href="https://github.com/schoero/SwissQRBill/stargazers">
    <img alt="Downloads" src="https://img.shields.io/github/stars/schoero/SwissQRBill?color=brightgreen&style=flat-square">
  </a>
  <a href="https://github.com/schoero/SwissQRBill/actions?query=workflow%3ACI">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/schoero/SwissQRBill/CI?style=flat-square">
  </a>
</div>

---

<br/>
<br/>

With SwissQRBill you can easily generate the new QR Code payment slips in Node.js and the browser. The new QR Code payment slips were introduced in Switzerland on June 30th, 2020 and should gradually replace the current payment slips. In addition to the payment section, you can generate a complete invoice with SwissQRBill by inserting your own content above the payment section.

<br/>
<br/>

[<img src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/qrbill.png">](https://github.com/schoero/SwissQRBill/blob/master/assets/qrbill.pdf)


<br/>
<br/>

## Links

 * [Features](#features)
 * [Installation](#installation)
 * [Importing the library](#importing-the-library)
 * [Quick start](#quick-start)
 * [Browser usage](#browser-usage)
 * [API documentation](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md)
 * [PDFKit documentation](http://pdfkit.org/docs/getting_started.html)
 * [How to create a complete bill](https://github.com/schoero/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md)
 * [QR bill validator](https://swiss-qr-invoice.org/validator/?lang=de)
 * [QR bill specifications](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)


<br/>

## Features
 - Generate complete invoices, or only the QR Bill, as a PDF file.
 - Generate the QR Bill as a scalable vector graphic (SVG).
 - Works in browsers and Node.js.
 - Supports german, english, italian and french invoices.
 - Allows you to add other content above the invoice using [PDFKit](https://github.com/foliojs/pdfkit).
 - Easy to use.
 - Free and open source.

<br/>

## Installation

```
npm i swissqrbill --save
```

<br/>

## Importing the library

### Node.js

In versions prior to v3.0.0, you could simply include SwissQRBill like this:

```js
const SwissQRBill = require("swissqrbill"); // CommonJS. Not tree-shakeable.
```

<br/>

While you can still do this, it is recommended to switch to the new ES module imports to be able to take advantage of tree-shaking. SwissQRBill uses the new [conditional exports feature](https://nodejs.org/api/packages.html#packages_exports_sugar) that was added in node v12.16.0 or v13.6.0.

This allows you to import only the parts of SwissQRBill that you actually need.

```js
import { PDF } from "swissqrbill/pdf"; // ESM. Tree-shakeable
import { SVG } from "swissqrbill/svg"; // ESM. Tree-shakeable
import { mm2pt } from "swissqrbill/utils"; // ESM. Tree-shakeable
```

<br/>

Unfortunately, TypeScript with a version prior to the upcoming [version 4.5](https://github.com/microsoft/TypeScript/issues/45418), and Node.js prior to v12.16.0 or v13.6.0, do not support this feature.
If you are using a TypeScript or Node.js version, that doesn't support the new export feature, you can still take advantage of tree-shaking, by importing the files directly by their path.

```js
import { PDF } from "swissqrbill/lib/node/esm/node/pdf.js"; // ESM. Tree-shakeable
import { SVG } from "swissqrbill/lib/node/esm/node/svg.js"; // ESM. Tree-shakeable
import { mm2pt } from "swissqrbill/lib/node/esm/shared/utils.js"; // ESM. Tree-shakeable
```

<br/>

### Browser

For the browser it is a bit more complicated. The easiest way would be to include the pre-bundled version.

```html
<script type="text/javascript" src="https://unpkg.com/swissqrbill/lib/browser/bundle/index.js" />
```

You can also import the bundle directly, if you are using a bundler like webpack.

```js
import SwissQRBill from "swissqrbill/lib/browser/bundle";
```

However, if you want to take advantage of tree-shaking in the browser, you have to bundle the library by yourself.
You can find an example, how this could be done using webpack, at https://github.com/schoero/SwissQRBill-browser-example.


<br/>
<br/>

## Quick start

Once you have imported SwissQRBill, it is quite easy to create a simple QR bill. All you have to do is to create a new `SwissQRBill.PDF` instance and pass your billing data object as the first parameter and your output path as the second parameter.

```js
import { PDF } from "swissqrbill/pdf";

const data = {
  currency: "CHF",
  amount: 1199.95,
  reference: "210000000003139471430009017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debtor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse 28",
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};

const pdf = new PDF(data, "qrbill.pdf", () => {
  console.log("PDF has been successfully created.");
});
```

This will create the PDF file above. You can pass an optional third parameter containing options such as language or size etc. as well as a callback function that gets called right after the file has finished writing.
A complete documentation for all methods and parameters can be found in [doc/api.md](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md).

<br/>
<br/>

## Browser usage

> **Note:** Please read the [importing the library](#importing-the-library) section above, how you should import the library for browser usage.

To use SwissQRBill inside browsers, you have to pass a writableStream in the second parameter, instead of the output path. To create a writableStream in the browser you can use the built in `SwissQRBill.BlobStream()` function.

```js
import { PDF, BlobStream } from "swissqrbill/pdf";

const stream = new BlobStream();
const pdf = new PDF(data, stream);

pdf.on("finish", () => {
  const iframe = document.getElementById("iframe");
  if(iframe){
    iframe.src = stream.toBlobURL("application/pdf");
  }
  console.log("PDF has been successfully created.");
});
```

<br/>
<br/>

## Further informations

SwissQRBill.PDF extends [PDFKit](https://github.com/foliojs/pdfkit) to generate PDF files and adds a few extra methods. You can generate a complete PDF bill using the original PDFKit methods and the additional methods documented in [doc/api.md](https://github.com/schoero/SwissQRBill/tree/master/doc/api.md#methods).
The documentation for PDFKit can be found [here](http://pdfkit.org/docs/getting_started.html).

A simple guide how to generate a complete bill can be found in [doc/how-to-create-a-complete-bill.md](https://github.com/schoero/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md). You will learn how to create a PDF that looks like this:

[<img src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/complete-qr-bill.png">](https://github.com/schoero/SwissQRBill/tree/master/doc/how-to-create-a-complete-bill.md)