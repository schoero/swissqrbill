# SwissQRBill
![MIT License](https://img.shields.io/github/license/Rogerrrrrrrs/SwissQRBill?color=brightgreen)

With SwissQRBill you can easily generate the new QR Code payment slips which will be introduced on 30 June 2020 using Node.js.


## Installation

```
npm install swissqrbill
```

## Usage

```js
const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  amount: 1199.95,
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

const bill = new SwissQRBill.PDF(data, "qrbill.pdf", { size: "A6" });
```

This will generate the following .pdf file

<object data="https://github.com/Rogerrrrrrrs/SwissQRBill/assets/qrbill.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://github.com/Rogerrrrrrrs/SwissQRBill/assets/qrbill.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="https://github.com/Rogerrrrrrrs/SwissQRBill/assets/qrbill.pdf">Download PDF</a>.</p>
    </embed>
</object>