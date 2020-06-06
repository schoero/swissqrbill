# SwissQRBill

<a href="https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/LICENSE">
  <img alt="MIT License" src="https://img.shields.io/npm/l/swissqrbill?color=brightgreen">
</a>
<a href="https://www.npmjs.com/package/swissqrbill">
  <img alt="Version" src="https://img.shields.io/npm/v/swissqrbill?color=brightgreen">
</a>
<a href="https://github.com/Rogerrrrrrrs/SwissQRBill/issues">
  <img alt="Issues" src="https://img.shields.io/github/issues-raw/rogerrrrrrrs/swissqrbill">
</a>
<a href="https://www.npmjs.com/package/swissqrbill">
  <img alt="Dependencies" src="https://img.shields.io/david/rogerrrrrrrs/swissqrbill">
</a>
<a href="https://www.npmjs.com/package/swissqrbill">
  <img alt="Downloads" src="https://img.shields.io/npm/dw/swissqrbill">
</a>
<a href="https://github.com/Rogerrrrrrrs/SwissQRBill/actions?query=workflow%3ACI">
  <img alt="CI" src="https://github.com/Rogerrrrrrrs/SwissQRBill/workflows/CI/badge.svg?branch=development">
</a>

With SwissQRBill you can easily generate the new QR Code payment slips that will be introduced in Switzerland on June 30, 2020.

[<img src="https://raw.githubusercontent.com/Rogerrrrrrrs/SwissQRBill/master/assets/qrbill.png">](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/assets/qrbill.pdf)


## Links

 * [Features](#features)
 * [Installation](#installation)
 * [Quick start](#quick-start)
 * [API documentation](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/doc/api.md)
 * [PDFKit documentation](http://pdfkit.org/docs/getting_started.html)
 * [How to guide to create a complete bill](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md)


## Features
 - Generates PDF with scalable vector graphics
 - Supports german, english, italian and french invoices
 - Supports A4 invoices as well as A6/5 (QR Bill only)
 - Supports empty fields as defined in the [specifications](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
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
  debitor: {
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
A complete documentation for all methods and parameters can be found in [doc/api.md](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/doc/api.md).

<br/>

## Further informations

SwissQRBill extends [PDFKit](https://github.com/foliojs/pdfkit) to generate PDF files and adds a few extra methods. You can generate a complete PDF bill using the original PDFKit methods and the additional methods documented in [doc/api.md](https://github.com/Rogerrrrrrrs/SwissQRBill/tree/master/doc/api.md#methods).
The documentation for PDFKit can be found [here](http://pdfkit.org/docs/getting_started.html).

A simple how to guide to generate a complete bill can be found in [doc/how-to-create-a-complete-bill.md](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/doc/how-to-create-a-complete-bill.md). You will learn how to create a PDF that looks like this:

[<img src="https://raw.githubusercontent.com/Rogerrrrrrrs/SwissQRBill/master/assets/complete-qr-bill.png">](https://github.com/Rogerrrrrrrs/SwissQRBill/tree/master/doc/how-to-create-a-complete-bill.md)