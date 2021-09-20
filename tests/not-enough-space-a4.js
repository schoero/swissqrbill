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

const pdf = new SwissQRBill.PDF(data, "./output/pdf/not-enough-space-a4.pdf", { "autoGenerate": false, "size": "A4" });

pdf.fontSize(11);
pdf.font("Helvetica-Bold");

pdf.text("PAGE 1", SwissQRBill.utils.mm2pt(5), pdf.page.height - 50, {
  width: SwissQRBill.utils.mm2pt(210),
  align: "center"
});

pdf.addQRBill("A4");

pdf.end();