const { PDF, SVG, QRBill } = require("../");
const { writeFileSync, createWriteStream } = require("fs");

const data = {
  currency: "CHF",
  reference: "RF18539007547034",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH5800791123000889012",
    country: "CH"
  }
};

const pdf = new PDF();
const stream = createWriteStream("./output/pdf/no-debtor-no-amount.pdf");

pdf.pipe(stream);
pdf.addQRBill(new QRBill(data));
pdf.end();

const svg = new SVG(data);
writeFileSync("./output/svg/no-debtor-no-amount.svg", svg.toString());