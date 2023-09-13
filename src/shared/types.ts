//-- PDF types

export { PDFColumn, PDFRow, PDFTable } from "../pdf/table.js";

// SwissQRBill types
export type Currency = "CHF" | "EUR";
export type Size = "A4" | "A6" | "A6/5";
export type Languages = "DE" | "EN" | "FR" | "IT";

export interface Data {

  /**
   * Creditor related data.
   */
  creditor: Creditor;

  /**
   * The currency to be used. **3 characters.**
   */
  currency: Currency;

  /**
   * Additional information. **Max 140 characters.**
   *
   * Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment.
   */
  additionalInformation?: string;

  /**
   * The amount. **Max. 12 digits.**
   */
  amount?: number;

  /**
   * Alternative scheme. **Max. 100 characters.**
   *
   * Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
   */
  av1?: string;

  /**
   * Alternative scheme. **Max. 100 characters.**
   *
   * Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
   */
  av2?: string;

  /**
   * Debtor related data.
   */
  debtor?: Debtor;

  /**
   * A message. **Max. 140 characters.**
   *
   * message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference.
   */
  message?: string;

  /**
   * A reference number. **Max 27 characters.**
   *
   * QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
   * Creditor Reference (ISO 11649): Maximum 25 characters.
   */
  reference?: string;
}

export interface Debtor {

  /**
   * Address. **Max 70 characters.**
   */
  address: string;

  /**
   * City. **Max 35 characters.**
   */
  city: string;

  /**
   * Country code. **2 characters.**
   */
  country: string;

  /**
   * Name. **Max. 70 characters.**
   */
  name: string;

  /**
   * Postal code. **Max 16 characters.**
   */
  zip: number | string;

  /**
   * Building number. **Max 16 characters.**
   */
  buildingNumber?: number | string;
}

export interface Creditor extends Debtor {

  /**
   * The IBAN. **21 characters.**
   */
  account: string;
}

export interface QRBillOptions {

  /**
   * The language with which the bill is rendered.
   * @defaultValue `DE`
   */
  language?: Languages;

  /**
   * Whether you want render the outlines. This option may be disabled if you use perforated paper.
   * @defaultValue `true`
   */
  outlines?: boolean;

  /**
   * Whether you want to show the scissors icons or the text `Separate before paying in`.
   *
   * **Warning:** Setting **scissors** to false sets **separate** to true. To disable scissors and separate, you have to set both options to false.
   * @defaultValue `true`
   */
  scissors?: boolean;

  /**
   * Whether you want to show the text `Separate before paying in` rather than the scissors icons.
   *
   * **Warning:** Setting **separate** to true sets **scissors** to false. To disable scissors and separate, you have to set both options to false.
   * @defaultValue `false`
   */
  separate?: boolean;
}

export interface PDFOptions extends QRBillOptions {

  /**
   * Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit.
   * @defaultValue `true`
   */
  autoGenerate?: boolean;

  /**
   * The page size.
   * @defaultValue `"A6"`
   */
  size?: Size;
}

export interface SVGOptions {

  /**
   * The language with which the bill is rendered.
   * @defaultValue `DE`
   */
  language?: Languages;
}
