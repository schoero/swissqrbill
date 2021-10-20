

//-- PDF types

export { PDFTable, PDFRow, PDFColumn } from "../pdf/extended-pdf";


//-- SwissQRBill types

export type Currency = "CHF" | "EUR";
export type Size = "A4" | "A6/5";
export type Languages = "DE" | "EN" | "IT" | "FR";

export interface Data {

  /**
   * `string: "CHF" | "EUR"` *mandatory*, 3 characters.
   *
   * @type {Currency}
   * @memberof Data
   */
  currency: Currency;

  /**
   * `number` *optional*, max. 12 digits.
   *
   * @type {number}
   * @memberof Data
   */
  amount?: number;

  /**
   * `string` *optional*, max 27 characters.
   * > QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
   *   Creditor Reference (ISO 11649): Maximum 25 characters.
   *
   * @type {string}
   * @memberof Data
   */
  reference?: string;

  /**
   * `string` *optional*, max. 140 characters.
   * > message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference.
   *
   * @type {string}
   * @memberof Data
   */
  message?: string;

  /**
   * `string` *optional*, max. 140 characters.
   * > Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment.
   *
   * @type {string}
   * @memberof Data
   */
  additionalInformation?: string;

  /**
   * `string` *optional*, max. 100 characters.
   * > Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
   *
   * @type {string}
   * @memberof Data
   */
  av1?: string;

  /**
   * `string` *optional*, max. 100 characters.
   * > Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
   *
   * @type {string}
   * @memberof Data
   */
  av2?: string;

  /**
   * `object` Creditor related data *mandatory*
   *
   * @type {Creditor}
   * @memberof Data
   */
  creditor: Creditor;


  /**
   * `object` Debtor related data *optional*
   *
   * @type {Debtor}
   * @memberof Data
   */
  debtor?: Debtor;
}

export interface Debtor {

  /**
   * `string` *mandatory*, max. 70 characters.
   *
   * @type {string}
   * @memberof Debtor
   */
  name: string;

  /**
   * `string` *mandatory*, max 70 characters.
   *
   * @type {string}
   * @memberof Debtor
   */
  address: string;

  /**
   * `string | number` *optional*, max 16 characters.
   *
   * @type {(string | number)}
   * @memberof Debtor
   */
  buildingNumber?: string | number;

  /**
   * `number | string` *mandatory*, max 16 characters.
   *
   * @type {(string | number)}
   * @memberof Debtor
   */
  zip: string | number;

  /**
   * `string` *mandatory*, max 35 characters.
   *
   * @type {string}
   * @memberof Debtor
   */
  city: string;

  /**
   * `string` *mandatory*, 2 characters.
   *
   * @type {string}
   * @memberof Debtor
   */
  country: string;
}

export interface Creditor extends Debtor {

  /**
   * `string` IBAN *mandatory*, 21 characters.
   *
   * @type {string}
   * @memberof Creditor
   */
  account: string;
}

export interface PDFOptions {

  /**
   * `string: "DE" | "EN" | "IT" | "FR"`. *default* `"DE"`.
   *
   * @type {Languages}
   * @memberof PDFOptions
   */
  language?: Languages;

  /**
   * `string: "A4" | "A6/5"`. *default* `"A6/5"`.
   *
   * @type {Size}
   * @memberof PDFOptions
   */
  size?: Size;

  /**
   * `boolean`: *default* `true`.
   *  Whether you want to show the scissors icons or the text `Separate before paying in`.
   *  > **Warning:** Setting **scissors** to false sets **separate** to true. To disable scissors and separate, you have to set both options to false.
   *
   * @type {boolean}
   * @memberof PDFOptions
   */
  scissors?: boolean;

  /**
   * `boolean`: *default* `false`.
   *  Whether you want to show the text `Separate before paying in` rather than the scissors icons.
   *  > **Warning:** Setting **separate** to true sets **scissors** to false. To disable scissors and separate, you have to set both options to false.
   *
   * @type {boolean}
   * @memberof PDFOptions
   */
  separate?: boolean;

  /**
   * `boolean`: *default* `true`.
   *  Whether you want render the outlines. This option may be disabled if you use perforated paper.
   *
   * @type {boolean}
   * @memberof PDFOptions
   */
  outlines?: boolean;

  /**
   * `boolean`: *default* `true`.
   *  Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit.
   *
   * @type {boolean}
   * @memberof PDFOptions
   */
  autoGenerate?: boolean;
}

export interface SVGOptions {

  /**
   * `string: "DE" | "EN" | "IT" | "FR"`. *default* `"DE"`.
   *
   * @type {Languages}
   * @memberof SVGOptions
   */
  language?: Languages;
}