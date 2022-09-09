const PDFKit = require("pdfkit");
const { QRBill } = require("../");
const { createWriteStream } = require("fs");

const stream = createWriteStream("./output/pdf/standalone-pdfkit.pdf");

const doc = new PDFKit({ size: "A4", autoFirstPage: false, margin: 0 });

doc.pipe(stream);

doc.addPage();
doc.text("First page");

const bill = new QRBill({
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
});

bill.attachTo(doc);

doc.addPage();

doc.text("Second Page");

doc.end();

