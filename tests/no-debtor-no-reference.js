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
  currency: "CHF"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-debtor-no-reference.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-debtor-no-reference.svg", svg.toString());
