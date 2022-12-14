import { describe, expect, test } from "vitest";

import { mm2pt } from "swissqrbill:shared/utils.js";
import { minimalRequired } from "swissqrbill:tests:data/data.js";
import { createPDF } from "swissqrbill:tests:utils/pdf.js";


const OUT_DIR_PDF = "tests/output/pdf/multi-page";

describe("Multiple pages", () => {

  test("Page overflow", async () => {
    const name = "page-overflow";
    const { pdf, snapshots } = createPDF(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`, { autoGenerate: false, size: "A4" });

    pdf.fontSize(11);
    pdf.font("Helvetica-Bold");

    pdf.text("PAGE 1", mm2pt(5), pdf.page.height - 50, {
      align: "center",
      width: mm2pt(210)
    });

    pdf.addQRBill("A4");

    pdf.end();

    await expect(snapshots).resolves.to.have.toHaveLength(2);
    await expect(snapshots).resolves.toMatchSnapshot();

  });

});
