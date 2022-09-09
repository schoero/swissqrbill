const { SVG, PDF, QRBill } = require("../");
const { writeFileSync, createWriteStream } = require("fs");

const data = {
  currency: "CHF",
  amount: 1199.95,
  reference: "210000000003139471430009017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac",
    buildingNumber: 1268,
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debtor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse",
    buildingNumber: 28,
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};


const pdf = new PDF("./output/pdf/a6-5-buildingnumber.pdf", data);
const stream = createWriteStream("./output/pdf/a6-5-buildingnumber.pdf");

pdf.pipe(stream);
pdf.addQRBill(new QRBill(data));
pdf.end();

const svg = new SVG(data);
writeFileSync("./output/svg/a6-5-buildingnumber.svg", svg.toString());