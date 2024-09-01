const { createWriteStream } = require("fs");

const PDFDocument = require("pdfkit");
const { SwissQRBill } = require("swissqrbill/pdf");

const data = require("./data");


const stream = createWriteStream("./output/swissqrbill.pdf");
const pdf = new PDFDocument();
const qrBill = new SwissQRBill(data);

qrBill.attachTo(pdf);

pdf.pipe(stream);
pdf.end();
