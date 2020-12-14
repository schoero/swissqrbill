import ExtendedPDF from "./extended-pdf";
import * as utils from "./utils";
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
export import utils = utils;
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
    addPage(options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument;
    end(): void;
    addQRBill(): Promise<void>;
    private _drawOutlines;
    private _drawReceipt;
    private _drawPaymentPart;
    private _validateData;
    private _generateQRCode;
    private _getSVGPathFromQRCodeString;
    mmToPoints(mm: number): number;
    private _formatAddress;
    private _cleanData;
    private _removeLinebreaks;
    private _formatReference;
    private _drawRectangle;
}
