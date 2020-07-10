import PDFDocument from "pdfkit";
declare module ExtendedPDF {
    interface PDFTable {
        rows: Array<PDFRow>;
        width?: number;
        x?: number;
        y?: number;
        padding?: number | [number, number?, number?, number?];
        lineWidth?: number;
        font?: string;
        fontSize?: number;
    }
    interface PDFRow {
        columns: Array<PDFColumn>;
        fillColor?: string;
        strokeColor?: string;
        height?: number;
        padding?: number | [number, number?, number?, number?];
        font?: string;
        fontSize?: number;
        header?: boolean;
    }
    interface PDFColumn {
        text: string | number | boolean;
        width?: number;
        padding?: number | [number, number?, number?, number?];
        fillColor?: string;
        strokeColor?: string;
        font?: string;
        fontSize?: number;
        textOptions?: PDFKit.Mixins.TextOptions;
    }
    class PDF extends PDFDocument {
        constructor(options?: PDFKit.PDFDocumentOptions);
        /**
         * Inserts a table to the document
         *
         * @param table table object containing the table data
         */
        addTable(table: PDFTable): PDFKit.PDFDocument;
        addPath(path: string, x: number, y: number): PDFKit.PDFDocument;
        /**
         * Converts milimeters to points which are used in the PDF file.
         *
         * @param {number} mm number containg the millimeters you want to convert to points.
         * @returns {number} number containing the converted millimeters in points.
         * @memberof PDF
         */
        mmToPoints(mm: number): number;
    }
}
export = ExtendedPDF;
