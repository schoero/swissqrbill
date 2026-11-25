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
  headerRowAtPageBottom,
  headerRowBeforeTallRow,
  multipleHeaderRows,
  overflowingSecondHeaderRow,
  oversizedRowWithHeader,
  paddingOverrides,
  paddingVariants,
  repeatedHeaderRows,
  reusedHeaderRow,
  singleCell,
  textColorOverrides,
  tupleShorthand
} from "swissqrbill:tests:data/table.js";
import { TestDocument } from "swissqrbill:tests:utils/pdf.js";


function trackTextsByPage(pdf: PDFKit.PDFDocument) {
  const textCalls: { page: PDFKit.PDFPage; text: string; }[] = [];
  const text = pdf.text.bind(pdf);
  vi.spyOn(pdf, "text").mockImplementation((...args: Parameters<typeof pdf.text>) => {
    textCalls.push({ page: pdf.page, text: args[0] });
    return text(...args);
  });

  return () => {
    const { count, start } = pdf.bufferedPageRange();
    const pages = Array.from({ length: count }, (_, index) => {
      pdf.switchToPage(start + index);
      return pdf.page;
    });
    return pages.map(page => textCalls.filter(call => call.page === page).map(call => call.text));
  };
}


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

  it("should not repeat a header row on the pages before it", async () => {
    const pdf = new TestDocument("table/multiple-header-rows.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(multipleHeaderRows);

    expect(() => table.attachTo(pdf)).not.toThrow();
    expect(pdf.bufferedPageRange()).toEqual({ count: 2, start: 0 });

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should repeat every header row that comes before a new page", async () => {
    const pdf = new TestDocument("table/repeated-header-rows.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(repeatedHeaderRows);
    const getTextsByPage = trackTextsByPage(pdf);

    table.attachTo(pdf);

    expect(getTextsByPage()).toEqual([
      ["first header", "column header", "row 1", "row 2", "row 3", "row 4"],
      ["first header", "column header", "row 5", "section header", "row 6", "row 7"],
      ["first header", "column header", "section header", "row 8", "row 9", "row 10"]
    ]);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render a reused header row object like a regular row", async () => {
    const pdf = new TestDocument("table/reused-header-row.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(reusedHeaderRow);

    expect(() => table.attachTo(pdf)).not.toThrow();
    expect(pdf.bufferedPageRange()).toEqual({ count: 2, start: 0 });

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should repeat the header row if it is not the first row", async () => {
    const pdf = new TestDocument("table/header-after-page-break.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(headerAfterPageBreak);
    const getTextsByPage = trackTextsByPage(pdf);

    table.attachTo(pdf);

    expect(getTextsByPage()).toEqual([
      ["before 1", "before 2", "before 3", "before 4"],
      ["before 5", "before 6", "header", "after 1", "after 2"],
      ["header", "after 3", "after 4", "after 5", "after 6"]
    ]);

    await pdf.writeFile();
  });

  it("should move a header row to the next page together with the row after it", async () => {
    const pdf = new TestDocument("table/header-row-at-page-bottom.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(headerRowAtPageBottom);
    const getTextsByPage = trackTextsByPage(pdf);

    table.attachTo(pdf);

    expect(getTextsByPage()).toEqual([
      ["first header", "row 1", "row 2", "row 3", "row 4"],
      ["first header", "second header", "row 5", "row 6"]
    ]);

    await pdf.writeFile();
  });

  it("should not move a header row to a new page if the row after it doesn't fit below it there either", async () => {
    const pdf = new TestDocument("table/header-row-before-tall-row.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(headerRowBeforeTallRow);
    const getTextsByPage = trackTextsByPage(pdf);

    table.attachTo(pdf);

    expect(getTextsByPage()).toEqual([
      ["first header", "row 1", "row 2", "row 3", "second header"],
      ["first header", "second header", "tall row"],
      ["first header", "second header", "row 4"]
    ]);

    await pdf.writeFile();
  });

  it("should repeat the first header row above a later header row that overflows", async () => {
    const pdf = new TestDocument("table/overflowing-second-header-row.pdf", { layout: "landscape", size: "A4" });
    const table = new Table(overflowingSecondHeaderRow);
    const getTextsByPage = trackTextsByPage(pdf);

    table.attachTo(pdf);

    expect(getTextsByPage()).toEqual([
      ["first header", "row 1", "row 2", "row 3", "row 4"],
      ["first header", "second header", "row 5", "row 6"]
    ]);

    await pdf.writeFile();

    expect(pdf.snapshots).toMatchSnapshot();
  });

  it("should render overflowing rows on new pages if the table is attached to a page that has pages after it", async () => {
    const pdf = new TestDocument("table/attach-to-earlier-page.pdf", { layout: "landscape", size: "A4" });
    pdf.addPage({ layout: "landscape", size: "A4" });
    pdf.addPage({ layout: "landscape", size: "A4" });
    pdf.switchToPage(0);

    const table = new Table({
      rows: [
        { columns: [{ text: "header" }], header: true, height: 20 },
        ...Array.from({ length: 3 }, (_, index) => ({ columns: [{ text: `row ${index + 1}` }], height: 250 }))
      ]
    });
    const getTextsByPage = trackTextsByPage(pdf);

    table.attachTo(pdf, 72, 72);

    expect(getTextsByPage()).toEqual([
      ["header", "row 1"],
      [],
      [],
      ["header", "row 2"],
      ["header", "row 3"]
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

  it("should render the same output when the same table is attached multiple times", async () => {
    const firstPdf = new TestDocument("table/attach-first.pdf", { layout: "landscape", size: "A4" });
    const secondPdf = new TestDocument("table/attach-second.pdf", { layout: "landscape", size: "A4" });
    const headerTable = new Table(header);

    headerTable.attachTo(firstPdf);
    headerTable.attachTo(secondPdf);

    await firstPdf.writeFile();
    await secondPdf.writeFile();

    expect(firstPdf.snapshots.length).toBeGreaterThan(1);
    expect(secondPdf.snapshots).toEqual(firstPdf.snapshots);
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
