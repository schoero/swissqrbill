import { describe, expect, test } from "vitest";

import { minimalRequired } from "swissqrbill:tests:data/data.js";
import { pdf } from "swissqrbill:tests:utils/pdf.js";
import { svg } from "swissqrbill:tests:utils/svg.js";


const OUT_DIR_PDF = "tests/output/pdf/options";
const OUT_DIR_SVG = "tests/output/svg/options";

describe("options", async () => {

  test("size: A4", async () => {
    const name = "size-a4";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("size: A6", async () => {
    const name = "size-a6";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { size: "A6" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no outlines", async () => {
    const name = "no-outlines";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { outlines: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no scissors", async () => {
    const name = "no-scissors";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { scissors: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text", async () => {
    const name = "no-separate-text";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { separate: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text + no scissors", async () => {
    const name = "no-separate-text-no-scissors";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { scissors: false, separate: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("no separate text + no scissors + no outlines", async () => {
    const name = "no-separate-text-no-scissors-no-outlines";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { outlines: false, scissors: false, separate: false, size: "A4" });
    expect(pdfSnapshot).toMatchSnapshot();
  });

  test("language: English", async () => {
    const name = "language-en";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { language: "EN" });
    const svgSnapshot = await svg(minimalRequired, `${OUT_DIR_SVG}/${name}.svg`, { language: "EN" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("language: Italian", async () => {
    const name = "language-it";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { language: "IT" });
    const svgSnapshot = await svg(minimalRequired, `${OUT_DIR_SVG}/${name}.svg`, { language: "IT" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("language: German", async () => {
    const name = "language-de";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { language: "DE" });
    const svgSnapshot = await svg(minimalRequired, `${OUT_DIR_SVG}/${name}.svg`, { language: "DE" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("language: French", async () => {
    const name = "language-fr";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { language: "FR" });
    const svgSnapshot = await svg(minimalRequired, `${OUT_DIR_SVG}/${name}.svg`, { language: "FR" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

});
