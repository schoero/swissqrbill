import PDFDocument from "pdfkit";
import svgpath from "svgpath";


export interface PDFTable {
  /**
   * Table rows.
   */
  rows: Array<PDFRow>;
  /**
   * Width of whole table.
   */
  width?: number;
  /**
   * Horizontal start position of the table.
   */
  x?: number;
  /**
   * Vertical start position of the table.
   */
  y?: number;
  /**
   * Cell padding of the table cells.
   */
  padding?: number | [number, number?, number?, number?];
  /**
   * Width of the border lines.
   */
  lineWidth?: number;
  /**
   * Font of the text inside the table.
   */
  font?: string;
  /**
   * Font size of the text inside the table.
   */
  fontSize?: number;
}
export interface PDFRow {
  /**
   * Table columns.
   */
  columns: Array<PDFColumn>;
  /**
   * Background color of the row.
   */
  fillColor?: string;
  /**
   * Border color of the row.
   */
  strokeColor?: string;
  /**
   * Height of the row.
   */
  height?: number;
  /**
   * Cell padding of the table cells inside the row.
   */
  padding?: number | [number, number?, number?, number?];
  /**
   * Font of the text inside the row.
   */
  font?: string;
  /**
   * Font size of the text inside the row.
   */
  fontSize?: number;
  /**
   * A header row gets inserted automatically on new pages. Only one header row is allowed.
   */
  header?: boolean;
}

export interface PDFColumn {
  /**
   * Cell text.
   */
  text: string | number | boolean;
  /**
   * Width of the cell.
   */
  width?: number;
  /**
   * Cell padding of the table cell.
   */
  padding?: number | [number, number?, number?, number?];
  /**
   * Background color of the cell.
   */
  fillColor?: string;
  /**
   * Border color of the cell.
   */
  strokeColor?: string;
  /**
   * Font of the text inside the cell.
   */
  font?: string;
  /**
   * Font size of the text inside the cell.
   */
  fontSize?: number;
  /**
   * Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling).
   */
  textOptions?: PDFKit.Mixins.TextOptions;
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


  /**
   * Draw an image on the given position.
   *
   * @param src - The image file to insert. This can be jpg or png image.
   * @param x - The x position where the image should be inserted.
   * @param y - The y position where the image should be inserted.
   * @param options - The image options.
   * @returns `this`
   */
  public addImage(src: string, x?: number, y?: number, options?: PDFKit.Mixins.ImageOption): PDFKit.PDFDocument {

    this.image(src, x, y, options);

    return this;

  }
}
