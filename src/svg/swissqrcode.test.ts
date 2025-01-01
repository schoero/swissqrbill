import { SwissQRCode } from "swissqrbill:svg";
import { minimalRequiredWithAlternativeScheme1and2 } from "swissqrbill:tests:data/valid-data.js";
import { TestDocument } from "swissqrbill:tests:utils/svg.js";
import { mm2pt } from "swissqrbill:utils";
import { describe, expect, test } from "vitest";


describe("swissqrcode", () => {

  test("default sized swiss qr code", async () => {

    const name = "swissqrcode/default.svg";
    const svg = new TestDocument(name);
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2);

    svg.width(mm2pt(200));
    svg.height(mm2pt(200));

    qrCode.instance.x(mm2pt(77));
    qrCode.instance.y(mm2pt(77));

    svg.appendInstance(qrCode.instance);

    expect(svg.snapshots).toMatchSnapshot();

  });

  test("larger sized swiss qr code", async () => {

    const name = "swissqrcode/large.svg";
    const svg = new TestDocument(name);
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 100);

    svg.width(mm2pt(200));
    svg.height(mm2pt(200));

    qrCode.instance.x(mm2pt(50));
    qrCode.instance.y(mm2pt(50));

    svg.appendInstance(qrCode.instance);

    expect(svg.snapshots).toMatchSnapshot();
  });

  test("smaller sized swiss qr code", async () => {

    const name = "swissqrcode/small.svg";
    const svg = new TestDocument(name);
    const qrCode = new SwissQRCode(minimalRequiredWithAlternativeScheme1and2, 25);

    svg.width(mm2pt(200));
    svg.height(mm2pt(200));

    qrCode.instance.x(mm2pt(87.5));
    qrCode.instance.y(mm2pt(87.5));

    svg.appendInstance(qrCode.instance);

    expect(svg.snapshots).toMatchSnapshot();

  });

});
