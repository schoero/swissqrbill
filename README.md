# SwissQRBill
![MIT License](https://img.shields.io/github/license/rogerrrrrrrs/swissqrbill)
![Version](https://img.shields.io/github/package-json/v/Rogerrrrrrrs/SwissQRBill)

With SwissQRBill you can easily generate the new QR Code payment slips which will be introduced on 30 June 2020 in switzerland.

## Contents

 * [Features](#features)
 * [Installation](#installation)
 * [Usage](#Usage)
 * [API](#API)

## Features
 - Generates PDF with scalable vector graphics
 - Supports german, english, italian and french invoices
 - Supports A4 invoices as well as A6/5 (QR Bill only)
 - Supports empty fields as defined in the [specifications](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-de.pdf)
 - Allows you to add other content above the invoice using [PDFKit](https://github.com/foliojs/pdfkit)
 - Easy to use
 - Free and open source

## Installation

```
npm i swissqrbill --save
```

## Usage

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

const bill = new SwissQRBill.PDF(data, "qrbill.pdf");
```

This will generate the following PDF file

[<img src="https://raw.githubusercontent.com/Rogerrrrrrrs/SwissQRBill/development/assets/qrbill.png">](https://github.com/Rogerrrrrrrs/SwissQRBill/blob/master/assets/qrbill.pdf)

## API

### Methods
- Constructor
  - [SwissQRBill.PDF(data, outputPath[, options])](#swissqrbillpdfdata-outputpath-options)
- Methods
  - [addPage()](#addpage)
  - [end()](#end)
  - [addQRBill()](#addqrbill)
  - [mmToPoints(mm)](#mmtopointsmm)

#### SwissQRBill.PDF(data, outputPath[, options])
 - data - object containing all relevant billing data.
 - outputPath - string output path for the generated PDF file.
 - options - object containing settings, optional.
 
  Returns a new instance of SwissQRBill.PDF.

  Available options: 
   - language - string: Either `"DE" | "EN" | "IT" | "FR"`. Default `"DE"`.
   - size - string: Either `"A4" | "A6/5"`. Default `"A6/5"`.
   - scissors - boolean: Whether you want to show the scissor icons or the text `Separate before paying in`. Default `true`.
   - autoGenerate - boolean: Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit. Default `true`.

#### addPage()
Adds a new page to the PDF.

#### end()
Finalizes the PDF document, after this command you are no longer able to edit the PDF.
Note: This function is automatically called when the option autoGenerate is set to true.

#### addQRBill()
Adds the QR Bill to the bottom of the current page.
Note: This function is automatically called when the option autoGenerate is set to true.

#### mmToPoints(mm)
 - mm - number containg the millimeters you want to convert to points.
 Converts milimeters to points which are used in the PDF file.
 Returns a number containing the converted millimeters in points.


## PDFKit
This module uses [PDFKit](https://github.com/foliojs/pdfkit) to generate PDF files. You are able to generate a comlete bill using PDFKit methods and then add the QR Bill to the bottom using `addQRBill()` when the option `autoGenerate` is set to `false`.

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

const bill = new SwissQRBill.PDF(data, "./output/multipage.pdf", { autoGenerate: false });

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