const { writeFileSync } = require("fs");

const SwissQRBill = require("../");


const data = {
  creditor: {
    account: "CH4431999123000889012",
    address: "Rue du Lac 1268",
    city: "DAMWÂLD",
    country: "NL",
    name: "Robert Schneider AG",
    zip: "9104 BR"
  },
  currency: "CHF",
  debtor: {
    address: "Grosse Marktgasse 28",
    city: "DAMWÂLD",
    country: "NL",
    name: "Pia-Maria Rutschmann-Schnyder",
    zip: "9104 BR"
  },
  reference: "210000000003139471430009017"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/zip-string.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/zip-string.svg", svg.toString());
