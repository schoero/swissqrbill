import PDFDocument from "pdfkit";
import svgpath from "svgpath";

module ExtendedPDF {

  export interface PDFTable {
    rows: Array<PDFRow>,
    lineWidth?: number,
    width?: number,
    padding?: number,
    x?: number,
    y?: number,
    font?: string,
    fontSize?: number
  }

  export interface PDFRow {
    columns: Array<PDFColumn>,
    fillColor?: string,
    strokeColor?: string,
    height?: number,
    font?: string,
    fontSize?: number
  }

  export interface PDFColumn {
    text: string | number | boolean,
    width?: number,
    fillColor?: string,
    strokeColor?: string,
    color?: string,
    font?: string,
    fontSize?: number,
    textOptions?: PDFKit.Mixins.TextOptions
  }

  export class PDF extends PDFDocument {

    constructor(options?: PDFKit.PDFDocumentOptions){

      super(options);

    }


    public addTable(table: PDFTable): PDFKit.PDFDocument {

      if(table.rows === undefined){
        throw new Error("No table rows provided.");
      }

      const tableX = table.x !== undefined ? table.x : this.x;
      const tableY = table.x !== undefined ? table.x : this.y;
      const tableWidth = table.width !== undefined ? table.width : this.page.width - tableX - this.page.margins.right;
      const amountOfRows = table.rows.length;
      const lineWidth = table.lineWidth !== undefined ? table.lineWidth : 0.3;
      const padding = table.padding !== undefined ? table.padding : 5;
      const baseFontSize = table.fontSize !== undefined ? table.fontSize: 11;
      const baseFont = table.font !== undefined ? table.font: "Helvetica";

      let rowY = tableY;
      table.rows.forEach((row, rowIndex) => {

        const amountOfColumns = row.columns.length;
        const columnWidth = tableWidth / amountOfColumns;
        const rowHeight = row.height !== undefined ? row.height : 20;
        const rowNumber = rowIndex + 1;
        let fillColor = row.fillColor !== undefined ? row.fillColor : "";
        let strokeColor = row.strokeColor !== undefined ? row.strokeColor : "";
        let fontSize = row.fontSize !== undefined ? row.fontSize : baseFontSize;
        let font = row.font !== undefined ? row.font : baseFont;


        //-- Insert new page

        if(rowY >= this.page.height - rowHeight){
          this.addPage();
          rowY = rowHeight;
        }


        //-- Move to start position

        this.moveTo(tableX, tableY);
        this.lineWidth(lineWidth);


        //-- Draw columns

        let columnX = tableX;
        row.columns.forEach((column, columnIndex) => {

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
          fillColor = column.fillColor !== undefined ? column.fillColor : fillColor;
          strokeColor = column.strokeColor !== undefined ? column.strokeColor : strokeColor;
          fontSize = column.fontSize !== undefined ? fontSize = column.fontSize : fontSize;
          font = column.font !== undefined ? font = column.font : font;
          const fillOpacity = fillColor === "" ? 0 : 1;
          const strokeOpacity = strokeColor === "" ? 0 : 1;


          //-- Apply text options

          const textOptions: PDFKit.Mixins.TextOptions = {
            width: columnWidth,
            height: rowHeight,
            baseline: "middle"
          };

          if(column.textOptions !== undefined){
            Object.assign(textOptions, column.textOptions);
          }


          //-- Draw rectangle

          this.rect(columnX, rowY, columnWidth, rowHeight)
            .fillColor(fillColor)
            .fillOpacity(fillOpacity)
            .strokeOpacity(strokeOpacity)
            .strokeColor(strokeColor)
            .fillAndStroke();

          this.moveTo(columnX + columnWidth, rowY);

          this.font(font);
          this.fontSize(fontSize);
          this.fillColor("black")
            .fillOpacity(1)
            .text(column.text + "", columnX + padding, rowY + (padding / 2) + (rowHeight / 2), textOptions);


          columnX = columnX + columnWidth;

        });

        rowY = rowY + rowHeight;

      });

      return this;

    }


    public addPath(path: string, x: number, y: number): PDFKit.PDFDocument {

      path = svgpath(path)
        .translate(x, y)
        .toString();

      this.path(path);

      return this;

    }


    /**
     * Converts milimeters to points which are used in the PDF file.
     *
     * @param {number} mm number containg the millimeters you want to convert to points.
     * @returns {number} number containing the converted millimeters in points.
     * @memberof PDF
     */

    public mmToPoints(mm: number): number {
      return Math.round(mm * 2.83465);
    }


  }

}

export = ExtendedPDF;