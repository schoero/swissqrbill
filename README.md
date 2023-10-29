<div align="center">
  <img alt="SwissQRBill" src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/swissqrbill-logo.svg">
</div>

---
<div align="center">

  [![GitHub license](https://img.shields.io/github/license/schoero/swissqrbill?style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/swissqrbill/blob/main/LICENSE)
  [![npm version](https://img.shields.io/npm/v/swissqrbill?style=flat-square&labelColor=454c5c&color=00AD51)](https://www.npmjs.com/package/swissqrbill?activeTab=versions)
  [![GitHub issues](https://img.shields.io/github/issues/schoero/swissqrbill?style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/swissqrbill/issues)
  [![npm weekly downloads](https://img.shields.io/npm/dw/swissqrbill?style=flat-square&labelColor=454c5c&color=00AD51)](https://www.npmjs.com/package/swissqrbill?activeTab=readme)
  [![GitHub repo stars](https://img.shields.io/github/stars/schoero/swissqrbill?style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/swissqrbill/stargazers)
  [![GitHub workflow status](https://img.shields.io/github/actions/workflow/status/schoero/swissqrbill/ci.yml?event=push&style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/swissqrbill/actions?query=workflow%3ACI)

</div>

---

<br/>
<br/>

With SwissQRBill you can easily generate the new QR Code payment slips in Node.js and the browser. The new QR Code payment slips were introduced in Switzerland on June 30th, 2020 and replaces the old payment slips since October 1st, 2022. In addition to the payment section, you can [generate a complete invoice](#further-information) with SwissQRBill by inserting your own content above the payment section.

<br/>
<br/>

[<img src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/qrbill.svg">](https://github.com/schoero/SwissQRBill/blob/master/assets/qrbill.pdf)

<br/>
<br/>

## Links

* [Migration from v3 to v4](#migration-from-v3-to-v4)
* [Features](#features)
* [Installation](#installation)
* [Importing the library](#importing-the-library)
* [Quick start](#quick-start)
* [API documentation](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md)
* [PDFKit documentation](http://pdfkit.org/docs/getting_started.html)
* [How to create a complete bill](https://github.com/schoero/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md)
* [QR bill validator](https://swiss-qr-invoice.org/validator/?lang=de)
* [QR bill specifications](https://www.six-group.com/dam/download/banking-services/standardization/qr-bill/ig-qr-bill-v2.2-en.pdf)

<br/>

## Migration from v3 to v4

In SwissQRBill v4, large parts of the application have been rewritten to make the API more flexible. This means that you have to make some changes to your code when upgrading from v3 to v4.

Please read the [migration guide](./docs/migration-v3-to-v4.md) to learn more about the changes and how to migrate your code.

## Features

* Generate complete invoices, or only the QR Bill, as a PDF file.
* Generate the QR Bill as a scalable vector graphic (SVG).
* Works in browsers and Node.js.
* Supports german, english, italian and french invoices.
* Allows you to add other content above the invoice using [PDFKit](https://github.com/foliojs/pdfkit).
* Easy to use.
* Free and open source.

<br/>

## Installation

```sh
npm i swissqrbill
```

<br/>

## Importing the library

Depending on the environment you are using, you may need to import the library differently. Please read the [importing documentation][importing documentation] to find out the best way to import the library for your environment.

<br/>

## Quick start

Once you have imported SwissQRBill, it is quite easy to create a simple QR bill. All you have to do is to create a new `SwissQRBill` instance and pass your billing data object as the first parameter and your output path as the second parameter.

```js
import { createWriteStream } from "node:fs";

import PDFDocument from "pdfkit";
import { SwissQRBill } from "swissqrbill/pdf";

const data = {
  amount: 1994.75,
  creditor: {
    account: "CH44 3199 9123 0008 8901 2",
    address: "Musterstrasse",
    buildingNumber: 7,
    city: "Musterstadt",
    country: "CH",
    name: "SwissQRBill",
    zip: 1234
  },
  currency: "CHF",
  debtor: {
    address: "Musterstrasse",
    buildingNumber: 1,
    city: "Musterstadt",
    country: "CH",
    name: "Peter Muster",
    zip: 1234
  },
  reference: "21 00000 00003 13947 14300 09017"
};

const pdf = new PDFDocument({ size: "A4" });
const qrBill = new SwissQRBill(data);
const stream = createWriteStream("qr-bill.pdf");
pdf.pipe(stream);
qrBill.attachTo(pdf);
pdf.end();
```

This will create the PDF file above. You can pass an optional parameter containing options to the `SwissQRBill` constructor.
A complete documentation for all methods and parameters can be found in the [docs/][repository docs] directory of this repository.

<br/>
<br/>

Alternatively, you could render the QR Bill as a scalable vector graphic (SVG). But keep in mind, using SVG you can only render the QR Bill part and not an entire invoice.

```js
import { SwissQRBill } from "swissqrbill/svg";

const svg = new SwissQRBill(data);
document.body.appendChild(svg.element);
```

<br/>
<br/>

## Further information

SwissQRBill uses [PDFKit](https://github.com/foliojs/pdfkit) to generate the PDF files.
The documentation for PDFKit can be found [here](http://pdfkit.org/docs/getting_started.html).

A simple guide how to generate a complete bill can be found in [docs/how-to-create-a-complete-bill.md][how to create a complete bill]. You will learn how to create a PDF that looks like this:

[<img src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/complete-qr-bill.png">](https://github.com/schoero/SwissQRBill/tree/master/doc/how-to-create-a-complete-bill.md)

[importing documentation]: ./docs/importing.md
[repository docs]: ./docs/
[how to create a complete bill]: ./docs/how-to-create-a-complete-bill.md
