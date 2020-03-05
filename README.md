# SwissQRBill
![MIT License](https://img.shields.io/npm/l/swissqrbill?color=brightgreen)
![Dependencies](https://img.shields.io/david/rogerrrrrrrs/swissqrbill)
![Downloads](https://img.shields.io/npm/dw/swissqrbill)
![Issues](https://img.shields.io/github/issues-raw/rogerrrrrrrs/swissqrbill)
![Version](https://img.shields.io/npm/v/swissqrbill?color=brightgreen)
![CI](https://github.com/Rogerrrrrrrs/SwissQRBill/workflows/CI/badge.svg?branch=development)

With SwissQRBill you can easily generate the new QR Code payment slips which will be introduced on 30 June 2020 in switzerland.

[<img src="https://raw.githubusercontent.com/Rogerrrrrrrs/SwissQRBill/development/assets/qrbill.png">](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/assets/qrbill.pdf)


## Contents

 * [Features](#features)
 * [Installation](#installation)
 * [Quick start](#quick-start)
 * [API](https://github.com/Rogerrrrrrrs/SwissQRBill/tree/master/doc/api.md)


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

It is fairly simple to create a QR Bill. All we have to do is to create a new `SwissQRBill.PDF` instance and pass our data as the first parameter and our output path as a second parameter. A reference for the data parameter can be found [here](https://github.com/Rogerrrrrrrs/SwissQRBill/tree/master/doc/api.md#data).


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

const pdf = new SwissQRBill.PDF(data, "qrbill.pdf");
```

This will generate the above PDF. We can pass an optional third parameter containing options such as language or size etc.
A complete documentation for all methods and parameters can be found [here](https://github.com/Rogerrrrrrrs/SwissQRBill/tree/master/doc/api.md).

## PDFKit

SwissQRBill internally uses [PDFKit](https://github.com/foliojs/pdfkit) to generate PDF files. You are able to generate a complete bill using PDFKit methods and then add the QR Bill to the bottom using `addQRBill()` when the option `autoGenerate` is set to `false`.

The documentation for PDFKit can be found [here](http://pdfkit.org/docs/getting_started.html).

The following example adds 3 Pages and then the QR Bill at the bottom of the third page.

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

const pdf = new SwissQRBill.PDF(data, "./output/multipage.pdf", { autoGenerate: false });

bill.document.fontSize(11);
bill.document.font("Helvetica-Bold");

bill.document.text("PAGE 1", bill.mmToPoints(5), bill.mmToPoints(20), {
  width: bill.mmToPoints(210),
  align: "center",
});

bill.addPage();

bill.document.text("PAGE 2", bill.mmToPoints(5), bill.mmToPoints(20), {
  width: bill.mmToPoints(210),
  align: "center",
});

bill.addPage();

bill.document.text("PAGE 3", bill.mmToPoints(5), bill.mmToPoints(20), {
  width: bill.mmToPoints(210),
  align: "center",
});

bill.addQRBill();

bill.end();
```