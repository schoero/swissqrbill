import { data } from "./data.js";


const width = SwissQRBill.utils.mm2pt(210);
const height = SwissQRBill.utils.mm2pt(105);

const pdf = new PDFDocument({ size: [width, height] });
const stream = pdf.pipe(blobStream());
const qrBill = new SwissQRBill.PDF(data);

stream.on("finish", () => {
  const url = stream.toBlobURL("application/pdf");
  iframe.src = url;
});

qrBill.attachTo(pdf);
pdf.end();
