import { createWriteStream } from "fs";
import PDFDocument from "pdfkit";
import { SwissQRBill } from "swissqrbill/pdf";

import { data } from "./data.js";


const stream = createWriteStream("./output/swissqrbill.pdf");
const pdf = new PDFDocument({ size: "A4" });
const qrBill = new SwissQRBill(data);

pdf.pipe(stream);

qrBill.attachTo(pdf);
pdf.end();
