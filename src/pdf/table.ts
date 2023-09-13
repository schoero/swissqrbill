export interface PDFTable {
  /** Table rows. */
  rows: PDFRow[];
  /** Horizontal alignment of texts inside the table */
  align?: "center" | "left" | "right";
  /** Background color of the table. */
  backgroundColor?: string;
  /** Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColor?: string | [top: string, right?: string, bottom?: string, left?: string];
  /** Font of the text inside the table. */
  font?: string;
  /** Font size of the text inside the table. */
  fontSize?: number;
  /** Cell padding of the table cells. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Text color of texts inside table. */
  textColor?: string;
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of texts inside the table */
  verticalAlign?: "bottom" | "center" | "top";
  /** Width of whole table. */
  width?: number;
  /** Horizontal start position of the table. */
  x?: number;
  /** Vertical start position of the table. */
  y?: number;
}
export interface PDFRow {
  /** Table columns. */
  columns: PDFColumn[];
  /** Horizontal alignment of texts inside the row */
  align?: "center" | "left" | "right";
  /** Background color of the row. */
  backgroundColor?: string;
  /** Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColor?: string | [top: string, right?: string, bottom?: string, left?: string];
  /** Font of the text inside the row. */
  font?: string;
  /** Font size of the text inside the row. */
  fontSize?: number;
  /** A header row gets inserted automatically on new pages. Only one header row is allowed. */
  header?: boolean;
  /** Height of the row. Overrides minHeight and maxHeight */
  height?: number;
  /** Maximum height of the row */
  maxHeight?: number;
  /** Minimum height of the row */
  minHeight?: number;
  /** Cell padding of the table cells inside the row. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Text color of texts inside the row. */
  textColor?: string;
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of texts inside the row */
  verticalAlign?: "bottom" | "center" | "top";
}

export interface PDFColumn {
  /** Cell text. */
  text: boolean | number | string;
  /** Horizontal alignment of the text inside the cell */
  align?: "center" | "left" | "right";
  /** Background color of the cell. */
  backgroundColor?: string;
  /** Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColor?: string | [top: string, right?: string, bottom?: string, left?: string];
  /** Font of the text inside the cell. */
  font?: string;
  /** Font size of the text inside the cell. */
  fontSize?: number;
  /** Cell padding of the table cell. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Text color of texts inside the cell. */
  textColor?: string;
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of the text inside the cell */
  verticalAlign?: "bottom" | "center" | "top";
  /** Width of the cell. */
  width?: number;
}

export class Table {

  /**
   * Inserts a table to the document.
   * @param data An Object which contains the table information.
   * @returns The Table instance.
   * @example
   * ```ts
   * const table = {
   *   rows: [
   *     {
   *       columns: [
   *         {
   *           text: "Row 1 cell 1"
   *         }, {
   *           text: "Row 1 cell 2"
   *         }, {
   *           text: "Row 1 cell 3"
   *         }
   *       ],
   *       backgroundColor: "#ECF0F1"
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
   * ```
   */
  constructor(private data: PDFTable) {}


  // Hacky workaround to get the current page of the document
  private getCurrentPage(doc: PDFKit.PDFDocument): number {
    const page = doc.page;
    for(let i = doc.bufferedPageRange().start; i < doc.bufferedPageRange().count; i++){
      doc.switchToPage(i);
      if(doc.page === page){
        return i;
      }
    }
    return doc.bufferedPageRange().count;
  }


  /**
   * Attaches the table to a PDFKit document instance.
   * @param doc The PDFKit document instance
   * @returns The Table instance.
   * @throws { Error } Throws an error if no table rows are provided.
   */
  public attachTo(doc: PDFKit.PDFDocument) {

    if(this.data.rows === undefined){
      throw new Error("No table rows provided.");
    }

    doc.options.bufferPages = true;

    const startX = doc.x;

    const amountOfRows = this.data.rows.length;
    const startPage = this.getCurrentPage(doc);
    const tableX = this.data.x ? this.data.x : doc.x;
    const tableY = this.data.y ? this.data.y : doc.y;
    const tableWidth = this.data.width ? this.data.width : doc.page.width - tableX - doc.page.margins.right;

    const tableBackgroundColor = this.data.backgroundColor ? this.data.backgroundColor : undefined;
    const tableBorder = this.data.border ? this.data.border : undefined;
    const tableBorderColors = this.data.borderColor ? this.data.borderColor : "#000000";
    const tablePadding = this.data.padding ? this.data.padding : 0;
    const tableFontSize = this.data.fontSize ? this.data.fontSize : 11;
    const tableTextColor = this.data.textColor ? this.data.textColor : "#000000";
    const tableFont = this.data.font ? this.data.font : "Helvetica";
    const tableAlign = this.data.align ? this.data.align : undefined;
    const tableVerticalAlign = this.data.verticalAlign ? this.data.verticalAlign : "top";

    const autoRowHeights: number[] = [];

    for(let layer = 0; layer < 5; layer++){ // 5 layers: height calculation, page calculation, background, border, text

      // Go back to start page
      doc.switchToPage(startPage);

      // Track position and height
      let rowY = tableY;

      // Render table
      rowLoop: for(let rowIndex = 0; rowIndex < this.data.rows.length; rowIndex++){

        const row = this.data.rows[rowIndex];

        const amountOfColumns = row.columns.length;
        const columnWidth = tableWidth / amountOfColumns;
        const rowNumber = rowIndex + 1;

        // Todo: Add auto height

        const rowHeight = autoRowHeights[rowIndex];
        const minRowHeight = row.minHeight;
        const maxRowHeight = row.maxHeight;
        const rowPadding = row.padding ? row.padding : tablePadding;
        const rowBackgroundColor = row.backgroundColor ? row.backgroundColor : tableBackgroundColor;
        const rowBorder = row.border ? row.border : tableBorder;
        const rowBorderColors = row.borderColor ? row.borderColor : tableBorderColors;
        const rowFontSize = row.fontSize ? row.fontSize : tableFontSize;
        const rowFont = row.font ? row.font : tableFont;
        const rowTextColor = row.textColor ? row.textColor : tableTextColor;
        const rowAlign = row.align ? row.align : tableAlign;
        const rowVerticalAlign = row.verticalAlign ? row.verticalAlign : tableVerticalAlign;

        // Move to start position
        doc.moveTo(tableX, tableY);

        // Draw columns
        let columnX = tableX;
        columnLoop: for(let columnIndex = 0; columnIndex < row.columns.length; columnIndex++){

          const column = row.columns[columnIndex];
          const columnNumber = columnIndex + 1;
          let remainingColumns = row.columns.length;

          // Calculate autoWidth
          let widthUsed = 0;
          for(const rowColumn of row.columns){
            if(rowColumn.width !== undefined){
              widthUsed += rowColumn.width;
              remainingColumns--;
            }
          }

          // Set properties
          const columnWidth = column.width ? column.width : (tableWidth - widthUsed) / remainingColumns;
          const columnPadding = column.padding ? column.padding : rowPadding;
          const columnBackgroundColor = column.backgroundColor ? column.backgroundColor : rowBackgroundColor;
          const columnBorder = column.border ? column.border : rowBorder;
          const columnBorderColors = column.borderColor ? column.borderColor : rowBorderColors;
          const columnFontSize = column.fontSize ? column.fontSize : rowFontSize;
          const columnFont = column.font ? column.font : rowFont;
          const columnTextColor = column.textColor ? column.textColor : rowTextColor;
          const columnAlign = column.align ? column.align : rowAlign;
          const columnVerticalAlign = column.verticalAlign ? column.verticalAlign : rowVerticalAlign;

          const fillOpacity = columnBackgroundColor === undefined ? 0 : 1;
          const borderOpacity = columnBorderColors === undefined ? 0 : 1;
          const paddings = this._positionsToObject<number>(columnPadding);

          doc.moveTo(columnX + columnWidth, rowY);

          // Apply text options
          const textOptions: PDFKit.Mixins.TextOptions = {
            baseline: "middle",
            height: rowHeight !== undefined ? rowHeight - (paddings.top ?? 0) - (paddings.bottom ?? 0) : undefined,
            lineBreak: true,
            width: columnWidth - (paddings.left ?? 0) - (paddings.right ?? 0)
          };

          if(column.textOptions !== undefined){
            Object.assign(textOptions, column.textOptions);
          }

          // Override align
          if(columnAlign !== undefined){
            textOptions.align = columnAlign;
          }

          doc.font(columnFont);
          doc.fontSize(columnFontSize);

          const textHeight = doc.heightOfString(`${column.text}`, textOptions);
          const singleLineHeight = doc.heightOfString("A", textOptions);

          // Calculate auto row height
          if(layer === 0){

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


          // Insert new page before overflowing rows
          if(layer === 1){

            if(rowY + rowHeight >= doc.page.height - doc.page.margins.bottom){
              doc.addPage();
              rowY = doc.y;

              // Insert header
              const headerRow = this.data.rows.find(row => row.header);
              if(headerRow !== undefined){
                this.data.rows.splice(rowIndex, 0, headerRow);
                autoRowHeights.splice(rowIndex, 0, autoRowHeights[this.data.rows.indexOf(headerRow)]);
                rowIndex--;
                continue rowLoop;
              }
            }

          }

          // Switch page before overflowing rows and header rows
          if(layer > 1){
            if(
              !!row.header && rowY !== doc.page.margins.top ||
              rowY + rowHeight >= doc.page.height - doc.page.margins.bottom
            ){
              doc.switchToPage(this.getCurrentPage(doc) + 1);
              doc.x = doc.page.margins.left ?? 0;
              doc.y = doc.page.margins.top ?? 0;
              rowY = doc.y;
            }
          }

          // Background layer
          if(layer === 2){

            // Fill background
            if(columnBackgroundColor !== undefined){
              doc.rect(columnX, rowY, columnWidth, rowHeight)
                .fillColor(columnBackgroundColor)
                .fillOpacity(fillOpacity)
                .fill();
            }

          }

          // Text layer
          if(layer === 3){

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

          // Border layer
          if(layer === 4){

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

    doc.x = startX;

    return this;

  }


  private _positionsToObject<T extends number | string>(numberOrPositions: T | [top: T, right?: T, bottom?: T, left?: T]): { bottom?: T; left?: T; right?: T; top?: T; } {

    if(typeof numberOrPositions === "number" || typeof numberOrPositions === "string"){
      return {
        bottom: numberOrPositions,
        left: numberOrPositions,
        right: numberOrPositions,
        top: numberOrPositions
      };
    } else {
      return {
        bottom: numberOrPositions[2] ? numberOrPositions[2] : numberOrPositions[0],
        left: numberOrPositions[3] ? numberOrPositions[3] : numberOrPositions[1] ? numberOrPositions[1] : numberOrPositions[0],
        right: numberOrPositions[1] ? numberOrPositions[1] : numberOrPositions[0],
        top: numberOrPositions[0]
      };
    }

  }

}
