const { PDF, QRBill, utils } = require("../");
const { createWriteStream } = require("fs");

const bill = new QRBill({
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
}, { size: "A4" });

const pdf = new PDF("A4");
const stream = createWriteStream("./output/pdf/multipage.pdf");

pdf.pipe(stream);

pdf.addPage();

pdf.fontSize(11);
pdf.font("Helvetica-Bold");

pdf.text("PAGE 1", utils.mm2pt(5), utils.mm2pt(20), {
  width: utils.mm2pt(210),
  align: "center"
});

pdf.addPage();

pdf.text("PAGE 2", utils.mm2pt(5), utils.mm2pt(20), {
  width: utils.mm2pt(210),
  align: "center"
});

pdf.addPage();

pdf.text("PAGE 3", utils.mm2pt(5), utils.mm2pt(20), {
  width: utils.mm2pt(210),
  align: "center"
});

pdf.addQRBill(bill);

pdf.end();