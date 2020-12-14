/// <reference path="../pdfkit.d.ts" />
import PDFDocument from "pdfkit/js/pdfkit.standalone";
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
        addTable(table: PDFTable): PDFKit.PDFDocument;
        addPath(path: string, x: number, y: number): PDFKit.PDFDocument;
    }
}
export = ExtendedPDF;
