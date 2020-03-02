const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  amount: 1199.95,
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debitor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse 28",
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};

const bill = new SwissQRBill.PDF(data, "./output/multipage.pdf", { autoGenerate: false, size: "A4" });

bill.document.fontSize(11);
bill.document.font("Helvetica-Bold");

bill.document.text("PAGE 1", bill.mmToPoints(5), bill.mmToPoints(20), {
  width: bill.mmToPoints(210),
  align: "center",
});

bill.addPage();

bill.document.text("PAGE 2", bill.mmToPoints(5), bill.mmToPoints(20), {
  width: bill.mmToPoints(210),
  align: "center",
});

bill.addPage();

bill.document.text("PAGE 3", bill.mmToPoints(5), bill.mmToPoints(20), {
  width: bill.mmToPoints(210),
  align: "center",
});

bill.addQRBill();

bill.end();