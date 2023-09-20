import { describe, expect, test } from "vitest";

import { minimalRequired } from "swissqrbill:tests:data/valid-data.js";
import { pdf } from "swissqrbill:tests:utils/pdf.js";


describe("options", async () => {

  test("size: A4", async () => {
    const name = "size-a4";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("size: A5", async () => {
    const name = "size-a5";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { size: "A6" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no outlines", async () => {
    const name = "no-outlines";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { outlines: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no scissors", async () => {
    const name = "no-scissors";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { scissors: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text", async () => {
    const name = "no-separate-text";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { separate: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text + no scissors", async () => {
    const name = "no-separate-text-no-scissors";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { scissors: false, separate: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text + no scissors + no outlines", async () => {
    const name = "no-separate-text-no-scissors-no-outlines";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { outlines: false, scissors: false, separate: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

});
