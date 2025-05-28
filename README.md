<div align="center">
  <img alt="SwissQRBill" src="https://raw.githubusercontent.com/schoero/swissqrbill/main/assets/swissqrbill-logo.svg">
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

With SwissQRBill you can easily generate the new QR Code payment slips as a PDF or SVG in Node.js and the browser. The new QR Code payment slips were introduced in Switzerland on June 30th, 2020 and replaces the old payment slips since October 1st, 2022. In addition to the payment section, you can [generate a complete invoice](#creating-a-complete-invoice) with [PDFKit][pdfkit-npm] by inserting your own content above the payment section.

<br/>
<br/>

![QR bill](assets/qr-bill.png)

<br/>
<br/>

<div align="center">

  <a href="https://github.com/sponsors/schoero">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/sponsor-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="./assets/sponsor-light.svg">
      <img alt="eslint-plugin-readable-tailwind logo" src="./assets/sponsor-dark.svg">
    </picture>
  </a>
  
  Invoices are a critical part of every business. Keeping this library up-to-date with the extensive specifications takes  time and effort.  
  If this library has been valuable to you, please consider becoming a sponsor, or make a one time donation to support its ongoing development.

</div>

<br/>
<br/>

## Links

* [Features](#features)
* [Installation](#installation)
* [Importing the library][importing-documentation]
* [Quick start](#quick-start)
* [API documentation](./docs)
* [PDFKit documentation][pdfkit-documentation]
* [Migration from v3 to v4](./docs/migration-v3-to-v4.md)
* [How to create a complete qr bill][how-to-create-a-complete-qr-bill]
* [QR bill validator](https://swiss-qr-invoice.org/validator/?lang=de)
* [QR bill specifications](https://www.six-group.com/dam/download/banking-services/standardization/qr-bill/ig-qr-bill-v2.3-en.pdf)
* [QR bill style guide](https://www.six-group.com/dam/download/banking-services/standardization/qr-bill/style-guide-qr-bill-en.pdf)

<br/>

## Features

* Generate complete invoices, or only the QR Bill, as a PDF file.
* Generate the QR Bill as a scalable vector graphic (SVG).
* Works in browsers and Node.js.
* Supports german, english, italian and french invoices.
* Allows you to add other content above the invoice using [PDFKit][pdfkit-github].
* Easy to use.
* Free and open source.

<br/>

## Installation

```sh
npm i swissqrbill
```

<br/>

## Importing the library

SwissQRBill is based around [PDFKit][pdfkit-npm]. Depending on the environment you are using, you may need to import the libraries differently. Please read the [importing documentation][importing-documentation] to find out the best way to import the libraries for your environment.

<br/>

## Quick start

Once you have imported SwissQRBill and PDFKit, it is quite easy to create a simple QR bill. All you have to do is to create a new [`SwissQRBill`][SwissQRBill] instance with your billing data object. You can then attach the QR bill to any PDFKit document.

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

qrBill.attachTo(pdf);
pdf.pipe(stream);
pdf.end();
```

This will create the PDF file above. You can pass an optional parameter containing options to the [`SwissQRBill constructor`][SwissQRBill-constructor].
A complete documentation for all methods and parameters can be found in the [docs/][repository-docs] directory of this repository.

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

## Creating a complete invoice

It is possible to create a complete invoice with SwissQRBill. This means that you can add your own content above the QR Bill.

SwissQRBill is based around [PDFKit][pdfkit-github] to generate the PDF files. You can use all the features of PDFKit to add your own content to the PDF file.

The documentation for PDFKit can be found on [pdfkit.org][pdfkit-documentation].

A simple guide how to generate a complete bill can be found in [docs/how-to-create-a-complete-qr-bill.md][how-to-create-a-complete-qr-bill]. You will learn how to create a PDF that looks like this:

<br/>

![Complete QR bill](assets/complete-qr-bill.png)

[SwissQRBill]: ./docs/pdf/index.md#class-swissqrbill
[SwissQRBill-constructor]: ./docs/pdf/index.md#constructor-new-swissqrbilldata-options
[importing-documentation]: ./docs/importing.md
[repository-docs]: ./docs/
[how-to-create-a-complete-qr-bill]: ./docs/how-to-create-a-complete-qr-bill.md
[pdfkit-documentation]: http://pdfkit.org
[pdfkit-github]: https://github.com/foliojs/pdfkit
[pdfkit-npm]: https://www.npmjs.com/package/pdfkit
