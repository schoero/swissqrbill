/// <reference types="pdfkit" />
import type { Data, QRBillOptions } from "swissqrbill:shared/types";
/**
 * The QRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
 * using the {@link SwissQRBill.attachTo} method.
 */
export declare class SwissQRBill {
    private data;
    private scissors;
    private separate;
    private outlines;
    private language;
    private size;
    private _x;
    private _y;
    constructor(data: Data, options?: QRBillOptions);
    /**
     * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
     * @param doc The PDFKit instance
     * @param xPosition The x position where the QR Bill will be placed.
     * @param yPosition The y position where the QR Bill will be placed.
     */
    attachTo(doc: PDFKit.PDFDocument, xPosition?: number, yPosition?: number): void;
    private getNewPageSize;
    private x;
    private y;
    private render;
    private formatAddress;
    private addRectangle;
    private isSpaceSufficient;
}
