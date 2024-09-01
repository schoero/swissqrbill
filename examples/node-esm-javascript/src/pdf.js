import { createWriteStream } from "fs";

import PDFDocument from "pdfkit";
import { SwissQRBill } from "swissqrbill/pdf";

import { data } from "./data.js";


const stream = createWriteStream("./output/swissqrbill.pdf");
const pdf = new PDFDocument();
const qrBill = new SwissQRBill(data);

qrBill.attachTo(pdf);

pdf.pipe(stream);
pdf.end();
