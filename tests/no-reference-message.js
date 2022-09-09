const { PDF, SVG, QRBill } = require("../");
const { writeFileSync, createWriteStream } = require("fs");

const data = {
  currency: "CHF",
  amount: 1199.95,
  message: "Invoice number 12345 from order number 12345 on may 3rd 2021.",
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
};

const pdf = new PDF();
const stream = createWriteStream("./output/pdf/no-reference-message.pdf");

pdf.pipe(stream);
pdf.addQRBill(new QRBill(data, { "size": "A6/5" }));
pdf.end();

const svg = new SVG(data);
writeFileSync("./output/svg/no-reference-message.svg", svg.toString());