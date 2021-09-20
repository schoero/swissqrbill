const { writeFileSync } = require("fs");
const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  reference: "210000000003139471430009017",
  av1: "eBillUV;UltraPay005;12345",
  av2: "eBillXY;XYService;54321",
  message: "Invoice number 12345 from order number 12345 on may 3rd 2021.",
  additionalInformation: "//S1/10/10201409/11/170309/20/14000000/ 30/106017086",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  }
};

const svg = new SwissQRBill.SVG(data);

writeFileSync("./output/svg.svg", svg.toString());