export interface Data {

  /**
   * Creditor related data.
   */
  creditor: Creditor;

  /**
   * The currency to be used. **3 characters.**.
   */
  currency: "CHF" | "EUR";

  /**
   * Additional information. **Max 140 characters.**.
   *
   * Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment.
   */
  additionalInformation?: string;

  /**
   * The amount. **Max. 12 digits.**.
   */
  amount?: number;

  /**
   * Alternative scheme. **Max. 100 characters.**.
   *
   * Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf).
   */
  av1?: string;

  /**
   * Alternative scheme. **Max. 100 characters.**.
   *
   * Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf).
   */
  av2?: string;

  /**
   * Debtor related data.
   */
  debtor?: Debtor;

  /**
   * A message. **Max. 140 characters.**.
   *
   * Message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference.
   */
  message?: string;

  /**
   * A reference number. **Max 27 characters.**.
   *
   * QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
   * Creditor Reference (ISO 11649): Maximum 25 characters.
   */
  reference?: string;
}

export interface Debtor {

  /**
   * Address. **Max 70 characters.**.
   */
  address: string;

  /**
   * City. **Max 35 characters.**.
   */
  city: string;

  /**
   * Country code. **2 characters.**.
   */
  country: string;

  /**
   * Name. **Max. 70 characters.**.
   */
  name: string;

  /**
   * Postal code. **Max 16 characters.**.
   */
  zip: number | string;

  /**
   * Building number. **Max 16 characters.**.
   */
  buildingNumber?: number | string;
}

export interface Creditor extends Debtor {

  /**
   * The IBAN. **21 characters.**.
   */
  account: string;
}

interface QRBillOptions {

  /**
   * Font used for the QR-Bill.
   * Fonts other than Helvetica must be registered in the PDFKit document. {@link http://pdfkit.org/docs/text.html#fonts}.
   *
   * @default 'Helvetica'
   * @example
   * ```ts
   * // Register the font
   * pdf.registerFont("Liberation-Sans", "path/to/LiberationSans-Regular.ttf");
   * pdf.registerFont("Liberation-Sans-Bold", "path/to/LiberationSans-Bold.ttf");
   *
   * const qrBill = new SwissQRBill(data, { fontName: "Liberation-Sans" });
   * ```
   */
  fontName?: "Arial" | "Frutiger" | "Helvetica" | "Liberation Sans";

  /**
   * The language with which the bill is rendered.
   *
   * @default `DE`
   */
  language?: "DE" | "EN" | "FR" | "IT";

  /**
   * Whether you want render the outlines. This option may be disabled if you use perforated paper.
   *
   * @default `true`
   */
  outlines?: boolean;

  /**
   * Whether you want to show the scissors icons or the text `Separate before paying in`.
   *
   * **Warning:** Setting **scissors** to false sets **separate** to true. To disable scissors and separate, you have to set both options to false.
   *
   * @default `true`
   */
  scissors?: boolean;
}

export interface PDFOptions extends QRBillOptions {

  /**
   * Whether you want to show the text `Separate before paying in` rather than the scissors icons.
   *
   * **Warning:** Setting **separate** to true sets **scissors** to false. To disable scissors and separate, you have to set both options to false.
   *
   * @default `false`
   */
  separate?: boolean;
}

export interface SVGOptions extends QRBillOptions {

}

export type Language = Exclude<QRBillOptions["language"], undefined>;
export type FontName = Exclude<QRBillOptions["fontName"], undefined>;
export type Currency = Exclude<Data["currency"], undefined>;
