const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  reference: "RF18 5390 0754 7034",
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