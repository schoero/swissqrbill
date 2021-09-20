const SwissQRBill = require("../");
const { writeFileSync } = require("fs");

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


const pdf = new SwissQRBill.PDF(data, "./output/pdf/a6-5-buildingnumber.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/a6-5-buildingnumber.svg", svg.toString());