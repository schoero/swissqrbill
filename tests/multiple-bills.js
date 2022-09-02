const fs = require("fs");

const PDFKit = require("pdfkit");
const SwissQRBill = require("../");

const stream = fs.createWriteStream("./output/pdf/multiple-bills.pdf");
const pdf = new PDFKit({ size: "A4", autoFirstPage: false, margin: 0 });

pdf.pipe(stream);

pdf.addPage();
pdf.text("First page");

const bills = [
  // A4
  new SwissQRBill.QRBill({
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
  }),

  // No debtor, no amount
  new SwissQRBill.QRBill({
    currency: "CHF",
    amount: 1199.95,
    reference: "RF18539007547034",
    creditor: {
      name: "Robert Schneider AG",
      address: "Rue du Lac 1268",
      zip: 2501,
      city: "Biel",
      account: "CH5800791123000889012",
      country: "CH"
    }
  }),

  // No scissors, no outlines
  new SwissQRBill.QRBill({
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
  }, { "scissors" : false, "outlines": false, "size": "A4" }),

  // A6-5
  new SwissQRBill.QRBill({
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
  }, { "size": "A6/5" }),

  // Normal iban creditor reference
  new SwissQRBill.QRBill({
    currency: "CHF",
    amount: 1199.95,
    creditor: {
      name: "Robert Schneider AG",
      address: "Rue du Lac 1268",
      zip: 2501,
      city: "Biel",
      account: "CH5800791123000889012",
      country: "CH"
    },
    debtor: {
      name: "Pia-Maria Rutschmann-Schnyder",
      address: "Grosse Marktgasse 28",
      zip: 9400,
      city: "Rorschach",
      country: "CH"
    }
  })
];

for(const bill of bills){
  bill.attachTo(pdf);
}

pdf.addPage();

pdf.text("Last Page");

pdf.end();


