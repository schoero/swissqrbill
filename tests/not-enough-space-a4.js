const SwissQRBill = require("../");


const data = {
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
  reference: "210000000003139471430009017"
};

const pdf = new SwissQRBill.PDF(data, "./output/pdf/not-enough-space-a4.pdf", { autoGenerate: false, size: "A4" });

pdf.fontSize(11);
pdf.font("Helvetica-Bold");

pdf.text("PAGE 1", SwissQRBill.utils.mm2pt(5), pdf.page.height - 50, {
  align: "center",
  width: SwissQRBill.utils.mm2pt(210)
});

pdf.addQRBill("A4");

pdf.end();
