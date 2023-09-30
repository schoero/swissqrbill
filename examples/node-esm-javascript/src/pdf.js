import { SwissQRBill } from "swissqrbill/pdf"
import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { data } from "./data.js";

const stream = createWriteStream('./swissqrbill.pdf');
const pdf = new PDFDocument({ size: "A4" });
const qrBill = new SwissQRBill(data);

pdf.pipe(stream);

qrBill.attachTo(pdf);
pdf.end();

