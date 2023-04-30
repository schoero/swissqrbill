import PDFDocument from "pdfkit";
import svgpath from "svgpath";


export interface PDFTable {
  /** Table rows. */
  rows: PDFRow[];
  /** Horizontal alignment of texts inside the table */
  align?: "center" | "left" | "right";
  /**  Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColor?: string | [top: string, right?: string, bottom?: string, left?: string];
  /**  Font of the text inside the table. */
  font?: string;
  /** Font color of texts inside table. */
  fontColor?: string;
  /** Font size of the text inside the table. */
  fontSize?: number;
  /** Cell padding of the table cells. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /**  Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of texts inside the table */
  verticalAlign?: "bottom" | "middle" | "top";
  /** Width of whole table. */
  width?: number;
  /**  Horizontal start position of the table. */
  x?: number;
  /**  Vertical start position of the table. */
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
  /** Font color of texts inside the row. */
  fontColor?: string;
  /** Font size of the text inside the row. */
  fontSize?: number;
  /** A header row gets inserted automatically on new pages. Only one header row is allowed. */
  header?: boolean;
  /**  Height of the row. Overrides minHeight and maxHeight */
  height?: number;
  /** Maximum height of the row */
  maxHeight?: number;
  /** Minimum height of the row */
  minHeight?: number;
  /**  Cell padding of the table cells inside the row. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of texts inside the row */
  verticalAlign?: "bottom" | "middle" | "top";
}

export interface PDFColumn {
  /** Cell text. */
  text: boolean | number | string;
  /** Horizontal alignment of the text inside the cell */
  align?: "center" | "left" | "right";
  /** Background color of the cell. */
  backgroundColor?: string;
  /**  Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColor?: string | [top: string, right?: string, bottom?: string, left?: string];
  /** Font of the text inside the cell. */
  font?: string;
  /** Font color of texts inside the cell. */
  fontColor?: string;
  /** Font size of the text inside the cell. */
  fontSize?: number;
  /** Cell padding of the table cell. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** Vertical alignment of the text inside the cell */
  verticalAlign?: "bottom" | "middle" | "top";
  /** Width of the cell. */
  width?: number;
}

export class ExtendedPDF extends PDFDocument {

  private _currentPage: number = -1;

  constructor(options?: PDFKit.PDFDocumentOptions) {

    super(options);


    //-- Keep track of the current page

    this.on("pageAdded", () => {
      this._currentPage = this.bufferedPageRange().count - 1;
    });

  }


  public get currentPage(): number {
    return this._currentPage;
  }


  public override switchToPage(n: number): PDFKit.PDFPage {
    const page = super.switchToPage(n);
    this._currentPage = n;
    return page;
  }


  /**
   * Inserts a table to the document.
   * @param table - An Object which contains the table information.
   * @returns `this`
   * @example
   * ```
   * const table = {
   *   rows: [
   *     {
   *       fillColor: "#ECF0F1",
   *       columns: [
   *         {
   *           text: "Row 1 cell 1",
   *         }, {
   *           text: "Row 1 cell 2",
   *         }, {
   *           text: "Row 1 cell 3"
   *         }
   *       ]
   *     }, {
   *       columns: [
   *         {
   *           text: "Row 2 cell 1",
   *         }, {
   *           text: "Row 2 cell 2",
   *         }, {
   *           text: "Row 2 cell 3"
   *         }
   *       ]
   *     }
   *   ]
   * };
   * ```
   */
  public addTable(table: PDFTable): PDFKit.PDFDocument {

    if(table.rows === undefined){
      throw new Error("No table rows provided.");
    }

    const amountOfRows = table.rows.length;
    const startPage = this.currentPage;
    const tableX = table.x ? table.x : this.x;
    const tableY = table.y ? table.y : this.y;
    const tableWidth = table.width ? table.width : this.page.width - tableX - this.page.margins.right;

    const baseBorder = table.border ? table.border : undefined;
    const baseBorderColors = table.borderColor ? table.borderColor : "#000000";
    const basePadding = table.padding ? table.padding : 0;
    const baseFontSize = table.fontSize ? table.fontSize : 11;
    const baseFontColor = table.fontColor ? table.fontColor : "#000000";
    const baseFont = table.font ? table.font : "Helvetica";
    const baseAlign = table.align ? table.align : undefined;
    const baseVerticalAlign = table.verticalAlign ? table.verticalAlign : "top";
    const autoRowHeights: number[] = [];

    for(let layer = 0; layer < 5; layer++){ // 5 layers: height calculation, page calculation, background, border, text


      //-- Go back to start page

      this.switchToPage(startPage);


      //-- Track position and height

      let rowY = tableY;


      //-- Render table

      rowLoop: for(let rowIndex = 0; rowIndex < table.rows.length; rowIndex++){

        const row = table.rows[rowIndex];

        const amountOfColumns = row.columns.length;
        const columnWidth = tableWidth / amountOfColumns;
        const rowNumber = rowIndex + 1;

        // Todo: Add auto height

        const rowHeight = autoRowHeights[rowIndex];
        const minRowHeight = row.minHeight;
        const maxRowHeight = row.maxHeight;
        const rowPadding = row.padding ? row.padding : basePadding;
        const rowBackgroundColor = row.backgroundColor ? row.backgroundColor : undefined;
        const rowBorder = row.border ? row.border : baseBorder;
        const rowBorderColors = row.borderColor ? row.borderColor : baseBorderColors;
        const rowFontSize = row.fontSize ? row.fontSize : baseFontSize;
        const rowFont = row.font ? row.font : baseFont;
        const rowFontColor = row.fontColor ? row.fontColor : baseFontColor;
        const rowAlign = row.align ? row.align : baseAlign;
        const rowVerticalAlign = row.verticalAlign ? row.verticalAlign : baseVerticalAlign;


        //-- Move to start position

        this.moveTo(tableX, tableY);


        //-- Draw columns

        let columnX = tableX;
        columnLoop: for(let columnIndex = 0; columnIndex < row.columns.length; columnIndex++){

          const column = row.columns[columnIndex];
          const columnNumber = columnIndex + 1;
          let remainingColumns = row.columns.length;


          //-- Calculate autoWidth

          let widthUsed = 0;
          for(const rowColumn of row.columns){
            if(rowColumn.width !== undefined){
              widthUsed += rowColumn.width;
              remainingColumns--;
            }
          }


          //-- Set properties

          const columnWidth = column.width ? column.width : (tableWidth - widthUsed) / remainingColumns;
          const columnPadding = column.padding ? column.padding : rowPadding;
          const columnBackgroundColor = column.backgroundColor ? column.backgroundColor : rowBackgroundColor;
          const columnBorder = column.border ? column.border : rowBorder;
          const columnBorderColors = column.borderColor ? column.borderColor : rowBorderColors;
          const columnFontSize = column.fontSize ? column.fontSize : rowFontSize;
          const columnFont = column.font ? column.font : rowFont;
          const columnFontColor = column.fontColor ? column.fontColor : rowFontColor;
          const columnAlign = column.align ? column.align : rowAlign;
          const columnVerticalAlign = column.verticalAlign ? column.verticalAlign : rowVerticalAlign;

          const fillOpacity = columnBackgroundColor === undefined ? 0 : 1;
          const borderOpacity = columnBorderColors === undefined ? 0 : 1;
          const paddings = this._positionsToObject<number>(columnPadding);

          this.moveTo(columnX + columnWidth, rowY);


          //-- Apply text options

          const textOptions: PDFKit.Mixins.TextOptions = {
            baseline: "middle",
            height: rowHeight !== undefined ? rowHeight - (paddings.top ?? 0) - (paddings.bottom ?? 0) : undefined,
            lineBreak: true,
            width: columnWidth - (paddings.left ?? 0) - (paddings.right ?? 0)
          };

          if(column.textOptions !== undefined){
            Object.assign(textOptions, column.textOptions);
          }


          //-- Override align

          if(columnAlign !== undefined){
            textOptions.align = columnAlign;
          }

          this.font(columnFont);
          this.fontSize(columnFontSize);

          const textHeight = this.heightOfString(`${column.text}`, textOptions);
          const singleLineHeight = this.heightOfString("A", textOptions);


          //-- Calculate auto row height

          if(layer === 0){
            if(autoRowHeights[rowIndex] === undefined || autoRowHeights[rowIndex] < textHeight + (paddings.top ?? 0) + (paddings.bottom ?? 0)){
              autoRowHeights[rowIndex] = textHeight + (paddings.top ?? 0) + (paddings.bottom ?? 0);
              if(minRowHeight !== undefined && autoRowHeights[rowIndex] < minRowHeight){
                autoRowHeights[rowIndex] = minRowHeight;
              }
              if(maxRowHeight !== undefined && autoRowHeights[rowIndex] > maxRowHeight){
                autoRowHeights[rowIndex] = maxRowHeight;
              }
            }


            //-- Override auto row height

            if(row.height !== undefined){
              autoRowHeights[rowIndex] = row.height;
            }

            if(columnIndex < row.columns.length - 1){
              continue columnLoop;
            } else {
              continue rowLoop;
            }

          }


          //-- Check for page overflow

          if(rowY + rowHeight >= this.page.height - this.page.margins.bottom){


            //-- Insert new page

            if(layer === 1){

              this.addPage();
              rowY = this.y;


              //-- Insert header

              for(const headerRow of table.rows){
                if(headerRow.header === true){
                  table.rows.splice(rowIndex, 0, headerRow);
                  rowIndex--;
                  continue rowLoop;
                }
              }

            } else if(layer > 1){
              this.switchToPage(this.currentPage + 1);
              this.x = this.page.margins.left ?? 0;
              this.y = this.page.margins.top ?? 0;
              rowY = this.y;
            }

          }


          //-- Background layer

          if(layer === 2){


            //-- Fill background

            if(columnBackgroundColor !== undefined){
              this.rect(columnX, rowY, columnWidth, rowHeight)
                .fillColor(columnBackgroundColor)
                .fillOpacity(fillOpacity)
                .fill();
            }

          }


          //-- Text layer

          if(layer === 3){

            let textPosY = rowY;

            if(columnVerticalAlign === "top"){
              textPosY = rowY + (paddings.top ?? 0) + singleLineHeight / 2;
            } else if(columnVerticalAlign === "middle"){
              textPosY = rowY + rowHeight / 2 - textHeight / 2 + singleLineHeight / 2;
            } else if(columnVerticalAlign === "bottom"){
              textPosY = rowY + rowHeight - (paddings.bottom ?? 0) - textHeight + singleLineHeight / 2;
            }

            if(textPosY < rowY + (paddings.top ?? 0) + singleLineHeight / 2){
              textPosY = rowY + (paddings.top ?? 0) + singleLineHeight / 2;
            }

            this.fillColor(columnFontColor)
              .fillOpacity(1);

            this.text(`${column.text}`, columnX + (paddings.left ?? 0), textPosY, textOptions);

          }


          //-- Border layer

          if(layer === 4){

            if(columnBorder !== undefined && columnBorderColors !== undefined){

              const border = this._positionsToObject<number>(columnBorder);
              const borderColor = this._positionsToObject<string>(columnBorderColors);


              //-- Reset styles

              this.undash()
                .lineJoin("miter")
                .lineCap("butt")
                .strokeOpacity(borderOpacity);

              if(border.left && borderColor.left){

                const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;
                const borderTopMargin = border.top ? border.top / 2 : 0;

                this.moveTo(columnX, rowY + rowHeight + borderBottomMargin);
                this.lineTo(columnX, rowY - borderTopMargin)
                  .strokeColor(borderColor.left)
                  .lineWidth(border.left)
                  .stroke();

              }
              if(border.right && borderColor.right){

                const borderTopMargin = border.top ? border.top / 2 : 0;
                const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;

                this.moveTo(columnX + columnWidth, rowY - borderTopMargin);
                this.lineTo(columnX + columnWidth, rowY + rowHeight + borderBottomMargin)
                  .strokeColor(borderColor.right)
                  .lineWidth(border.right)
                  .stroke();

              }
              if(border.top && borderColor.top){

                const borderLeftMargin = border.left ? border.left / 2 : 0;
                const borderRightMargin = border.right ? border.right / 2 : 0;

                this.moveTo(columnX - borderLeftMargin, rowY);
                this.lineTo(columnX + columnWidth + borderRightMargin, rowY)
                  .strokeColor(borderColor.top)
                  .lineWidth(border.top)
                  .stroke();

              }
              if(border.bottom && borderColor.bottom){

                const borderRightMargin = border.right ? border.right / 2 : 0;
                const borderLeftMargin = border.left ? border.left / 2 : 0;

                this.moveTo(columnX + columnWidth + borderRightMargin, rowY + rowHeight);
                this.lineTo(columnX - borderLeftMargin, rowY + rowHeight)
                  .strokeColor(borderColor.bottom)
                  .lineWidth(border.bottom)
                  .stroke();

              }

            }
          }

          columnX += columnWidth;

        }

        rowY += rowHeight;


        //-- Update position to ensure that the table does not overlap the payment part

        this.x = columnX;
        this.y = rowY;

      }

    }

    return this;

  }


  /**
   * Adds a path to the document on the given position.
   * @param path - The path data to insert. This is the same as the `d` attribute of a SVG path.
   * @param x - The x position where the path should be inserted.
   * @param y - The y position where the path should be inserted.
   * @returns `this`
   */
  public addPath(path: string, x: number, y: number): PDFKit.PDFDocument {

    path = svgpath(path)
      .translate(x, y)
      .toString();

    this.path(path);

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
