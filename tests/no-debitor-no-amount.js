const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  reference: "21 00000 00003 13947 14300 09017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH5800791123000889012",
    country: "CH"
  }
};

const bill = new SwissQRBill.PDF(data, "./output/no-debitor-no-amount.pdf");