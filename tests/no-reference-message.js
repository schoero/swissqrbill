const { writeFileSync } = require("fs");

const SwissQRBill = require("../");


const data = {
  amount: 1199.95,
  creditor: {
    account: "CH5800791123000889012",
    address: "Rue du Lac 1268",
    city: "Biel",
    country: "CH",
    name: "Robert Schneider AG",
    zip: 2501
  },
  currency: "CHF",
  debtor: {
    address: "Grosse Marktgasse 28",
    city: "Rorschach",
    country: "CH",
    name: "Pia-Maria Rutschmann-Schnyder",
    zip: 9400
  },
  message: "Invoice number 12345 from order number 12345 on may 3rd 2021."
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-reference-message.pdf", { size: "A6" });
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-reference-message.svg", svg.toString());
