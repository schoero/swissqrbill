import { SwissQRBill } from "swissqrbill:pdf";
import { minimalRequired } from "swissqrbill:tests:data/valid-data.js";
import { TestDocument } from "swissqrbill:tests:utils/pdf.js";
import { mm2pt } from "swissqrbill:utils";
import { describe, expect, it } from "vitest";


describe("qr-bill", async () => {

  it("should render the qr bill in an empty a4 document with enough space on the same page", async () => {
    const pdf = new TestDocument("qr-bill/same-page.pdf", { size: "A4" });
    const qrBill = new SwissQRBill(minimalRequired);

    qrBill.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render the qr bill in a a4 document with insufficient space on a new page", async () => {
    const pdf = new TestDocument("qr-bill/new-page.pdf", { size: "A4" });
    const qrBill = new SwissQRBill(minimalRequired);

    pdf.text("content", 0, mm2pt(250), {
      align: "center",
      height: mm2pt(40),
      width: mm2pt(210)
    });

    qrBill.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render the qr bill in a a4 document with multiple pages and enough space on the last page", async () => {
    const pdf = new TestDocument("qr-bill/multi-page.pdf", { size: "A4" });
    const qrBill = new SwissQRBill(minimalRequired);

    pdf.addPage();
    qrBill.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render the qr bill in a a4 document with multiple pages and insufficient space on a new page", async () => {
    const pdf = new TestDocument("qr-bill/multi-page-new-page.pdf", { size: "A4" });
    const qrBill = new SwissQRBill(minimalRequired);

    pdf.addPage();
    pdf.text("content", 0, mm2pt(250), {
      align: "center",
      height: mm2pt(40),
      width: mm2pt(210)
    });

    qrBill.attachTo(pdf);
    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render multiple qr bills on the same page if enough space is left and the positions are fixed", async () => {
    const pdf = new TestDocument("qr-bill/multi-qr-bills.pdf", { size: "A4" });
    const qrBill1 = new SwissQRBill(minimalRequired);
    const qrBill2 = new SwissQRBill(minimalRequired);
    const qrBill3 = new SwissQRBill(minimalRequired);

    qrBill1.attachTo(pdf, 0, 0);
    qrBill2.attachTo(pdf, 0, mm2pt(105));
    qrBill3.attachTo(pdf, 0, mm2pt(210));

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render the qr bills freely on a page", async () => {
    const pdf = new TestDocument("qr-bill/freely-placed.pdf", { layout: "landscape", size: "A4" });
    const qrBill = new SwissQRBill(minimalRequired);

    qrBill.attachTo(pdf, mm2pt(43.5), mm2pt(52.5));

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

});
