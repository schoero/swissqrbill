import { describe, expect, test } from "vitest";

import { minimalRequired } from "swissqrbill:tests:data/data.js";
import { pdf } from "swissqrbill:tests:utils/pdf.js";
import { svg } from "swissqrbill:tests:utils/svg.js";


describe("tanslations", async () => {

  test("language: English", async () => {
    const name = "language-en";
    const pdfSnapshot = await pdf(minimalRequired, `translations/${name}.pdf`, { language: "EN" });
    const svgSnapshot = await svg(minimalRequired, `translations/${name}.svg`, { language: "EN" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("language: Italian", async () => {
    const name = "language-it";
    const pdfSnapshot = await pdf(minimalRequired, `translations/${name}.pdf`, { language: "IT" });
    const svgSnapshot = await svg(minimalRequired, `translations/${name}.svg`, { language: "IT" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("language: German", async () => {
    const name = "language-de";
    const pdfSnapshot = await pdf(minimalRequired, `translations/${name}.pdf`, { language: "DE" });
    const svgSnapshot = await svg(minimalRequired, `translations/${name}.svg`, { language: "DE" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("language: French", async () => {
    const name = "language-fr";
    const pdfSnapshot = await pdf(minimalRequired, `translations/${name}.pdf`, { language: "FR" });
    const svgSnapshot = await svg(minimalRequired, `translations/${name}.svg`, { language: "FR" });
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

});
