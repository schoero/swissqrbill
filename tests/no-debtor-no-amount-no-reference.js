const SwissQRBill = require("../");
const { writeFileSync } = require("fs");

const data = {
  currency: "CHF",
  av1: "eBillUV;UltraPay005;12345",
  av2: "eBillXY;XYService;54321",
  creditor: {
    name: "Robert Schneider ultra long name of the company to use multiple lines",
    address: "Rue du Lac 1268 Ultra long address nam eto use multiple lines",
    zip: 2501,
    city: "Zug ultra long city name multi line",
    account: "CH5800791123000889012",
    country: "CH"
  }
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/no-debtor-no-amount-no-reference.pdf");
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/no-debtor-no-amount-no-reference.svg", svg.toString());