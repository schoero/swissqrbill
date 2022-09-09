const { PDF, SVG, QRBill } = require("../");
const { writeFileSync, createWriteStream } = require("fs");

const data = {
  currency: "CHF",
  amount: 1199.95,
  reference: "210000000003139471430009017",
  av1: "eBill/UV;UltraPay005;12345",
  av2: "eBill/XY;XYService;54321",
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
const stream = createWriteStream("./output/pdf/av1av2.pdf");

pdf.pipe(stream);
pdf.addQRBill(new QRBill(data));
pdf.end();

const svg = new SVG(data);
writeFileSync("./output/svg/av1av2.svg", svg.toString());