const { writeFileSync } = require("fs");

const SwissQRBill = require("../");


const data = {
  creditor: {
    account: "CH5800791123000889012",
    address: "Rue du Lac 1268",
    city: "Biel",
    country: "CH",
    name: "Robert Schneider AG",
    zip: 2501
  },
  currency: "CHF",
  reference: "RF18539007547034"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-debtor-no-amount.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-debtor-no-amount.svg", svg.toString());
