export interface PDFTable {
  /** Table rows. */
  rows: PDFRow[];
  /** Horizontal alignment of texts inside the table. */
  align?: "center" | "left" | "right";
  /** Background color of the table. */
  backgroundColor?: string;
  /** The colors of the border. */
  borderColor?: PDFBorderColor;
  /** Width of the borders of the row. */
  borderWidth?: PDFBorderWidth;
  /** Font of the text inside the table. */
  fontName?: string;
  /** Font size of the text inside the table. */
  fontSize?: number;
  /** Cell padding of the table cells. */
  padding?: PDFPadding;
  /** Text color of texts inside table. */
  textColor?: string;
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of texts inside the table. */
  verticalAlign?: "bottom" | "center" | "top";
  /** Width of whole table. */
  width?: number;
  /** Horizontal start position of the table. */
}

export interface PDFRow {
  /** Table columns. */
  columns: PDFColumn[];
  /** Horizontal alignment of texts inside the row. */
  align?: "center" | "left" | "right";
  /** Background color of the row. */
  backgroundColor?: string;
  /** The colors of the border. */
  borderColor?: PDFBorderColor;
  /** Width of the borders of the row. */
  borderWidth?: PDFBorderWidth;
  /** Font of the text inside the row. */
  fontName?: string;
  /** Font size of the text inside the row. */
  fontSize?: number;
  /** A header row gets inserted automatically on new pages. If multiple rows are header rows, all of them that come before a new page get inserted. Header rows are kept on the same page as the row after them. */
  header?: boolean;
  /** Height of the row. Overrides minHeight and maxHeight. */
  height?: number;
  /** Maximum height of the row. */
  maxHeight?: number;
  /** Minimum height of the row. */
  minHeight?: number;
  /** Cell padding of the table cells inside the row. */
  padding?: PDFPadding;
  /** Text color of texts inside the row. */
  textColor?: string;
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of texts inside the row. */
  verticalAlign?: "bottom" | "center" | "top";
}

export interface PDFColumn {
  /** Cell text. */
  text: boolean | number | string;
  /** Horizontal alignment of the text inside the cell. */
  align?: "center" | "left" | "right";
  /** Background color of the cell. */
  backgroundColor?: string;
  /** The colors of the border. */
  borderColor?: PDFBorderColor;
  /** Width of the borders of the row. */
  borderWidth?: PDFBorderWidth;
  /** Font of the text inside the cell. */
  fontName?: string;
  /** Font size of the text inside the cell. */
  fontSize?: number;
  /** Cell padding of the table cell. */
  padding?: PDFPadding;
  /** Text color of texts inside the cell. */
  textColor?: string;
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of the text inside the cell. */
  verticalAlign?: "bottom" | "center" | "top";
  /** Width of the cell. */
  width?: number;
}

/** Can be used to set the color of the border of a table, row or column. */
export type PDFBorderColor =
  | string
  | [top?: string, right?: string, bottom?: string, left?: string]
  | [vertical?: string, horizontal?: string];

/** Can be used to set the width of the border of a table, row or column. */
export type PDFBorderWidth =
  | number
  | [top?: number, right?: number, bottom?: number, left?: number]
  | [vertical?: number, horizontal?: number];

/** Can be used to set the padding of a table cell. */
export type PDFPadding =
  | number
  | [top?: number, right?: number, bottom?: number, left?: number]
  | [vertical?: number, horizontal?: number];

enum TableLayer {
  HeightCalculation,
  PageInjection,
  BackgroundColor,
  Borders,
  Text
}

/**
 * The Table class is used to create tables for PDFKit documents. A table can be attached to any PDFKit document instance
 * using the {@link Table.attachTo} method.
 *
 * @example
 * ```ts
 * const tableData = {
 *   rows: [
 *     {
 *       backgroundColor: "#ECF0F1",
 *       columns: [
 *         {
 *           text: "Row 1 cell 1"
 *         }, {
 *           text: "Row 1 cell 2"
 *         }, {
 *           text: "Row 1 cell 3"
 *         }
 *       ]
 *     }, {
 *       columns: [
 *         {
 *           text: "Row 2 cell 1"
 *         }, {
 *           text: "Row 2 cell 2"
 *         }, {
 *           text: "Row 2 cell 3"
 *         }
 *       ]
 *     }
 *   ]
 * };
 * const pdf = new PDFDocument();
 * const table = new Table(tableData);
 *
 * const stream = createWriteStream("table.pdf");
 *
 * table.attachTo(pdf);
 * pdf.pipe(stream);
 * pdf.end();
 * ```
 */
export class Table {

  /**
   * Creates a new Table instance.
   *
   * @param data The rows and columns for the table.
   * @returns The Table instance.
   */
  constructor(private data: PDFTable) {}


  // Hacky workaround to get the current page of the document
  private getCurrentPage(doc: PDFKit.PDFDocument): number {
    const page = doc.page;
    const { count, start } = doc.bufferedPageRange();
    for(let i = start; i < start + count; i++){
      doc.switchToPage(i);
      if(doc.page === page){
        return i;
      }
    }
    return start + count;
  }


  /**
   * Attaches the table to a PDFKit document instance beginning on the current page. It will create a new page with for
   * every row that no longer fits on a page.
   *
   * @param doc The PDFKit document instance.
   * @param x The horizontal position in points where the table be placed.
   * @param y The vertical position in points where the table will be placed.
   * @throws { Error } Throws an error if no table rows are provided.
   */
  public attachTo(doc: PDFKit.PDFDocument, x: number = doc.x ?? 0, y: number = doc.y ?? 0) {

    if(this.data.rows === undefined){
      throw new Error("No table rows provided.");
    }

    if(!doc.page){
      doc.addPage({ size: "A4" });
    }

    // Buffer pages to be able to create table spanning multiple pages
    doc.options.bufferPages = true;

    const tableX = x;
    const tableY = y;

    const startPage = this.getCurrentPage(doc);

    const tableWidth = this.data.width ? this.data.width : doc.page.width - tableX - doc.page.margins.right;
    const tableBackgroundColor = this.data.backgroundColor ? this.data.backgroundColor : undefined;
    const tableBorder = this.data.borderWidth ? this.data.borderWidth : undefined;
    const tableBorderColors = this.data.borderColor ? this.data.borderColor : "#000000";
    const tablePadding = this.data.padding ? this.data.padding : 0;
    const tableFontSize = this.data.fontSize ? this.data.fontSize : 11;
    const tableTextColor = this.data.textColor ? this.data.textColor : "#000000";
    const tableFont = this.data.fontName ? this.data.fontName : "Helvetica";
    const tableAlign = this.data.align ? this.data.align : undefined;
    const tableVerticalAlign = this.data.verticalAlign ? this.data.verticalAlign : "top";

    // Header rows get inserted for every new page, which must not change the table data for later calls
    const rows = [...this.data.rows];

    // Inserted copies have the header flag too, so they can only be told apart from the original header rows by identity
    const insertedHeaderRows = new Set<PDFRow>();

    // A new page in the PageInjection layer starts with the first of these, so later layers must switch page there
    const pageStartingHeaderRows = new Set<PDFRow>();

    // New pages are appended to the end of the document, which is not the next page if the table starts on an earlier one
    const tablePages = [startPage];

    const autoRowHeights: number[] = [];

    for(let layer: TableLayer = 0; layer < Object.values(TableLayer).length / 2; layer++){

      // Always start on the first page for each layer
      doc.switchToPage(startPage);
      let tablePageIndex = 0;

      // Track position and height
      let rowY = tableY;

      // Render table
      rowLoop: for(let rowIndex = 0; rowIndex < rows.length; rowIndex++){

        const row = rows[rowIndex];

        const rowHeight = autoRowHeights[rowIndex];
        const minRowHeight = row.minHeight;
        const maxRowHeight = row.maxHeight;
        const rowPadding = row.padding ? row.padding : tablePadding;
        const rowBackgroundColor = row.backgroundColor ? row.backgroundColor : tableBackgroundColor;
        const rowBorder = row.borderWidth ? row.borderWidth : tableBorder;
        const rowBorderColors = row.borderColor ? row.borderColor : tableBorderColors;
        const rowFontSize = row.fontSize ? row.fontSize : tableFontSize;
        const rowFont = row.fontName ? row.fontName : tableFont;
        const rowTextColor = row.textColor ? row.textColor : tableTextColor;
        const rowAlign = row.align ? row.align : tableAlign;
        const rowVerticalAlign = row.verticalAlign ? row.verticalAlign : tableVerticalAlign;

        // Move to start position
        doc.moveTo(tableX, tableY);

        let columnX = tableX;

        // Render columns
        columnLoop: for(let columnIndex = 0; columnIndex < row.columns.length; columnIndex++){

          const column = row.columns[columnIndex];

          // Calculate autoWidth
          const { remainingColumns, widthUsed } = row.columns.reduce((acc, column) => {
            if(column.width !== undefined){
              acc.widthUsed += column.width;
              acc.remainingColumns--;
            }
            return acc;
          }, { remainingColumns: row.columns.length, widthUsed: 0 });

          // Set properties
          const columnWidth = column.width ? column.width : (tableWidth - widthUsed) / remainingColumns;
          const columnPadding = column.padding ? column.padding : rowPadding;
          const columnBackgroundColor = column.backgroundColor ? column.backgroundColor : rowBackgroundColor;
          const columnBorder = column.borderWidth ? column.borderWidth : rowBorder;
          const columnBorderColors = column.borderColor ? column.borderColor : rowBorderColors;
          const columnFontSize = column.fontSize ? column.fontSize : rowFontSize;
          const columnFont = column.fontName ? column.fontName : rowFont;
          const columnTextColor = column.textColor ? column.textColor : rowTextColor;
          const columnAlign = column.align ? column.align : rowAlign;
          const columnVerticalAlign = column.verticalAlign ? column.verticalAlign : rowVerticalAlign;

          const fillOpacity = columnBackgroundColor === undefined ? 0 : 1;
          const borderOpacity = columnBorderColors === undefined ? 0 : 1;
          const paddings = this._positionsToObject<number>(columnPadding);

          // Move to column start position
          doc.moveTo(columnX + columnWidth, rowY);

          // Apply text options
          const textOptions: PDFKit.Mixins.TextOptions = {
            ...column.textOptions ?? {},
            align: columnAlign,
            baseline: "middle",
            height: rowHeight !== undefined ? rowHeight - (paddings.top ?? 0) - (paddings.bottom ?? 0) : undefined,
            lineBreak: true,
            width: columnWidth - (paddings.left ?? 0) - (paddings.right ?? 0)
          };

          doc.font(columnFont);
          doc.fontSize(columnFontSize);

          const textHeight = doc.heightOfString(`${column.text}`, textOptions);
          const singleLineHeight = doc.heightOfString("A", textOptions);

          // Render layers
          if(layer === TableLayer.HeightCalculation){

            if(
              autoRowHeights[rowIndex] === undefined ||
              autoRowHeights[rowIndex] < textHeight + (paddings.top ?? 0) + (paddings.bottom ?? 0)
            ){
              autoRowHeights[rowIndex] = textHeight + (paddings.top ?? 0) + (paddings.bottom ?? 0);
              if(minRowHeight !== undefined && autoRowHeights[rowIndex] < minRowHeight){
                autoRowHeights[rowIndex] = minRowHeight;
              }
              if(maxRowHeight !== undefined && autoRowHeights[rowIndex] > maxRowHeight){
                autoRowHeights[rowIndex] = maxRowHeight;
              }
            }

            // Override auto row height
            if(row.height !== undefined){
              autoRowHeights[rowIndex] = row.height;
            }

            if(columnIndex < row.columns.length - 1){
              continue columnLoop;
            } else {
              continue rowLoop;
            }
          }

          // A header row labels all rows after it, so every header row before this row is repeated on a new page
          const repeatedHeaderRowIndexes = insertedHeaderRows.has(row)
            ? []
            : rows.slice(0, rowIndex).flatMap((previousRow, previousRowIndex) => previousRow.header && !insertedHeaderRows.has(previousRow) ? [previousRowIndex] : []);

          // A new page can't make room for a row that doesn't fit on an empty page either, so it stays on the current one.
          // The heights are added in the same order as rowY on a new page, because a different order can round differently
          // and make the row overflow its new page again, adding pages forever.
          const rowYOnEmptyPage = repeatedHeaderRowIndexes.reduce((y, index) => y + autoRowHeights[index], doc.page.margins.top ?? 0);

          // A header row must not be left at the bottom of a page without the rows it labels
          let keptTogetherHeight = rowHeight;
          let keptIndex = rowIndex;
          while(rows[keptIndex].header && !insertedHeaderRows.has(rows[keptIndex])){
            keptIndex++;

            // Inserted copies didn't exist yet when the page breaks were decided, so they must not change the result
            while(keptIndex < rows.length && insertedHeaderRows.has(rows[keptIndex])){
              keptIndex++;
            }

            if(keptIndex >= rows.length){
              break;
            }

            keptTogetherHeight += autoRowHeights[keptIndex];
          }

          // Moving a header row to a new page doesn't help if the rows it labels don't fit below it there either
          const pageBottom = doc.page.height - doc.page.margins.bottom;
          const overflowHeight = rowYOnEmptyPage + keptTogetherHeight < pageBottom ? keptTogetherHeight : rowHeight;
          const rowOverflows = !insertedHeaderRows.has(row) && rowY + overflowHeight >= pageBottom && rowY > rowYOnEmptyPage;

          // Insert new page before overflowing rows
          if(layer === TableLayer.PageInjection){

            if(rowOverflows){

              doc.addPage();
              const { count, start } = doc.bufferedPageRange();
              tablePages.push(start + count - 1);
              rowY = doc.y;

              if(repeatedHeaderRowIndexes.length > 0){
                const insertedRows = repeatedHeaderRowIndexes.map(index => ({ ...rows[index] }));
                const insertedRowHeights = repeatedHeaderRowIndexes.map(index => autoRowHeights[index]);
                insertedRows.forEach(insertedRow => insertedHeaderRows.add(insertedRow));
                pageStartingHeaderRows.add(insertedRows[0]);
                rows.splice(rowIndex, 0, ...insertedRows);
                autoRowHeights.splice(rowIndex, 0, ...insertedRowHeights);
                rowIndex--;
                continue rowLoop;
              }
            }

          }

          // Later layers must break pages exactly where the PageInjection layer added them
          if(layer > TableLayer.PageInjection){
            if(columnIndex === 0 && pageStartingHeaderRows.has(row) || rowOverflows){
              tablePageIndex++;
              doc.switchToPage(tablePages[tablePageIndex]);
              doc.x = tableX;
              doc.y = doc.page.margins.top ?? 0;
              rowY = doc.y;
            }
          }

          if(layer === TableLayer.BackgroundColor){

            // Fill background
            if(columnBackgroundColor !== undefined){
              doc.rect(columnX, rowY, columnWidth, rowHeight)
                .fillColor(columnBackgroundColor)
                .fillOpacity(fillOpacity)
                .fill();
            }

          }

          if(layer === TableLayer.Text){

            let textPosY = rowY;

            if(columnVerticalAlign === "top"){
              textPosY = rowY + (paddings.top ?? 0) + singleLineHeight / 2;
            } else if(columnVerticalAlign === "center"){
              textPosY = rowY + rowHeight / 2 - textHeight / 2 + singleLineHeight / 2;
            } else if(columnVerticalAlign === "bottom"){
              textPosY = rowY + rowHeight - (paddings.bottom ?? 0) - textHeight + singleLineHeight / 2;
            }

            if(textPosY < rowY + (paddings.top ?? 0) + singleLineHeight / 2){
              textPosY = rowY + (paddings.top ?? 0) + singleLineHeight / 2;
            }

            doc.fillColor(columnTextColor)
              .fillOpacity(1);

            doc.text(`${column.text}`, columnX + (paddings.left ?? 0), textPosY, textOptions);

          }

          if(layer === TableLayer.Borders){

            if(columnBorder !== undefined && columnBorderColors !== undefined){

              const border = this._positionsToObject<number>(columnBorder);
              const borderColor = this._positionsToObject<string>(columnBorderColors);

              // Reset styles
              doc.undash()
                .lineJoin("miter")
                .lineCap("butt")
                .strokeOpacity(borderOpacity);

              if(border.left && borderColor.left){

                const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;
                const borderTopMargin = border.top ? border.top / 2 : 0;

                doc.moveTo(columnX, rowY + rowHeight + borderBottomMargin);
                doc.lineTo(columnX, rowY - borderTopMargin)
                  .strokeColor(borderColor.left)
                  .lineWidth(border.left)
                  .stroke();

              }
              if(border.right && borderColor.right){

                const borderTopMargin = border.top ? border.top / 2 : 0;
                const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;

                doc.moveTo(columnX + columnWidth, rowY - borderTopMargin);
                doc.lineTo(columnX + columnWidth, rowY + rowHeight + borderBottomMargin)
                  .strokeColor(borderColor.right)
                  .lineWidth(border.right)
                  .stroke();

              }
              if(border.top && borderColor.top){

                const borderLeftMargin = border.left ? border.left / 2 : 0;
                const borderRightMargin = border.right ? border.right / 2 : 0;

                doc.moveTo(columnX - borderLeftMargin, rowY);
                doc.lineTo(columnX + columnWidth + borderRightMargin, rowY)
                  .strokeColor(borderColor.top)
                  .lineWidth(border.top)
                  .stroke();

              }
              if(border.bottom && borderColor.bottom){

                const borderRightMargin = border.right ? border.right / 2 : 0;
                const borderLeftMargin = border.left ? border.left / 2 : 0;

                doc.moveTo(columnX + columnWidth + borderRightMargin, rowY + rowHeight);
                doc.lineTo(columnX - borderLeftMargin, rowY + rowHeight)
                  .strokeColor(borderColor.bottom)
                  .lineWidth(border.bottom)
                  .stroke();

              }

            }
          }

          columnX += columnWidth;

        }

        rowY += rowHeight;

        // Update position to ensure that the table does not overlap the payment part
        doc.x = columnX;
        doc.y = rowY;

      }

    }

    doc.x = tableX;

  }


  private _positionsToObject<T extends number | string>(numberOrPositions: T | [top?: T, right?: T, bottom?: T, left?: T]): { bottom?: T; left?: T; right?: T; top?: T; } {

    if(typeof numberOrPositions === "number" || typeof numberOrPositions === "string"){
      return {
        bottom: numberOrPositions,
        left: numberOrPositions,
        right: numberOrPositions,
        top: numberOrPositions
      };
    } else {
      return {
        bottom: numberOrPositions[2] !== undefined ? numberOrPositions[2] : numberOrPositions[0],
        left: numberOrPositions[3] !== undefined ? numberOrPositions[3] : numberOrPositions[1],
        right: numberOrPositions[1] !== undefined ? numberOrPositions[1] : undefined,
        top: numberOrPositions[0]
      };
    }

  }

}
