/// <reference types="pdfkit" />
import ExtendedPDF from "./extended-pdf";
export interface data {
    currency: currency;
    creditor: creditor;
    debtor?: debtor;
    debitor?: debtor;
    amount?: number;
    reference?: string;
    message?: string;
    additionalInformation?: string;
    av1?: string;
    av2?: string;
}
export interface debtor {
    name: string;
    address: string;
    zip: number;
    city: string;
    country: string;
    houseNumber?: string | number;
}
export interface creditor extends debtor {
    account: string;
}
export interface options {
    language?: languages;
    size?: size;
    scissors?: boolean;
    autoGenerate?: boolean;
}
export import PDFTable = ExtendedPDF.PDFTable;
export import PDFRow = ExtendedPDF.PDFRow;
export import PDFColumn = ExtendedPDF.PDFColumn;
export declare type currency = "CHF" | "EUR";
export declare type size = "A4" | "A6/5";
export declare type languages = "DE" | "EN" | "IT" | "FR";
export declare class PDF extends ExtendedPDF.PDF {
    size: size;
    private _data;
    private _scissors;
    private _language;
    private _marginTop;
    private _autoGenerate;
    private _referenceType;
    static translations: {
        DE: {
            paymentPart: string;
            account: string;
            reference: string;
            additionalInformation: string;
            furtherInformation: string;
            currency: string;
            amount: string;
            receipt: string;
            acceptancePoint: string;
            separate: string;
            payableBy: string;
            payableByName: string;
            inFavourOf: string;
        };
        EN: {
            paymentPart: string;
            account: string;
            reference: string;
            additionalInformation: string;
            furtherInformation: string;
            currency: string;
            amount: string;
            receipt: string;
            acceptancePoint: string;
            separate: string;
            payableBy: string;
            payableByName: string;
            inFavourOf: string;
        };
        IT: {
            paymentPart: string;
            account: string;
            reference: string;
            additionalInformation: string;
            furtherInformation: string;
            currency: string;
            amount: string;
            receipt: string;
            acceptancePoint: string;
            separate: string;
            payableBy: string;
            payableByName: string;
            inFavourOf: string;
        };
        FR: {
            paymentPart: string;
            account: string;
            reference: string;
            additionalInformation: string;
            furtherInformation: string;
            currency: string;
            amount: string;
            receipt: string;
            acceptancePoint: string;
            separate: string;
            payableBy: string;
            payableByName: string;
            inFavourOf: string;
        };
    };
    constructor(data: data, options?: options);
    /**
     * Adds a new page
     *
     * @param {PDFKit.PDFDocumentOptions} [options]
     * @returns {PDFKit.PDFDocument}
     * @memberof PDF
     */
    addPage(options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument;
    /**
     * Finalizes the document
     *
     * @returns
     * @memberof PDF
     */
    end(): void;
    /**
     * Adds the QR Bill to the bottom of the current page.
     * This function is automatically called when the option autoGenerate is set to true.
     *
     * @memberof PDF
     */
    addQRBill(): void;
    /**
     * Draws the cutting lines to the the PDF.
     *
     * @memberof PDF
     */
    private _drawOutlines;
    /**
     * Draws the receipt section of the bill to the the PDF.
     *
     * @private
     * @memberof PDF
     */
    private _drawReceipt;
    /**
     *  Draws the payment part to the the PDF.
     *
     * @private
     * @memberof PDF
     */
    private _drawPaymentPart;
    /**
     * Validates the billing data
     *
     * @private
     * @memberof PDF
     */
    private _validateData;
    /**
     * Generates the QR Code containing the billing data.
     *
     * @private
     * @memberof PDF
     */
    private _generateQRCode;
    /**
     * Extracts the path data from the generated QR Code.
     *
     * @private
     * @param {string} qrcodeString string containing the generated QR Code.
     * @returns {(string | undefined)} returns a string containing only the path data of the generated QR Code if successfull, undefined otherwise.
     * @memberof PDF
     */
    private _getSVGPathFromQRCodeString;
    /**
     * Formats the address into a string with new lines that can be written to the PDF file.
     *
     * @private
     * @param {(debtor | creditor)} data creditor or debtor object containing the address.
     * @returns {string} string containing the formatted address.
     * @memberof PDF
     */
    private _formatAddress;
    /**
     * Removes line breaks from user provided data.
     *
     * @private
     * @returns {data} object containing the cleaned data.
     * @memberof PDF
     */
    private _cleanData;
    /**
     * Removes \n and \r from the passed string.
     *
     * @private
     * @param {string} data string to be escaped.
     * @returns {string} string without \n and \r.
     * @memberof PDF
     */
    private _removeLinebreaks;
    /**
     * Formats the amount with spaces and decimals.
     *
     * @private
     * @param {number} amount number to be formatted.
     * @returns {string} string containing the formatted amount.
     * @memberof PDF
     */
    private _formatAmount;
    /**
     * Formats the reference layout according to the specifications.
     *
     * @private
     * @param {string} reference string containing the reference to be formated.
     * @returns {string} string containing the formatted reference.
     * @memberof PDF
     */
    private _formatReference;
    /**
     * Formats the IBAN number according to the defintions.
     *
     * @private
     * @param {string} iban string containing the IBAN number.
     * @returns {(string | undefined)} string containing the formatted IBAN number if successfull, undefined otherwise.
     * @memberof PDF
     */
    private _formatIBAN;
    /**
     * Checks if the provided IBAN is a QR-IBAN or a normal IBAN.
     *
     * @private
     * @param {string} iban string containing the IBAN to be checked.
     * @returns {boolean} boolean Whether the IBAN is a QR-IBAN or not.
     * @memberof PDF
     */
    private _isQRIBAN;
    /**
     * Checks if the provided reference matches a QR reference.
     *
     * @private
     * @param {string} reference string containing the reference number.
     * @returns {boolean} boolean if the reference is a QR reference.
     * @memberof PDF
     */
    private _isQRReference;
    /**
     * Draws a rectangle which is used when data is to be filled in by hand.
     *
     * @private
     * @param {number} x number in millimeters of the x position where the rectangle starts.
     * @param {number} y number in millimeters of the y position where the rectangle starts.
     * @param {number} width number in millimeters of the width of the rectangle.
     * @param {number} height number in millimeters of the height of the rectangle.
     * @memberof PDF
     */
    private _drawRectangle;
}
