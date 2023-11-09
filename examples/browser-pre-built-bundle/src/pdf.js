import { data } from "./data.js";


const stream = new BlobStream();
const pdf = new PDFDocument({ size: "A4" });
const qrBill = new SwissQRBill.pdf.SwissQRBill(data);

stream.on("finish", () => {
  window.location.href = stream.toBlobURL("application/pdf");
});

qrBill.attachTo(pdf);
pdf.pipe(stream);
pdf.end();
