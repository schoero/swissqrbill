import PDFDocument from "pdfkit";
import svgpath from "svgpath";

export interface PDFTable {
  /** Table rows. */
  rows: Array<PDFRow>;
  /** Width of whole table. */
  width?: number;
  /**  Horizontal start position of the table. */
  x?: number;
  /**  Vertical start position of the table. */
  y?: number
  /**  Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number]
  /** The colors of the border */
  borderColors?: string | [top: string, right?: string, bottom?: string, left?: string];
  /** Cell padding of the table cells. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /**  Font of the text inside the table. */
  font?: string;
  /** Font size of the text inside the table. */
  fontSize?: number;
  /** Font color of texts inside table. */
  fontColor?: string;
  /** Horizontal alignment of texts inside the table */
  align?: "left" | "center" | "right";
  /** Vertical alignment of texts inside the table */
  verticalAlign?: "top" | "middle" | "bottom";
  /**  Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
}
export interface PDFRow {
  /** Table columns. */
  columns: Array<PDFColumn>,
  /** Background color of the row. */
  backgroundColor?: string;
  /** Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColors?: string | [top: string, right?: string, bottom?: string, left?: string];
  /**  Height of the row. */
  height?: number;
  /**  Cell padding of the table cells inside the row. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Font of the text inside the row. */
  font?: string;
  /** Font size of the text inside the row. */
  fontSize?: number
  /** Font color of texts inside the row. */
  fontColor?: string
  /** Horizontal alignment of texts inside the row */
  align?: "left" | "center" | "right";
  /** Vertical alignment of texts inside the row */
  verticalAlign?: "top" | "middle" | "bottom";
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions;
  /** A header row gets inserted automatically on new pages. Only one header row is allowed. */
  header?: boolean;
}

export interface PDFColumn {
  /** Cell text. */
  text: string | number | boolean;
  /** Width of the cell. */
  width?: number
  /**  Width of the borders of the row. */
  border?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** The colors of the border */
  borderColors?: string | [top: string, right?: string, bottom?: string, left?: string];
  /** Cell padding of the table cell. */
  padding?: number | [top: number, right?: number, bottom?: number, left?: number];
  /** Background color of the cell. */
  backgroundColor?: string;
  /** Font of the text inside the cell. */
  font?: string;
  /** Font size of the text inside the cell. */
  fontSize?: number;
  /** Font color of texts inside the cell. */
  fontColor?: string;
  /** Horizontal alignment of the text inside the cell */
  align?: "left" | "center" | "right";
  /** Vertical alignment of the text inside the cell */
  verticalAlign?: "top" | "middle" | "bottom";
  /** Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). */
  textOptions?: PDFKit.Mixins.TextOptions
}

export class ExtendedPDF extends PDFDocument {

  constructor(options?: PDFKit.PDFDocumentOptions) {
    super(options);
  }


  /**
   * Inserts a table to the document.
   *
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
    const tableX = table.x ? table.x : this.x;
    const tableY = table.y ? table.y : this.y;
    const tableWidth = table.width ? table.width : this.page.width - tableX - this.page.margins.right;

    const baseBorder = table.border ? table.border : undefined;
    const baseBorderColors = table.borderColors ? table.borderColors : "#000000";
    const basePadding = table.padding ? table.padding : 0;
    const baseFontSize = table.fontSize ? table.fontSize : 11;
    const baseFontColor = table.fontColor ? table.fontColor : "#000000";
    const baseFont = table.font ? table.font : "Helvetica";
    const baseAlign = table.align ? table.align : undefined;
    const baseVerticalAlign = table.verticalAlign ? table.verticalAlign : "top";

    for(let layer = 0; layer < 3; layer++){ // 3 layers: background, border, text

      let rowY = tableY;
      rowLoop: for(let rowIndex = 0; rowIndex < table.rows.length; rowIndex ++){

        const row = table.rows[rowIndex];
        let rowHeight = row.height ? row.height : 0;

        const amountOfColumns = row.columns.length;
        const columnWidth = tableWidth / amountOfColumns;
        const rowNumber = rowIndex + 1;

        const rowPadding = row.padding ? row.padding : basePadding;
        const rowFillColor = row.backgroundColor ? row.backgroundColor : undefined;
        const rowBorder = row.border ? row.border : baseBorder;
        const rowBorderColors = row.borderColors ? row.borderColors : baseBorderColors;
        const rowFontSize = row.fontSize ? row.fontSize : baseFontSize;
        const rowFont = row.font ? row.font : baseFont;
        const rowFontColor = row.fontColor ? row.fontColor : baseFontColor;
        const rowAlign = row.align ? row.align : baseAlign;
        const rowVerticalAlign = row.verticalAlign ? row.verticalAlign : baseVerticalAlign;


        //-- Move to start position

        this.moveTo(tableX, tableY);


        //-- Draw columns

        let columnX = tableX;
        for(let columnIndex = 0; columnIndex < row.columns.length; columnIndex++){

          const column = row.columns[columnIndex];
          const columnNumber = columnIndex + 1;
          let remainingColumns = row.columns.length;


          //-- Calculate autoWidth

          let widthUsed = 0;
          for(const rowColumn of row.columns){
            if(rowColumn.width !== undefined){
              widthUsed += rowColumn.width;
              remainingColumns --;
            }
          }


          //-- Set properties

          const columnWidth = column.width ? column.width : (tableWidth - widthUsed) / (remainingColumns);
          const columnPadding = column.padding ? column.padding : rowPadding;
          const columnBackgroundColor = column.backgroundColor ? column.backgroundColor : rowFillColor;
          const columnBorder = column.border ? column.border : rowBorder;
          const columnBorderColors = column.borderColors ? column.borderColors : rowBorderColors;
          const columnFontSize = column.fontSize ? column.fontSize : rowFontSize;
          const columnFont = column.font ? column.font : rowFont;
          const columnFontColor = column.fontColor ? column.fontColor : rowFontColor;
          const columnAlign = column.align ? column.align : rowAlign;
          const columnVerticalAlign = column.verticalAlign ? column.verticalAlign : rowVerticalAlign;

          const fillOpacity = columnBackgroundColor === undefined ? 0 : 1;
          const borderOpacity = columnBorderColors === undefined ? 0 : 1;

          this.moveTo(columnX + columnWidth, rowY);


          //-- Apply text options

          const textOptions: PDFKit.Mixins.TextOptions = {
            width: columnWidth,
            lineBreak: true,
            baseline: "middle"
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

          const paddings = this._positionsToObject<number>(columnPadding);
          const textHeight = this.heightOfString(column.text + "", textOptions);


          //-- Calculate row height

          if(textHeight + (paddings.top ?? 0) + (paddings.bottom ?? 0) > rowHeight){
            rowHeight = textHeight + (paddings.top ?? 0) + (paddings.bottom ?? 0);
          }


          //-- Background layer

          if(layer === 0){


            //-- Fill background

            if(columnBackgroundColor !== undefined){
              this.rect(columnX, rowY, columnWidth, rowHeight)
                .fillColor(columnBackgroundColor)
                .fillOpacity(fillOpacity)
                .fill();
            }


            //-- Check for page overflow

            if(rowY + rowHeight >= this.page.height - this.page.margins.bottom){


              //-- Insert new page

              this.addPage();
              rowY = this.y;


              //-- Insert header

              for(const headerRow of table.rows){
                if(headerRow.header === true){
                  table.rows.splice(rowIndex, 0, headerRow, headerRow);
                  continue rowLoop;
                }
              }

            }

          }


          //-- Text layer

          if(layer === 1){

            let textPosY = rowY + (paddings.top ?? 0) + (textHeight / 2);

            if(columnVerticalAlign === "middle"){
              textPosY = rowY + (rowHeight / 2);
            } else if(columnVerticalAlign === "bottom"){
              textPosY = rowY + rowHeight - (paddings.bottom ?? 0) - (textHeight / 2);
            }

            if(textPosY < rowY + (paddings.top ?? 0) + (textHeight / 2)){
              textPosY = rowY + (paddings.top ?? 0) + (textHeight / 2);
            }
            if(textPosY > rowY + rowHeight - (paddings.bottom ?? 0) - (textHeight / 2)){
              textPosY = rowY + rowHeight - (paddings.bottom ?? 0) - (textHeight / 2);
            }

            this.fillColor(columnFontColor)
              .fillOpacity(1);

            this.text(column.text + "", columnX + (paddings.left ?? 0), textPosY, textOptions);

          }


          //-- Border layer

          if(layer === 2){

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

          columnX = columnX + columnWidth;

        }

        rowY = rowY + rowHeight;


        //-- Update position to ensure that the table does not overlap the payment part

        this.x = columnX;
        this.y = rowY;

      }

    }

    return this;

  }


  /**
   * Adds a path to the document on the given position.
   *
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


  private _positionsToObject<T extends string | number>(numberOrPositions: T | [top: T, right?: T, bottom?: T, left?: T]): { top?: T, right?: T, bottom?: T, left?: T } {

    if(typeof numberOrPositions === "number" || typeof numberOrPositions === "string"){
      return {
        top: numberOrPositions,
        right: numberOrPositions,
        bottom: numberOrPositions,
        left: numberOrPositions
      };
    } else {
      return {
        top: numberOrPositions[0],
        right: numberOrPositions[1] ? numberOrPositions[1] : numberOrPositions[0],
        bottom: numberOrPositions[2] ? numberOrPositions[2] : numberOrPositions[0],
        left: numberOrPositions[3] ? numberOrPositions[3] : numberOrPositions[1] ? numberOrPositions[1] : numberOrPositions[0]
      };
    }

  }

}
