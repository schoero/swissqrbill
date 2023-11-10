import BlobStream from "blob-stream";
import fs from "fs";
import PDFDocument from "pdfkit";
import Helvetica from "pdfkit/js/data/Helvetica.afm";
import HelveticaBold from "pdfkit/js/data/Helvetica-Bold.afm";
import { SwissQRBill } from "swissqrbill/pdf";


fs.writeFileSync("data/Helvetica.afm", Helvetica);
fs.writeFileSync("data/Helvetica-Bold.afm", HelveticaBold);

const data = {
  creditor: {
    account: "CH58 0079 1123 0008 8901 2",
    address: "Creditor Address",
    city: "Creditor City",
    country: "CH",
    name: "Creditor FirstName LastName",
    zip: 1234
  },
  currency: "CHF"
};

const stream = new BlobStream();
const pdf = new PDFDocument();
const qrBill = new SwissQRBill(data);

qrBill.attachTo(pdf);

stream.on("finish", () => {
  window.location.href = stream.toBlobURL("application/pdf");
  console.log("PDF has been successfully created.");
});

pdf.pipe(stream);
pdf.end();
