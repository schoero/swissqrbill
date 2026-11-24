import PDFDocument from "pdfkit";
import { describe, expect, it, vi } from "vitest";

import { Table } from "swissqrbill:pdf";
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
  headerAfterPageBreak,
  oversizedRowWithHeader,
  paddingOverrides,
  paddingVariants,
  singleCell,
  textColorOverrides,
  tupleShorthand
} from "swissqrbill:tests:data/table.js";
import { TestDocument } from "swissqrbill:tests:utils/pdf.js";


describe("table", async () => {

  it("should convert the values of tuples shorthand syntax correctly", async () => {
    const pdf = new TestDocument("table/tuple-shorthand.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(tupleShorthand);

    table.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render and override background colors correctly", async () => {
    const pdf = new TestDocument("table/background-color.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(backgroundColorOverrides);

    table.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render and override text colors correctly", async () => {
    const pdf = new TestDocument("table/text-color.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(textColorOverrides);

    table.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render and override text alignment correctly", async () => {
    const pdf = new TestDocument("table/alignment.pdf", { layout: "landscape", size: "A4" });
    const variantsTable = new Table(alignmentVariants);
    const overridesTable = new Table(alignmentOverrides);

    variantsTable.attachTo(pdf);
    pdf.moveDown();
    overridesTable.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
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

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render and override paddings correctly", async () => {
    const pdf = new TestDocument("table/padding.pdf", { layout: "landscape", size: "A4" });
    const paddingTable = new Table(paddingVariants);
    const paddingOverridesTable = new Table(paddingOverrides);

    paddingTable.attachTo(pdf);
    pdf.moveDown();
    paddingOverridesTable.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render and override font sizes correctly", async () => {
    const pdf = new TestDocument("table/font-size.pdf", { layout: "landscape", size: "A4" });
    const fontSizeOverridesTable = new Table(fontSizeOverrides);

    fontSizeOverridesTable.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should always fill the entire width if possible, but should not enforce it", async () => {
    const pdf = new TestDocument("table/width.pdf", { layout: "landscape", size: "A4" });
    const autoWidthTable = new Table(autoWidth);

    autoWidthTable.attachTo(pdf);
    pdf.moveDown();

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render the header row on every page", async () => {
    const pdf = new TestDocument("table/header.pdf", { layout: "landscape", size: "A4" });
    const headerTable = new Table(header);

    headerTable.attachTo(pdf);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should repeat the header row if it is not the first row", async () => {
    const pdf = new TestDocument("table/header-after-page-break.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(headerAfterPageBreak);

    const textCalls: { page: PDFKit.PDFPage; text: string; }[] = [];
    const text = pdf.text.bind(pdf);
    vi.spyOn(pdf, "text").mockImplementation((...args: Parameters<typeof pdf.text>) => {
      textCalls.push({ page: pdf.page, text: args[0] });
      return text(...args);
    });

    table.attachTo(pdf);

    const { count, start } = pdf.bufferedPageRange();
    const pages = Array.from({ length: count }, (_, index) => {
      pdf.switchToPage(start + index);
      return pdf.page;
    });
    const textsByPage = pages.map(page => textCalls.filter(call => call.page === page).map(call => call.text));

    expect(textsByPage).toEqual([
      ["before 1", "before 2", "before 3", "before 4"],
      ["header", "before 5", "before 6", "header", "after 1", "after 2"],
      ["header", "after 3", "after 4", "after 5", "after 6"]
    ]);

    await pdf.writeFile();
  });

  it("should render the table if earlier pages of the document have already been flushed", async () => {
    const pdf = new PDFDocument({ layout: "landscape", size: "A4" });
    pdf.addPage({ layout: "landscape", size: "A4" });
    pdf.addPage({ layout: "landscape", size: "A4" });

    const table = new Table({
      rows: Array.from({ length: 3 }, () => ({ columns: [{ text: "row" }], height: 250 }))
    });

    expect(pdf.bufferedPageRange()).toEqual({ count: 1, start: 2 });
    expect(() => table.attachTo(pdf)).not.toThrow();
    expect(pdf.bufferedPageRange()).toEqual({ count: 3, start: 2 });
  });

  it("should not keep adding pages for a row that is taller than the page", async () => {
    const pdf = new TestDocument("table/oversized-row.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(oversizedRowWithHeader);

    const addPage = pdf.addPage.bind(pdf);
    const addPageSpy = vi.spyOn(pdf, "addPage").mockImplementation(options => {
      if(addPageSpy.mock.calls.length > 10){
        throw new Error("Table keeps adding pages");
      }
      return addPage(options);
    });

    table.attachTo(pdf);

    expect(pdf.bufferedPageRange()).toEqual({ count: 3, start: 0 });

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render the table on the specified position", async () => {
    const pdf = new TestDocument("table/position.pdf", { layout: "landscape", margin: 0, size: "A4" });
    const headerTable = new Table(singleCell);

    headerTable.attachTo(pdf, pdf.page.width / 2 - 50, pdf.page.height / 2 - 50);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

});
