const SwissQRBill = require("../");

const data = {
  currency: "EUR",
  amount: 1199.95,
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  }
};

const bill = new SwissQRBill.PDF(data, "./output/no-debitor.pdf");