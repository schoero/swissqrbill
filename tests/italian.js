const { PDF, SVG, QRBill } = require("../");
const { writeFileSync, createWriteStream } = require("fs");

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

const pdf = new PDF();
const stream = createWriteStream("./output/pdf/italian.pdf");

pdf.pipe(stream);
pdf.addQRBill(new QRBill(data, { language: "IT" }));
pdf.end();

const svg = new SVG(data, { language: "IT" });
writeFileSync("./output/svg/italian.svg", svg.toString());