import { describe, expect, test } from "vitest";

import { minimalRequired } from "swissqrbill:tests:data/valid-data";
import { pdf } from "swissqrbill:tests:utils/pdf";
import { svg } from "swissqrbill:tests:utils/svg";


describe("options", async () => {

  test("no outlines", async () => {
    const name = "no-outlines";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { outlines: false });
    const svgSnapshot = await svg(minimalRequired, `options/${name}.svg`, { outlines: false });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("no scissors", async () => {
    const name = "no-scissors";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { scissors: false });
    const svgSnapshot = await svg(minimalRequired, `options/${name}.svg`, { scissors: false });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("no separate text", async () => {
    const name = "no-separate-text";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { separate: false });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text + no scissors", async () => {
    const name = "no-separate-text-no-scissors";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { scissors: false, separate: false });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text + no scissors + no outlines", async () => {
    const name = "no-separate-text-no-scissors-no-outlines";
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { outlines: false, scissors: false, separate: false });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("font", async () => {
    const name = "font";
    // @ts-expect-error Courier isn't allowed by the specs but for testing, it is easier to use a built-in font instead of registering one.
    const pdfSnapshot = await pdf(minimalRequired, `options/${name}.pdf`, { font: "Courier" });
    // @ts-expect-error Courier isn't allowed by the specs but for testing, it is easier to use a built-in font instead of registering one.
    const svgSnapshot = await svg(minimalRequired, `options/${name}.svg`, { font: "Courier" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

});
