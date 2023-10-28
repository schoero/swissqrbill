import { describe, expect, test } from "vitest";

import { SwissQRCode } from "swissqrbill:pdf:swissqrcode";
import { mm2pt } from "swissqrbill:shared:utils";
import { minimalRequiredWithAlternativeScheme1and2 } from "swissqrbill:tests:data/valid-data";
import { TestDocument } from "swissqrbill:tests:utils/pdf";


describe("swissqrcode", () => {

  test("default sized swiss qr code", async () => {

    const name = "swissqrcode/default.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2);

    pdf.save();

    pdf.translate(mm2pt(77), mm2pt(77));

    qrCode.attachTo(pdf);

    pdf.restore();

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

  test("larger sized swiss qr code", async () => {

    const name = "swissqrcode/large.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 100);

    pdf.save();

    pdf.translate(mm2pt(50), mm2pt(50));

    qrCode.attachTo(pdf);

    pdf.restore();

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

  test("smaller sized swiss qr code", async () => {

    const name = "swissqrcode/small.pdf";
    const pdf = new TestDocument(name, { size: [mm2pt(200), mm2pt(200)] });
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 25);

    pdf.save();

    pdf.translate(mm2pt(87.5), mm2pt(87.5));

    qrCode.attachTo(pdf);

    pdf.restore();

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();

  });

});
