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
  reference: "RF18539007547034"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/normal-iban-no-reference.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/normal-iban-no-reference.svg", svg.toString());
