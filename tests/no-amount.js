const { writeFileSync } = require("fs");

const SwissQRBill = require("../");


const data = {
  creditor: {
    account: "CH4431999123000889012",
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
  reference: "210000000003139471430009017"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-amount.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-amount.svg", svg.toString());
