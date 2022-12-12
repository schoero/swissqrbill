const SwissQRBill = require("../");


const data = {
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

const pdf = new SwissQRBill.PDF(data, "./output/pdf/a4-no-debtor-no-amount-no-reference.pdf", { size: "A4" });
