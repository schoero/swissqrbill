const fs = require("fs");

const PDFKit = require("pdfkit");
const SwissQRBill = require("../");

const stream = fs.createWriteStream("./output/pdf/standalone-pdfkit.pdf");
const pdf = new PDFKit({ size: "A4", autoFirstPage: false, margin: 0 });

pdf.pipe(stream);

pdf.addPage();
pdf.text("First page");

const bill = new SwissQRBill.QRBill({
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

bill.attachTo(pdf);

pdf.addPage();

pdf.text("Second Page");

pdf.end();

