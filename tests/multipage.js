const SwissQRBill = require("../");

const data = {
  currency: "CHF",
  amount: 1199.95,
  reference: "210000000003139471430009017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debtor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse 28",
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};

const pdf = new SwissQRBill.PDF(data, "./output/multipage.pdf", { "autoGenerate": false, "size": "A4" });

pdf.fontSize(11);
pdf.font("Helvetica-Bold");

pdf.text("PAGE 1", SwissQRBill.utils.mmToPoints(5), SwissQRBill.utils.mmToPoints(20), {
  width: SwissQRBill.utils.mmToPoints(210),
  align: "center",
});

pdf.addPage();

pdf.text("PAGE 2", SwissQRBill.utils.mmToPoints(5), SwissQRBill.utils.mmToPoints(20), {
  width: SwissQRBill.utils.mmToPoints(210),
  align: "center",
});

pdf.addPage();

pdf.text("PAGE 3", SwissQRBill.utils.mmToPoints(5), SwissQRBill.utils.mmToPoints(20), {
  width: SwissQRBill.utils.mmToPoints(210),
  align: "center",
});

pdf.addQRBill();

pdf.end();