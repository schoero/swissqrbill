# SwissQRBill
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
  <img alt="Dependencies" src="https://img.shields.io/david/schoero/swissqrbill?style=flat-square">
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

<br/>
<br/>

With SwissQRBill you can easily generate the new QR Code payment slips in Node.js and the browser. The new QR Code payment slips were introduced in Switzerland on June 30th, 2020 and should gradually replace the current payment slips. In addition to the payment section, you can generate a complete invoice with SwissQRBill by inserting your own content above the payment section.

<br/>
<br/>

[<img src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/qrbill.png">](https://github.com/schoero/SwissQRBill/blob/master/assets/qrbill.pdf)


## Links

 * [Features](#features)
 * [Installation](#installation)
 * [Quick start](#quick-start)
 * [Browser usage](#browser-usage)
 * [API documentation](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md)
 * [PDFKit documentation](http://pdfkit.org/docs/getting_started.html)
 * [How to create a complete bill](https://github.com/schoero/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md)
 * [QR bill validator](https://swiss-qr-invoice.org/validator/?lang=de)


## Features
 - Generates PDF with scalable vector graphics
 - Works in browser and node
 - Supports german, english, italian and french invoices
 - Supports A4 invoices as well as A6/5 (QR bill only)
 - Allows you to add other content above the invoice using [PDFKit](https://github.com/foliojs/pdfkit)
 - Easy to use
 - Free and open source


## Installation

```
npm i swissqrbill --save
```

## Quick start

It's quite easy to create a simple QR bill. All you have to do is create a new `SwissQRBill.PDF` instance and pass your billing data object as the first parameter and your output path as the second parameter.

```js
const SwissQRBill = require("swissqrbill");

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

const pdf = new SwissQRBill.PDF(data, "qrbill.pdf", () => {
  console.log("PDF has been successfully created.");
});
```

This will create the above PDF file. You can pass an optional third parameter containing options such as language or size etc. as well as a callback function that gets called right after the file has finished writing.
A complete documentation for all methods and parameters can be found in [doc/api.md](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md).

<br/>

## Browser usage

To use SwissQRBill inside browsers, you have to pass a writeableStream in the second parameter, instead of the output path. To create a writeableStream in the browser you can use the built in `SwissQRBill.blobStream()` method.

```js
const stream = SwissQRBill.blobStream();

const pdf = new SwissQRBill.PDF(data, stream);

pdf.on("finish", () => {
  const iframe = document.getElementById("iframe") as HTMLIFrameElement;
  if(iframe){
    iframe.src = stream.toBlobURL("application/pdf");
  }
  console.log("PDF has been successfully created.");
});
```

You can see a fully working example at https://github.com/schoero/SwissQRBill-browser-example.

<br/>

## Further informations

SwissQRBill extends [PDFKit](https://github.com/foliojs/pdfkit) to generate PDF files and adds a few extra methods. You can generate a complete PDF bill using the original PDFKit methods and the additional methods documented in [doc/api.md](https://github.com/schoero/SwissQRBill/tree/master/doc/api.md#methods).
The documentation for PDFKit can be found [here](http://pdfkit.org/docs/getting_started.html).

A simple guide how to generate a complete bill can be found in [doc/how-to-create-a-complete-bill.md](https://github.com/schoero/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md). You will learn how to create a PDF that looks like this:

[<img src="https://raw.githubusercontent.com/schoero/SwissQRBill/master/assets/complete-qr-bill.png">](https://github.com/schoero/SwissQRBill/tree/master/doc/how-to-create-a-complete-bill.md)