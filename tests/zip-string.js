const SwissQRBill = require("../");
const { writeFileSync } = require("fs");

const data = {
  currency: "CHF",
  reference: "210000000003139471430009017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: "9104 BR",
    city: "DAMWÂLD",
    account: "CH4431999123000889012",
    country: "NL"
  },
  debtor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse 28",
    zip: "9104 BR",
    city: "DAMWÂLD",
    country: "NL"
  }
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/zip-string.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/zip-string.svg", svg.toString());