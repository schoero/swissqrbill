/// <reference types="pdfkit" />
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
export declare class Table {
    private data;
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
    constructor(data: PDFTable);
    private getCurrentPage;
    /**
     * Attaches the table to a PDFKit document instance.
     * @param doc The PDFKit document instance
     * @returns The Table instance.
     * @throws { Error } Throws an error if no table rows are provided.
     */
    attachTo(doc: PDFKit.PDFDocument): this;
    private _positionsToObject;
}
