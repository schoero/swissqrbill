const { createWriteStream } = require("fs");
const PDFDocument = require("pdfkit");
const { SwissQRBill } = require("swissqrbill/pdf");

const data = require("./data");


const stream = createWriteStream("./swissqrbill.pdf");
const pdf = new PDFDocument({ size: "A4" });
const qrBill = new SwissQRBill(data);

pdf.pipe(stream);

qrBill.attachTo(pdf);
pdf.end();
