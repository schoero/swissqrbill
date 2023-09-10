import { writeFileSync } from "node:fs";

import PDFDocument from "pdfkit";
import { describe, expect, test } from "vitest";

import { minimalRequired } from "swissqrbill:tests:data/data.js";
import { pdfBufferToJson } from "swissqrbill:tests:utils/pdf.js";

import { QRBill } from "./qr-bill.js";
import { mm2pt } from "./utils.js";


describe("qr-bill", async () => {

  test("empty a4 document with enough space for the qr bill", async () => {
    const pdf = new PDFDocument({ size: "A4" });
    const qrBill = new QRBill(minimalRequired);

    qrBill.attachTo(pdf);
    pdf.end();

    const buffer = pdf.read();
    const snapshot = await pdfBufferToJson(buffer as Buffer);
    expect(snapshot).toMatchSnapshot();
  });

  test("a4 document with insufficient space for the qr bill", async () => {
    const pdf = new PDFDocument({ size: "A4" });
    const qrBill = new QRBill(minimalRequired);

    pdf.text("content", 0, mm2pt(250), {
      align: "center",
      height: mm2pt(40),
      width: mm2pt(210)
    });

    qrBill.attachTo(pdf);
    pdf.end();

    const buffer = pdf.read();
    const snapshot = await pdfBufferToJson(buffer as Buffer);
    expect(snapshot).toMatchSnapshot();
  });

  test("multi page a4 document with enough space for the qr bill", async () => {
    const pdf = new PDFDocument({ size: "A4" });
    const qrBill = new QRBill(minimalRequired);

    pdf.addPage();
    qrBill.attachTo(pdf);
    pdf.end();

    const buffer = pdf.read();
    writeFileSync("qr-bill.pdf", buffer);
    const snapshot = await pdfBufferToJson(buffer as Buffer);
    expect(snapshot).toMatchSnapshot();
  });

  test("multi page a4 document with insufficient space for the qr bill", async () => {
    const pdf = new PDFDocument({ size: "A4" });
    const qrBill = new QRBill(minimalRequired);

    pdf.addPage();
    pdf.text("content", 0, mm2pt(250), {
      align: "center",
      height: mm2pt(40),
      width: mm2pt(210)
    });

    qrBill.attachTo(pdf);
    pdf.end();

    const buffer = pdf.read();
    const snapshot = await pdfBufferToJson(buffer as Buffer);
    expect(snapshot).toMatchSnapshot();
  });

});
