const SwissQRBill = require("../");

const sampleObject = {
  currency: "CHF",
  amount: 1199.95,
  reference: "RF18 5390 0754 7034",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac",
    zip: 2501,
    city: "Biel",
    houseNumber: "1268",
    account: "CH58 0079 1123 0008 8901 2",
    country: "CH"
  },
  debitor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse",
    houseNumber: "28",
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};

const bill = new SwissQRBill.PDF(sampleObject, "./output/a6-5-housenumber.pdf");