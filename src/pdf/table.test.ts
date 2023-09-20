import { describe, expect, it } from "vitest";

import { Table } from "swissqrbill:pdf/table";
import {
  alignmentOverrides,
  alignmentVariants,
  autoWidth,
  backgroundColorOverrides,
  borderColor,
  borderOverrides,
  borderThickness,
  fontSizeOverrides,
  header,
  paddingOverrides,
  paddingVariants,
  textColorOverrides
} from "swissqrbill:tests:data/table";
import { TestDocument } from "swissqrbill:tests:utils/pdf";


describe("table", async () => {

  it("should render and override background colors correctly", async () => {
    const pdf = new TestDocument("table/background-color.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(backgroundColorOverrides);

    table.attachTo(pdf);
    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should render and override text colors correctly", async () => {
    const pdf = new TestDocument("table/text-color.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(textColorOverrides);

    table.attachTo(pdf);
    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should render and override text alignment correctly", async () => {
    const pdf = new TestDocument("table/alignment.pdf", { layout: "landscape", size: "A4" });
    const variantsTable = new Table(alignmentVariants);
    const overridesTable = new Table(alignmentOverrides);

    variantsTable.attachTo(pdf);
    pdf.moveDown();
    overridesTable.attachTo(pdf);

    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should render and override borders correctly", async () => {
    const pdf = new TestDocument("table/border.pdf", { layout: "landscape", size: "A4" });
    const borderThicknessTable = new Table(borderThickness);
    const borderOverridesTable = new Table(borderOverrides);
    const borderColorTable = new Table(borderColor);

    borderThicknessTable.attachTo(pdf);
    pdf.moveDown();
    borderOverridesTable.attachTo(pdf);
    pdf.moveDown();
    borderColorTable.attachTo(pdf);

    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should render and override paddings correctly", async () => {
    const pdf = new TestDocument("table/padding.pdf", { layout: "landscape", size: "A4" });
    const paddingTable = new Table(paddingVariants);
    const paddingOverridesTable = new Table(paddingOverrides);

    paddingTable.attachTo(pdf);
    pdf.moveDown();
    paddingOverridesTable.attachTo(pdf);

    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should render and override font sizes correctly", async () => {
    const pdf = new TestDocument("table/font-size.pdf", { layout: "landscape", size: "A4" });
    const fontSizeOverridesTable = new Table(fontSizeOverrides);

    fontSizeOverridesTable.attachTo(pdf);

    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should always fill the entire width if possible, but should not enforce it", async () => {
    const pdf = new TestDocument("table/width.pdf", { layout: "landscape", size: "A4" });
    const autoWidthTable = new Table(autoWidth);

    autoWidthTable.attachTo(pdf);
    pdf.moveDown();

    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(1);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

  it("should render the header row on every page", async () => {
    const pdf = new TestDocument("table/header.pdf", { layout: "landscape", size: "A4" });
    const headerTable = new Table(header);

    headerTable.attachTo(pdf);

    pdf.end();

    await expect(pdf.snapshots).resolves.toHaveLength(2);
    await expect(pdf.snapshots).resolves.toMatchSnapshot();
  });

});
