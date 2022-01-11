const SwissQRBill = require("../");
const { writeFileSync } = require("fs");

const data = {
  currency: "CHF",
  av1: "eBill/UV;UltraPay005;12345",
  av2: "eBill/XY;XYService;54321",
  creditor: {
    name: "Robert Schneider",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Zug",
    account: "CH5800791123000889012",
    country: "CH"
  }
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-debtor-no-amount-no-reference.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-debtor-no-amount-no-reference.svg", svg.toString());