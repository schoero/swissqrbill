import { data } from "./data.js";


const stream = blobStream();
const pdf = new PDFDocument();
const qrBill = new SwissQRBill.pdf.SwissQRBill(data);

stream.on("finish", () => {
  window.location.href = stream.toBlobURL("application/pdf");
});

qrBill.attachTo(pdf);
pdf.pipe(stream);
pdf.end();
