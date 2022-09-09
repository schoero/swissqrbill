const { createWriteStream } = require("fs");
const { QRBill, PDF } = require("../");

const bill = new QRBill({
  currency: "CHF",
  creditor: {
    name: "Robert Schneider",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Zug",
    account: "CH5800791123000889012",
    country: "CH"
  }
}, { size: "A4" });

const pdf = new PDF();
const stream = createWriteStream("./output/pdf/a4-no-debtor-no-amount-no-reference.pdf");

pdf.pipe(stream);
pdf.addQRBill(bill);
pdf.end();