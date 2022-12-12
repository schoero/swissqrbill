const { writeFileSync } = require("fs");

const SwissQRBill = require("../");


const data = {
  additionalInformation: "//S1/10/10201409/11/170309/20/14000000/ 30/106017086",
  amount: 1199.95,
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
  message: "Invoice number 12345 from order number 12345 on may 3rd 2021.",
  reference: "210000000003139471430009017"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/message-additional-information.pdf", { size: "A6/5" });
const svg = new SwissQRBill.SVG(data);
writeFileSync("./output/svg/message-additional-information.svg", svg.toString());
