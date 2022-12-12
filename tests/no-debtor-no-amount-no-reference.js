const { writeFileSync } = require("fs");

const SwissQRBill = require("../");


const data = {
  av1: "eBill/UV;UltraPay005;12345",
  av2: "eBill/XY;XYService;54321",
  creditor: {
    account: "CH5800791123000889012",
    address: "Rue du Lac 1268",
    city: "Zug",
    country: "CH",
    name: "Robert Schneider",
    zip: 2501
  },
  currency: "CHF"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-debtor-no-amount-no-reference.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-debtor-no-amount-no-reference.svg", svg.toString());
