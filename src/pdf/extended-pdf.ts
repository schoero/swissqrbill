import PDFDocument from "pdfkit";
import svgpath from "svgpath";


export interface PDFTable {
  /**
   * `Array` of rows *mandatory*
   *
   * @type {Array<PDFRow>}
   * @memberof PDFTable
   */
  rows: Array<PDFRow>;
  /**
   * `number` width of whole table *optional*
   *
   * @type {number}
   * @memberof PDFTable
   */
  width?: number;
  /**
   * `number` horizontal start position of the table *optional*
   *
   * @type {number}
   * @memberof PDFTable
   */
  x?: number;
  /**
   * `number` vertical start position of the table *optional*
   *
   * @type {number}
   * @memberof PDFTable
   */
  y?: number;
  /**
   * `number | [top: number, right: number, bottom: number, left: number]` cell padding of the table cells *optional*
   *
   * @type {(number | [number, number?, number?, number?])}
   * @memberof PDFTable
   */
  padding?: number | [number, number?, number?, number?];
  /**
   * `number` width of the border lines *optional*
   *
   * @type {number}
   * @memberof PDFTable
   */
  lineWidth?: number;
  /**
   * `string` font of the text inside the table *optional*
   *
   * @type {string}
   * @memberof PDFTable
   */
  font?: string;
  /**
   * `number` font size of the text inside the table *optional*
   *
   * @type {number}
   * @memberof PDFTable
   */
  fontSize?: number;
}
export interface PDFRow {
  /**
   * `Array` of columns *mandatory*
   *
   * @type {Array<PDFColumn>}
   * @memberof PDFRow
   */
  columns: Array<PDFColumn>,
  /**
   * `string` background color of the row *optional*
   *
   * @type {string}
   * @memberof PDFRow
   */
  fillColor?: string;
  /**
   * `string` border color of the row *optional*
   *
   * @type {string}
   * @memberof PDFRow
   */
  strokeColor?: string;
  /**
   * `number` height of the row *optional*
   *
   * @type {number}
   * @memberof PDFRow
   */
  height?: number;
  /**
   * `number | [top: number, right: number, bottom: number, left: number]` cell padding of the table cells inside the row *optional*
   *
   * @type {(number | [number, number?, number?, number?])}
   * @memberof PDFRow
   */
  padding?: number | [number, number?, number?, number?];
  /**
   * `string` font of the text inside the row *optional*
   *
   * @type {string}
   * @memberof PDFRow
   */
  font?: string;
  /**
   * `number` font size of the text inside the row *optional*
   *
   * @type {number}
   * @memberof PDFRow
   */
  fontSize?: number;
  /**
   * `boolean` A header row gets inserted automatically on new pages. Only one header row is allowed. *optional*
   *
   * @type {boolean}
   * @memberof PDFRow
   */
  header?: boolean;
}

export interface PDFColumn {
  /**
   * `string | number | boolean` cell text *mandatory*
   *
   * @type {(string | number | boolean)}
   * @memberof PDFColumn
   */
  text: string | number | boolean;
  /**
   * `number` width of the cell *optional*
   *
   * @type {number}
   * @memberof PDFColumn
   */
  width?: number;
  /**
   * `number | [top: number, right: number, bottom: number, left: number]` cell padding of the table cell *optional*
   *
   * @type {(number | [number, number?, number?, number?])}
   * @memberof PDFColumn
   */
  padding?: number | [number, number?, number?, number?];
  /**
   * `string` background color of the cell *optional*
   *
   * @type {string}
   * @memberof PDFColumn
   */
  fillColor?: string;
  /**
   * `string` border color of the cell *optional*
   *
   * @type {string}
   * @memberof PDFColumn
   */
  strokeColor?: string;
  /**
   * `string` font of the text inside the cell *optional*
   *
   * @type {string}
   * @memberof PDFColumn
   */
  font?: string;
  /**
   * `number` font size of the text inside the cell *optional*
   *
   * @type {number}
   * @memberof PDFColumn
   */
  fontSize?: number;
  /**
   * `object` same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling) *optional*
   *
   * @type {PDFKit.Mixins.TextOptions}
   * @memberof PDFColumn
   */
  textOptions?: PDFKit.Mixins.TextOptions
}

export class ExtendedPDF extends PDFDocument {

  constructor(options?: PDFKit.PDFDocumentOptions) {
    super(options);
  }


  /**
   * Inserts a table to the document.
   *
   * @param {PDFTable} table
   * @returns {PDFKit.PDFDocument} `this`
   * @memberof ExtendedPDF
   * @example
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
   */
  public addTable(table: PDFTable): PDFKit.PDFDocument {

    if(table.rows === undefined){
      throw new Error("No table rows provided.");
    }

    const tableX = table.x !== undefined ? table.x : this.x;
    const tableY = table.y !== undefined ? table.y : this.y;
    const tableWidth = table.width !== undefined ? table.width : this.page.width - tableX - this.page.margins.right;
    const amountOfRows = table.rows.length;
    const lineWidth = table.lineWidth !== undefined ? table.lineWidth : 0.3;
    const defaultPadding = 5;
    const basePadding = table.padding !== undefined ? table.padding : defaultPadding;
    const baseFontSize = table.fontSize !== undefined ? table.fontSize : 11;
    const baseFont = table.font !== undefined ? table.font : "Helvetica";

    let rowY = tableY;
    rowLoop: for(let rowIndex = 0; rowIndex < table.rows.length; rowIndex ++){

      const row = table.rows[rowIndex];

      const amountOfColumns = row.columns.length;
      const columnWidth = tableWidth / amountOfColumns;
      const rowNumber = rowIndex + 1;

      let rowHeight = row.height !== undefined ? row.height : 20;
      let padding = row.padding !== undefined ? row.padding : basePadding;
      let fillColor = row.fillColor !== undefined ? row.fillColor : "";
      let strokeColor = row.strokeColor !== undefined ? row.strokeColor : "";
      let fontSize = row.fontSize !== undefined ? row.fontSize : baseFontSize;
      let font = row.font !== undefined ? row.font : baseFont;


      //-- Move to start position

      this.moveTo(tableX, tableY);
      this.lineWidth(lineWidth);


      //-- Draw columns

      let columnX = tableX;
      for(let columnIndex = 0; columnIndex < row.columns.length; columnIndex++){

        const column = row.columns[columnIndex];
        const columnNumber = columnIndex + 1;
        let remainingColumns = row.columns.length;


        //-- Calculate autowidth

        let widthUsed = 0;
        for(const rowColumn of row.columns){
          if(rowColumn.width !== undefined){
            widthUsed += rowColumn.width;
            remainingColumns --;
          }
        }


        //-- Set properties

        const columnWidth = column.width !== undefined ? column.width : (tableWidth - widthUsed) / (remainingColumns);
        padding = column.padding !== undefined ? column.padding : padding;
        fillColor = column.fillColor !== undefined ? column.fillColor : fillColor;
        strokeColor = column.strokeColor !== undefined ? column.strokeColor : strokeColor;
        fontSize = column.fontSize !== undefined ? fontSize = column.fontSize : fontSize;
        font = column.font !== undefined ? font = column.font : font;
        const fillOpacity = fillColor === "" ? 0 : 1;
        const strokeOpacity = strokeColor === "" ? 0 : 1;


        //-- Apply text options

        const textOptions: PDFKit.Mixins.TextOptions = {
          width: columnWidth,
          lineBreak: true,
          baseline: "top"
        };

        if(column.textOptions !== undefined){
          Object.assign(textOptions, column.textOptions);
        }

        this.moveTo(columnX + columnWidth, rowY);

        this.font(font);
        this.fontSize(fontSize);


        //-- Set padding

        let paddings = {
          top: defaultPadding,
          right: defaultPadding,
          bottom: defaultPadding,
          left: defaultPadding
        };

        if(typeof padding === "object"){
          if(padding[0] !== undefined){ paddings.top = padding[0]; }
          if(padding[1] !== undefined){ paddings.right = padding[1]; }
          if(padding[2] !== undefined){ paddings.bottom = padding[2]; }
          if(padding[3] !== undefined){ paddings.left = padding[3]; }
        } else if(typeof padding === "number"){
          paddings = {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding
          };
        }

        const columnHeight = this.heightOfString(column.text + "", textOptions) + paddings.top + paddings.bottom;

        if(columnHeight > rowHeight){
          rowHeight = columnHeight;
        }

        textOptions.height = rowHeight;


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


        //-- Add rectangle

        this.rect(columnX, rowY, columnWidth, rowHeight)
          .fillColor(fillColor)
          .fillOpacity(fillOpacity)
          .strokeOpacity(strokeOpacity)
          .strokeColor(strokeColor)
          .fillAndStroke();


        this.fillColor("black")
          .fillOpacity(1);

        this.text(column.text + "", columnX + paddings.left, rowY + paddings.top, textOptions);

        columnX = columnX + columnWidth;

      }

      rowY = rowY + rowHeight;

    }

    return this;

  }


  /**
   * Adds a path to the document on the given position.
   *
   * @param {string} path `string` The path data to insert. This is the same as the `d` attribute of a SVG path.
   * @param {number} x `number` The x position where the path should be inserted.
   * @param {number} y `number` The y position where the path should be inserted.
   * @returns {PDFKit.PDFDocument} `this`
   * @memberof ExtendedPDF
   */
  public addPath(path: string, x: number, y: number): PDFKit.PDFDocument {

    path = svgpath(path)
      .translate(x, y)
      .toString();

    this.path(path);

    return this;

  }

}
