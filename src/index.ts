import { parse } from "svg-parser";
import PDFDocument from "pdfkit";
import QRCode from "qrcode-svg";
import svgpath from "svgpath";
import IBAN from "iban";
import fs from "fs";


export namespace SwissQRBill {

  export interface data {
    currency: "CHF" | "EUR",
    creditor: creditor,
    debitor?: debitor
    amount?: number,
    reference?: string,
    message?: string,
    additionalInformation?: string,
    av1?: string,
    av2?: string
  }

  export interface debitor {
    name: string,
    address: string,
    zip: number,
    city: string,
    country: string
    houseNumber?: string | number
  }

  export interface creditor extends debitor {
    account: string,
  }

  export interface options {
    language?: languages,
    size?: size,
    scissors?: boolean,
    autoGenerate?: boolean
  }

  export type size = "A4" | "A6/5";
  export type languages = "DE" | "EN" | "IT" | "FR";


  export class PDF {

    public document: PDFKit.PDFDocument;

    private _size: size = "A6/5";
    private _data: data;
    private _scissors: boolean = true;
    private _language: languages = "DE";
    private _paddingTop: number = 0;
    private _autoGenerate: boolean = true;
    private _referenceType: "QRR" | "SCOR" | "NON" = "NON";

    static translations = {

      DE: {
        paymentPart: "Zahlteil",
        account: "Konto / Zahlbar an",
        reference: "Referenz",
        additionalInformation: "Zusätzliche Informationen",
        furtherInformation: "Weitere Informationen",
        currency: "Währung",
        amount: "Betrag",
        receipt: "Empfangsschein",
        acceptancePoint: "Annahmestelle",
        separate: "Vor der Einzahlung abzutrennen",
        payableBy: "Zahlbar durch",
        payableByName: "Zahlbar durch (Name/Adresse)",
        inFavourOf: "Zugunsten"
      },
      EN: {
        paymentPart: "Payment part",
        account: "Account / Payable to",
        reference: "Reference",
        additionalInformation: "Additional information",
        furtherInformation: "Further information",
        currency: "Currency",
        amount: "Amount",
        receipt: "Receipt",
        acceptancePoint: "Acceptance point",
        separate: "Separate before paying in",
        payableBy: "Payable by",
        payableByName: "Payable by (name/address)",
        inFavourOf: "In favour of"
      },
      IT: {
        paymentPart: "Sezione pagamento",
        account: "Conto / Pagabile a",
        reference: "Riferimento",
        additionalInformation: "Informazioni aggiuntive",
        furtherInformation: "Informazioni supplementari",
        currency: "Valuta",
        amount: "Importo",
        receipt: "Ricevuta",
        acceptancePoint: "Punto di accettazione",
        separate: "Da staccare prima del versamento",
        payableBy: "Pagabile da",
        payableByName: "Pagabile da (nome/indirizzo",
        inFavourOf: "A favore di"
      },
      FR: {
        paymentPart: "Section paiement",
        account: "Compte / Payable à",
        reference: "Référence",
        additionalInformation: "Informations additionnelles",
        furtherInformation: "Informations supplémentaires",
        currency: "Monnaie",
        amount: "Montant",
        receipt: "Récépissé",
        acceptancePoint: "Point de dépôt",
        separate: "A détacher avant le versement",
        payableBy: "Payable par",
        payableByName: "Payable par (nom/adresse)",
        inFavourOf: "En faveur de"
      }
    }


    /**
    * Creates a new PDF.
    *
    * @param {data} data object containing all relevant billing data.
    * @param {string} outputPath string output path for the generated PDF file.
    * @param {options} [options] object containing settings, optional.
    * @memberof PDF
    * @returns an instance of SwissQRBill.PDF
    */

    constructor(data: data, outputPath: string, options?: options){

      if(data === undefined || typeof data !== "object"){
        throw new Error("You must provide an object as billing data.");
      }

      if(outputPath === undefined || typeof outputPath !== "string"){
        throw new Error("You must provide a string as an output path.");
      }

      this._data = data;

      this._cleanData();
      this._validateData();


      //-- Validate reference

      if(this._isQRIBAN(this._data.creditor.account)){
        if(this._data.reference !== undefined){
          if(this._isQRReference(this._data.reference)){
            this._referenceType = "QRR";
          }
        }
      } else {

        if(this._data.reference === undefined){
          this._referenceType = "NON";
        } else {
          if(!this._isQRReference(this._data.reference)){
            this._referenceType = "SCOR";
          }
        }

      }


      if(options !== undefined){
        if(options.language !== undefined){
          this._language = options.language;
        }
        if(options.size !== undefined){
          this._paddingTop = options.size === "A4" ? 192 : 0;
          this._size = options.size;
        }
        if(options.scissors !== undefined){
          this._scissors = options.scissors;
        }
        if(options.autoGenerate !== undefined){
          this._autoGenerate = options.autoGenerate;
        }
      }

      this.document = new PDFDocument({ autoFirstPage: false });
      this.document.pipe(fs.createWriteStream(outputPath));

      this.document.info.Author = "SwissQRBill";

      this.addPage();

      if(this._autoGenerate === true){

        this.addQRBill();

        this.document.end();

      }

    }


    /**
     * Adds a new page to the PDF.
     *
     * @memberof PDF
     */

    public addPage(): void {
      this.document.addPage({
        margin: 0,
        layout: this._size === "A4" ? "portrait" : "landscape",
        size: this._size === "A4" ? this._size : [this.mmToPoints(105), this.mmToPoints(210)]
      });
    }


    /**
     * Finalizes the PDF document, after this command you are no longer able to edit the PDF.
     * This function is automatically called when the option autoGenerate is set to true.
     *
     * @memberof PDF
     */

    public end(): void {
      this.document.end();
    }


    /**
     * Adds the QR Bill to the bottom of the current page.
     * This function is automatically called when the option autoGenerate is set to true.
     *
     * @memberof PDF
     */

    public addQRBill(): void {

      this._drawOutlines();
      this._drawReceipt();
      this._drawPaymentPart();

    }


    /**
     * Draws the cutting lines to the the PDF.
     *
     * @memberof PDF
     */

    private _drawOutlines(): void {


      //-- Horizontal line

      if(this._size === "A4"){

        this.document.moveTo(0, this.mmToPoints(this._paddingTop))
          .lineTo(this.mmToPoints(210), this.mmToPoints(this._paddingTop))
          .lineWidth(.75)
          .dash(1, { size: 1 })
          .strokeColor("black")
          .stroke();

      }


      //-- Vertical line

      this.document.moveTo(this.mmToPoints(62), this.mmToPoints(this._paddingTop))
        .lineTo(this.mmToPoints(62), this.mmToPoints(this._paddingTop + 105))
        .lineWidth(.75)
        .dash(1, { size: 1 })
        .strokeColor("black")
        .stroke();

      if(this._scissors === true){

        let scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
        let scissorsCenter = "M1.803 4.545C2.388 4.06 2.368 3.185 2.116 2.531l-1.539 -4.106c0.653 -1.194 0.466 -2.374 0.784 -2.374c0.249 0 0.194 0.228 0.842 0.194c0.622 -0.033 1.082 -0.682 1.041 -1.295c0.004 -0.614 -0.467 -1.25 -1.115 -1.255c-0.653 -0.046 -1.26 0.504 -1.303 1.153c-0.113 0.761 0.348 2.109 -0.785 2.741c-0.869 -0.471 -0.872 -1.307 -0.828 -2.063c0.036 -0.627 -0.144 -1.381 -0.76 -1.68c-0.591 -0.289 -1.432 -0.006 -1.613 0.658c-0.246 0.67 0.065 1.59 0.835 1.75c0.594 0.123 0.873 -0.298 1.089 -0.136c0.163 0.122 0.068 0.895 0.687 2.274L-2.117 2.838C-2.273 3.4 -2.268 4.087 -1.716 4.584L0.027 -0.026L1.803 4.545zm0.95 -9.154c-0.361 0.647 -1.342 0.594 -1.532 -0.078c-0.212 -0.608 0.379 -1.386 1.039 -1.192c0.541 0.114 0.74 0.827 0.493 1.27zm-4.009 0.028c-0.249 0.675 -1.392 0.561 -1.546 -0.126c-0.158 -0.456 0.069 -1.107 0.606 -1.153c0.653 -0.089 1.242 0.678 0.94 1.279z";

        if(this._size === "A4"){

          scissorsTop = svgpath(scissorsTop)
            .translate(this.mmToPoints(105), this.mmToPoints(this._paddingTop))
            .toString();

          this.document.path(scissorsTop)
            .fillColor("black")
            .fill();

        }

        scissorsCenter = svgpath(scissorsCenter)
          .translate(this.mmToPoints(62), this.mmToPoints(this._paddingTop)+ 30)
          .toString();

        this.document.path(scissorsCenter)
          .fillColor("black")
          .fill();

      } else {

        if(this._size === "A4"){

          this.document.fontSize(11);
          this.document.font("Helvetica");
          this.document.text(PDF.translations[this._language].separate, this.mmToPoints(0), this.mmToPoints(this._paddingTop) - 12, {
            width: this.mmToPoints(210),
            align: "center",
          });

        }
      }

    }


    /**
     * Draws the receipt section of the bill to the the PDF.
     *
     * @private
     * @memberof PDF
     */

    private _drawReceipt(): void {

      this.document.fontSize(11);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].receipt, this.mmToPoints(5), this.mmToPoints(this._paddingTop + 5), {
        width: this.mmToPoints(52),
        align: "left",
      });

      this.document.fontSize(6);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].account, this.mmToPoints(5), this.mmToPoints(this._paddingTop + 12), {
        width: this.mmToPoints(52)
      });


      //-- Creditor

      this.document.fontSize(8);
      this.document.font("Helvetica");
      this.document.text(`${this._formatIBAN(this._data.creditor.account)??this._data.creditor.account}\n${this._formatAddress(this._data.creditor)}`, {
        width: this.mmToPoints(52)
      });

      this.document.moveDown();


      //-- Reference

      if(this._data.reference !== undefined){

        this.document.fontSize(6);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].reference, {
          width: this.mmToPoints(52)
        });

        this.document.fontSize(8);
        this.document.font("Helvetica");
        this.document.text(this._formatReference(this._data.reference), {
          width: this.mmToPoints(52)
        });

      }


      //-- Debitor

      if(this._data.debitor !== undefined){

        this.document.fontSize(9);
        this.document.moveDown();

        this.document.fontSize(6);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].payableBy, {
          width: this.mmToPoints(52)
        });

        this.document.fontSize(8);
        this.document.font("Helvetica");
        this.document.text(this._formatAddress(this._data.debitor), {
          width: this.mmToPoints(52)
        });

      } else {

        this.document.fontSize(9);
        this.document.moveDown();

        this.document.fontSize(6);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].payableByName, {
          width: this.mmToPoints(52)
        });


        //-- Draw rectangle

        const posY = this._data.reference === undefined ? 38 : 43;

        this._drawRectangle(5, posY, 52, 20);

      }


      this.document.fontSize(6);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].currency, this.mmToPoints(5), this.mmToPoints(this._paddingTop + 68), {
        width: this.mmToPoints(15)
      });

      this.document.text(PDF.translations[this._language].amount, this.mmToPoints(20), this.mmToPoints(this._paddingTop + 68), {
        width: this.mmToPoints(37)
      });

      this.document.fontSize(8);
      this.document.font("Helvetica");
      this.document.text(this._data.currency, this.mmToPoints(5), this.mmToPoints(this._paddingTop + 71), {
        width: this.mmToPoints(15)
      });

      if(this._data.amount !== undefined){
        this.document.text(this._formatAmount(this._data.amount), this.mmToPoints(20), this.mmToPoints(this._paddingTop + 71), {
          width: this.mmToPoints(37)
        });
      } else {
        this._drawRectangle(30, 68, 30, 10);
      }

      this.document.fontSize(6);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].acceptancePoint, this.mmToPoints(5), this.mmToPoints(this._paddingTop + 82), {
        width: this.mmToPoints(52),
        align: "right",
      });

    }


    /**
     *  Draws the payment part to the the PDF.
     *
     * @private
     * @memberof PDF
     */

    private _drawPaymentPart(): void {

      this.document.fontSize(11);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].paymentPart, this.mmToPoints(67), this.mmToPoints(this._paddingTop + 5), {
        width: this.mmToPoints(51),
        align: "left",
      });

      this._generateQRCode();

      this.document.fillColor("black");

      this.document.fontSize(8);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].currency, this.mmToPoints(67), this.mmToPoints(this._paddingTop + 68), {
        width: this.mmToPoints(15)
      });

      this.document.text(PDF.translations[this._language].amount, this.mmToPoints(87), this.mmToPoints(this._paddingTop + 68), {
        width: this.mmToPoints(36)
      });

      this.document.fontSize(10);
      this.document.font("Helvetica");
      this.document.text(this._data.currency, this.mmToPoints(67), this.mmToPoints(this._paddingTop + 72), {
        width: this.mmToPoints(15)
      });

      if(this._data.amount !== undefined){
        this.document.text(this._formatAmount(this._data.amount), this.mmToPoints(87), this.mmToPoints(this._paddingTop + 72), {
          width: this.mmToPoints(36)
        });
      } else {
        this._drawRectangle(80, 72, 40, 15);
      }


      //-- AV1 and AV2

      if(this._data.av1 !== undefined){
        this.document.fontSize(7);
        this.document.font("Helvetica-Bold");
        this.document.text("Name AV1:", this.mmToPoints(67), this.mmToPoints(this._paddingTop + 90), {
          width: this.mmToPoints(15)
        });

        this.document.fontSize(7);
        this.document.font("Helvetica");
        this.document.text((this._data.av1.length > 87 ? this._data.av1.substr(0, 87) + "..." : this._data.av1), this.mmToPoints(81), this.mmToPoints(this._paddingTop + 90), {
          width: this.mmToPoints(37)
        });
      }

      if(this._data.av2 !== undefined){
        this.document.fontSize(7);
        this.document.font("Helvetica-Bold");
        this.document.text("Name AV2:", this.mmToPoints(67), this.mmToPoints(this._paddingTop + 93), {
          width: this.mmToPoints(15)
        });

        this.document.fontSize(7);
        this.document.font("Helvetica");
        this.document.text((this._data.av2.length > 87 ? this._data.av2.substr(0, 87) + "..." : this._data.av2), this.mmToPoints(81), this.mmToPoints(this._paddingTop + 93), {
          width: this.mmToPoints(37)
        });
      }

      this.document.fontSize(8);
      this.document.font("Helvetica-Bold");
      this.document.text(PDF.translations[this._language].account, this.mmToPoints(118), this.mmToPoints(this._paddingTop + 5), {
        width: this.mmToPoints(87)
      });

      this.document.fontSize(10);
      this.document.font("Helvetica");
      this.document.text(`${this._formatIBAN(this._data.creditor.account)??this._data.creditor.account}\n${this._formatAddress(this._data.creditor)}`, this.mmToPoints(118), this.mmToPoints(this._paddingTop + 9.5), {
        width: this.mmToPoints(87)
      });

      this.document.moveDown();

      if(this._data.reference !== undefined){

        this.document.fontSize(8);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].reference, {
          width: this.mmToPoints(87)
        });

        this.document.fontSize(10);
        this.document.font("Helvetica");
        this.document.text(this._formatReference(this._data.reference), {
          width: this.mmToPoints(87)
        });

        this.document.moveDown();

      }


      //-- Additional information

      if(this._data.additionalInformation !== undefined){

        this.document.fontSize(8);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].additionalInformation, {
          width: this.mmToPoints(87)
        });

        this.document.fontSize(10);
        this.document.font("Helvetica");
        this.document.text(this._data.additionalInformation, {
          width: this.mmToPoints(87)
        });

        this.document.moveDown();

      }

      if(this._data.debitor !== undefined){

        this.document.fontSize(8);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].payableBy, {
          width: this.mmToPoints(87)
        });

        this.document.fontSize(10);
        this.document.font("Helvetica");
        this.document.text(this._formatAddress(this._data.debitor), {
          width: this.mmToPoints(87)
        });

      } else {

        this.document.fontSize(8);
        this.document.font("Helvetica-Bold");
        this.document.text(PDF.translations[this._language].payableByName, {
          width: this.mmToPoints(87)
        });

        const posY = this._data.reference === undefined ? 34 : 45;

        this._drawRectangle(118, posY, 65, 25);

      }
    }


    /**
     * Validates the billing data
     *
     * @private
     * @memberof PDF
     */

    private _validateData(){


      //-- Creditor

      if(this._data.creditor === undefined){ throw new Error("Creditor cannot be undefined."); }


      //-- Creditor account

      if(this._data.creditor.account === undefined){
        throw new Error("You must provide an IBAN or QR-IBAN number.");
      }

      if(this._data.creditor.account.replace(/ /g, "").length !== 21){
        throw new Error(`The provided IBAN number '${this._data.creditor.account}' is either too long or too short.`);
      }

      if(IBAN.isValid(this._data.creditor.account) === false){
        throw new Error(`The provided IBAN number '${this._data.creditor.account}' is not valid.`);
      }

      if(this._data.creditor.account.substr(0, 2) !== "CH" && this._data.creditor.account.substr(0, 2) !== "LI"){
        throw new Error("Only CH and LI IBAN numbers are allowed.");
      }


      //-- Validate reference

      if(this._isQRIBAN(this._data.creditor.account)){

        if(this._data.reference === undefined){
          throw new Error("If there is no reference, a conventional IBAN must be used.");
        }

        if(this._isQRReference(this._data.reference)){
          this._referenceType = "QRR";
        } else {
          throw new Error("QR reference requires the use of a QR-IBAN (and vice versa).");
        }

      } else {

        if(this._data.reference === undefined){
          this._referenceType = "NON";
        } else {
          if(this._isQRReference(this._data.reference)){
            throw new Error("Creditor Reference requires the use of a conventional IBAN.");
          } else {
            this._referenceType = "SCOR";
          }
        }

      }


      //-- Creditor name

      if(this._data.creditor.name === undefined){ throw new Error("Creditor name cannot be undefined."); }
      if(typeof this._data.creditor.name !== "string"){ throw new Error("Creditor name must be a string."); }
      if(this._data.creditor.name.length > 70){ throw new Error("Creditor name must be a maximum of 70 characters."); }


      //-- Creditor Address

      if(this._data.creditor.address === undefined){ throw new Error("Creditor address cannot be undefined."); }
      if(typeof this._data.creditor.address !== "string"){ throw new Error("Creditor address must be a string."); }
      if(this._data.creditor.address.length > 70){ throw new Error("Creditor address must be a maximum of 70 characters."); }


      //-- Creditor houseNumber

      if(this._data.creditor.houseNumber !== undefined){
        if(typeof this._data.creditor.houseNumber !== "string" && typeof this._data.creditor.houseNumber !== "number"){ throw new Error("Debitor houseNumber must be either a string or a number."); }
        if(this._data.creditor.houseNumber.toString().length > 16){ throw new Error("Creditor houseNumber can be a maximum of 16 characters.");}
      }


      //-- Creditor Zip

      if(this._data.creditor.zip === undefined){ throw new Error("Creditor zip cannot be undefined."); }
      if(typeof this._data.creditor.zip !== "number"){ throw new Error("Creditor zip must be a number."); }
      if(this._data.creditor.zip.toString().length > 16){ throw new Error("Creditor zip must be a maximum of 16 characters."); }


      //-- Creditor city

      if(this._data.creditor.city === undefined){ throw new Error("Creditor city cannot be undefined."); }
      if(typeof this._data.creditor.city !== "string"){ throw new Error("Creditor city must be a string."); }
      if(this._data.creditor.city.length > 35){ throw new Error("Creditor city must be a maximum of 35 characters."); }


      //-- Creditor country

      if(this._data.creditor.country === undefined){ throw new Error("Creditor country cannot be undefined."); }
      if(typeof this._data.creditor.country !== "string"){ throw new Error("Creditor country must be a string."); }
      if(this._data.creditor.country.length !== 2){ throw new Error("Creditor country must be 2 characters."); }


      //-- Amount

      if(this._data.amount !== undefined){
        if(typeof this._data.amount !== "number"){ throw new Error("Amount must be a number."); }
        if(this._data.amount.toString().length > 12){ throw new Error("Amount must be a maximum of 12 digits."); }
      }


      //-- Currency

      if(this._data.currency === undefined){ throw new Error("Currency cannot be undefined."); }
      if(typeof this._data.currency !== "string"){ throw new Error("Currency must be a string."); }
      if(this._data.currency.length !== 3){ throw new Error("Currency must be a length of 3 characters."); }
      if(this._data.currency !== "CHF" && this._data.currency !== "EUR"){ throw new Error("Currency must be either 'CHF' or 'EUR'"); }


      //-- Debitor

      if(this._data.debitor !== undefined){


        //-- Debitor name

        if(this._data.debitor.name === undefined){ throw new Error("Debitor name cannot be undefined if the debitor object is available."); }
        if(typeof this._data.debitor.name !== "string"){ throw new Error("Debitor name must be a string."); }
        if(this._data.debitor.name.length > 70){ throw new Error("Debitor name must be a maximum of 70 characters."); }


        //-- Debitor address

        if(this._data.debitor.address === undefined){ throw new Error("Debitor address cannot be undefined if the debitor object is available."); }
        if(typeof this._data.debitor.address !== "string"){ throw new Error("Debitor address must be a string."); }
        if(this._data.debitor.address.length > 70){ throw new Error("Debitor address must be a maximum of 70 characters.");}


        //-- Debitor houseNumber

        if(this._data.debitor.houseNumber !== undefined){
          if(typeof this._data.debitor.houseNumber !== "string" && typeof this._data.debitor.houseNumber !== "number"){ throw new Error("Debitor house number must be either a string or a number."); }
          if(this._data.debitor.houseNumber.toString().length > 16){ throw new Error("Debitor house number can be a maximum of 16 characters."); }
        }


        //-- Debitor zip

        if(this._data.debitor.zip === undefined){ throw new Error("Debitor zip cannot be undefined if the debitor object is available."); }
        if(typeof this._data.debitor.zip !== "number"){ throw new Error("Debitor zip must be a number."); }
        if(this._data.debitor.zip.toString().length > 16){ throw new Error("Debitor zip must be a maximum of 16 characters."); }


        //-- Debitor city

        if(this._data.debitor.city === undefined){ throw new Error("Debitor city cannot be undefined if the debitor object is available."); }
        if(typeof this._data.debitor.city !== "string"){ throw new Error("Debitor city must be a string."); }
        if(this._data.debitor.city.length > 35){ throw new Error("Debitor city must be a maximum of 35 characters."); }


        //-- Debitor country

        if(this._data.debitor.country === undefined){ throw new Error("Debitor country cannot be undefined if the debitor object is available."); }
        if(typeof this._data.debitor.country !== "string"){ throw new Error("Debitor country must be a string."); }
        if((this._data.debitor.country).length !== 2){ throw new Error("Debitor country must be 2 characters."); }

      }


      //-- Reference

      if(this._data.reference !== undefined){
        if(typeof this._data.reference !== "string"){ throw new Error("Reference name must be a string."); }
        if(this._data.reference.replace(/ /g, "").length > 27){ throw new Error("Reference name must be a maximum of 27 characters."); }
      }


      //-- Message

      if(this._data.message !== undefined){
        if(this._data.message.length > 140){ throw new Error("Message must be a maximum of 140 characters."); }
        if(typeof this._data.message !== "string"){ throw new Error("Message must be a string."); }
      }


      //-- Additional information

      if(this._data.additionalInformation !== undefined){
        if(this._data.additionalInformation.length > 140){ throw new Error("AdditionalInfromation must be a maximum of 140 characters."); }
        if(typeof this._data.additionalInformation !== "string"){ throw new Error("AdditionalInformation must be a string."); }
      }


      //-- AV1

      if(this._data.av1 !== undefined){
        if(this._data.av1.length > 100){ throw new Error("AV1 must be a maximum of 100 characters."); }
        if(typeof this._data.av1 !== "string"){ throw new Error("AV1 must be a string."); }
        if(this._data.av1.substr(0, 5) !== "eBill"){
          throw new Error("AV1 must begin with eBill");
        }
      }


      //-- AV2

      if(this._data.av2 !== undefined){
        if(this._data.av2.length > 100){ throw new Error("AV2 must be a maximum of 100 characters."); }
        if(typeof this._data.av2 !== "string"){ throw new Error("AV2 must be a string."); }
        if(this._data.av2.substr(0, 5) !== "eBill"){
          throw new Error("AV2 must begin with eBill");
        }
      }


    }


    /**
     * Generates the QR Code containing the billing data.
     *
     * @private
     * @memberof PDF
     */

    private _generateQRCode(): void {

      let qrString = "";


      //-- Swiss Payments Code

      qrString += "SPC\n";


      //-- Version

      qrString += "0200\n";


      //-- Coding Type UTF-8

      qrString += "1\n";


      //-- IBAN

      qrString += this._data.creditor.account.replace(/ /g, "")+ "\n" ?? "\n";


      //-- Creditor

      if(this._data.creditor.houseNumber !== undefined){

        // Adress Type
        qrString += "S\n";

        // Name
        qrString += this._data.creditor.name + "\n";

        // Address
        qrString += this._data.creditor.address + "\n";

        // House number
        qrString += this._data.creditor.houseNumber + "\n";

        // Zip
        qrString += this._data.creditor.zip + "\n";

        // City
        qrString += this._data.creditor.city + "\n";

      } else {

        // Adress Type
        qrString += "K\n";

        // Name
        qrString += this._data.creditor.name + "\n";

        // Address
        qrString += this._data.creditor.address + "\n";

        // Zip + city
        if((this._data.creditor.zip + " " + this._data.creditor.city).length > 70){ throw new Error("Creditor zip plus city must be a maximum of 70 characters."); }
        qrString += this._data.creditor.zip + " " + this._data.creditor.city + "\n";

        // Empty zip field
        qrString += "\n";

        // Empty city field
        qrString += "\n";

      }

      qrString += this._data.creditor.country + "\n";


      //-- 7 x empty

      qrString += "\n"; // 1
      qrString += "\n"; // 2
      qrString += "\n"; // 3
      qrString += "\n"; // 4
      qrString += "\n"; // 5
      qrString += "\n"; // 6
      qrString += "\n"; // 7


      //-- Amount

      if(this._data.amount !== undefined){
        qrString += this._data.amount + "\n";
      } else {
        qrString += "\n";
      }


      //-- Currency

      qrString += this._data.currency + "\n";


      //-- Debitor

      if(this._data.debitor !== undefined){
        if(this._data.debitor.houseNumber !== undefined){

          // Address type
          qrString += "S\n";

          // Name
          qrString += this._data.debitor.name + "\n";

          // Address
          qrString += this._data.debitor.address + "\n";

          // House number
          qrString += this._data.debitor.houseNumber + "\n";

          // Zip
          qrString += this._data.debitor.zip + "\n";

          // City
          qrString += this._data.debitor.city + "\n";

        } else {

          // Address type
          qrString += "K\n";

          // Name
          qrString += this._data.debitor.name + "\n";

          // Address
          qrString += this._data.debitor.address + "\n";

          // Zip + city
          if((this._data.debitor.zip + " " + this._data.debitor.city).length > 70){ throw new Error("Debitor zip plus city must be a maximum of 70 characters."); }
          qrString += this._data.debitor.zip + " " + this._data.debitor.city + "\n";

          // Empty field zip
          qrString += "\n";

          // Empty field city
          qrString += "\n";

        }

        // Country
        qrString += this._data.debitor.country + "\n";

      } else {


        // Empty field type
        qrString += "\n";

        // Empty field name
        qrString += "\n";

        // Empty field address
        qrString += "\n";

        // Empty field house number
        qrString += "\n";

        // Empty field zip
        qrString += "\n";

        // Empty field city
        qrString += "\n";

        // Empty field country
        qrString += "\n";

      }


      //-- Reference type

      qrString += this._referenceType + "\n";


      //-- Reference

      if(this._data.reference !== undefined){
        qrString += this._data.reference.replace(/ /g, "") + "\n";
      } else {
        qrString += "\n";
      }


      //-- Unstructured message

      if(this._data.message !== undefined){
        qrString += this._data.message + "\n";
      } else {
        qrString += "\n";
      }

      //-- End Payment Data

      qrString += "EPD" + "\n";


      //-- Additional information

      if(this._data.additionalInformation !== undefined){
        qrString += this._data.additionalInformation + "\n";
      } else {
        qrString += "\n";
      }


      //-- AV1

      if(this._data.av1 !== undefined){
        qrString += this._data.av1 + "\n";
      }

      if(this._data.av2 !== undefined){
        qrString += this._data.av2;
      }


      //-- Create QR Code

      const qrcodeString = new QRCode({
        content: qrString,
        join: true,
        width: this.mmToPoints(46),
        height: this.mmToPoints(46),
        padding: 0,
        ecl: "M"
      }).svg();

      let svgPath = this._getSVGPathFromQRCodeString(qrcodeString);

      if(svgPath === undefined){
        throw new Error("Could not convert svg image to path");
      }

      this.document.moveTo(this.mmToPoints(67), this.mmToPoints(this._paddingTop + 17));

      svgPath = svgpath(svgPath)
        .translate(this.mmToPoints(67), this.mmToPoints(this._paddingTop + 17))
        .toString();


      //-- Black rectangle

      let background = "M18.3 0.7L1.6 0.7 0.7 0.7 0.7 1.6 0.7 18.3 0.7 19.1 1.6 19.1 18.3 19.1 19.1 19.1 19.1 18.3 19.1 1.6 19.1 0.7Z";
      let cross = "M8.3 4H11.6V15H8.3V4Z M4.4 7.9H15.4V11.2H4.4V7.9Z";

      background = svgpath(background)
        .translate(this.mmToPoints(86), this.mmToPoints(this._paddingTop + 36))
        .toString();

      cross = svgpath(cross)
        .translate(this.mmToPoints(86), this.mmToPoints(this._paddingTop + 36))
        .toString();


      this.document.path(svgPath)
        .undash()
        .fillColor("black")
        .fill();

      this.document.path(background)
        .fillColor("black")
        .lineWidth(1.4357)
        .strokeColor("white")
        .fillAndStroke();

      this.document.path(cross)
        .fillColor("white")
        .fill();

    }


    /**
     * Extracts the path data from the generated QR Code.
     *
     * @private
     * @param {string} qrcodeString string containing the generated QR Code.
     * @returns {(string | undefined)} returns a string containing only the path data of the generated QR Code if successfull, undefined otherwise.
     * @memberof PDF
     */

    private _getSVGPathFromQRCodeString(qrcodeString: string): string | undefined {

      const svgObject = parse(qrcodeString);

      if(svgObject.children === undefined){
        return;
      }

      firstChildLoop: for(const firstChild of svgObject.children){
        if(firstChild.type !== "element"){
          continue firstChildLoop;
        }

        secondChildLoop: for(const secondChild of firstChild.children){

          if(typeof secondChild !== "object"){
            continue secondChildLoop;
          }
          if(secondChild.type !== "element"){
            continue secondChildLoop;
          }
          if(secondChild.properties === undefined){
            continue secondChildLoop;
          }
          if(secondChild.properties.d === undefined){
            continue secondChildLoop;
          }
          if(typeof secondChild.properties.d !== "string"){
            continue secondChildLoop;
          }
          return secondChild.properties.d;
        }
      }

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


    /**
     * Formats the address into a string with new lines that can be written to the PDF file.
     *
     * @private
     * @param {(debitor | creditor)} data creditor or debitor object containing the address.
     * @returns {string} string containing the formatted address.
     * @memberof PDF
     */

    private _formatAddress(data: debitor | creditor): string {
      if(data.houseNumber !== undefined) {
        return `${data.name}\n${data.address} ${data.houseNumber}\n${data.zip} ${data.city}`;
      } else {
        return `${data.name}\n${data.address}\n${data.zip} ${data.city}`;
      }
    }


    /**
     * Removes line breaks from user provided data.
     *
     * @private
     * @returns {SwissQRBill.data} object containing the cleaned data.
     * @memberof PDF
     */

    private _cleanData(): void {

      const _cleanObject = (object: object): void => {

        const keys = Object.keys(object);

        for(let k = 0; k < keys.length; k++){
          if(typeof object[keys[k]] === "string"){
            object[keys[k]] = this._removeLinebreaks(object[keys[k]]);
          } else {
            if(typeof object[keys[k]] === "object"){
              _cleanObject(object[keys[k]]);
            }
          }
        }
      };

      _cleanObject(this._data);

    }


    /**
     * Removes \n and \r from the passed string.
     *
     * @private
     * @param {string} data string to be escaped.
     * @returns {string} string without \n and \r.
     * @memberof PDF
     */

    private _removeLinebreaks(data: string): string {
      return data.replace(/\n/g, "").replace(/\r/g, "");
    }


    /**
     * Formats the amount with spaces and decimals.
     *
     * @private
     * @param {number} amount number to be formatted.
     * @returns {string} string containing the formatted amount.
     * @memberof PDF
     */

    private _formatAmount(amount: number): string {

      const amountString = amount.toFixed(2) + "";
      const amountArray = amountString.split(".");

      let formatedAmountWithoutDecimals = "";

      for(let x = amountArray[0].length -1, i= 1; x >= 0; x--, i++){
        formatedAmountWithoutDecimals = amountArray[0][x] + formatedAmountWithoutDecimals;
        if(i === 3){
          formatedAmountWithoutDecimals = " " + formatedAmountWithoutDecimals;
          i = 0;
        }
      }

      return formatedAmountWithoutDecimals + "." + amountArray[1];

    }


    /**
     * Formats the reference layout according to the specifications.
     *
     * @private
     * @param {string} reference string containing the reference to be formated.
     * @returns {string} string containing the formatted reference.
     * @memberof PDF
     */
    private _formatReference(reference: string): string {

      reference = reference.replace(/ /g, "");

      let referenceArray: RegExpMatchArray = [];

      if(this._referenceType === "QRR"){
        const match = reference.split("").reverse().join("").match(/.{1,5}/g);
        if(match !== null){
          referenceArray = match.reverse();
        }
      } else if(this._referenceType === "SCOR"){
        const match = reference.match(/.{1,4}/g);
        if(match !== null){
          referenceArray = match;
        }
      } else {
        return reference;
      }

      return referenceArray.join(" ");

    }


    /**
     * Formats the IBAN number according to the defintions.
     *
     * @private
     * @param {string} iban string containing the IBAN number.
     * @returns {(string | undefined)} string containing the formatted IBAN number if successfull, undefined otherwise.
     * @memberof PDF
     */

    private _formatIBAN(iban: string): string | undefined {

      iban = iban.replace(/ /g, "");

      const ibanArray = iban.replace(/ /g, "").match(/.{1,4}/g);

      if(ibanArray === null){
        return undefined;
      }

      return ibanArray.join(" ");

    }


    /**
     * Checks if the provided IBAN is a QR-IBAN or a normal IBAN.
     *
     * @private
     * @param {string} iban string containing the IBAN to be checked.
     * @returns {boolean} boolean Whether the IBAN is a QR-IBAN or not.
     * @memberof PDF
     */

    private _isQRIBAN(iban: string): boolean {

      const QRIID = iban.substr(4, 5);

      return (+QRIID >= 30000 && +QRIID <= 31999);

    }


    /**
     * Checks if the provided reference matches a QR reference.
     *
     * @private
     * @param {string} reference string containing the reference number.
     * @returns {boolean} boolean if the reference is a QR reference.
     * @memberof PDF
     */

    private _isQRReference(reference: string): boolean {

      reference = reference.replace(/ /g, "");

      if(reference.length === 27){
        if(!isNaN(+reference)){
          return true;
        }
      }

      if(reference.replace(/ /g, "").length <= 25){
        return false;
      }

      throw new Error("Reference is not valid.");

    }


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

    private _drawRectangle(x: number, y: number, width: number, height: number): void {

      const length = 3;

      this.document.moveTo(this.mmToPoints(x + length), this.mmToPoints(this._paddingTop + y))
        .lineTo(this.mmToPoints(x), this.mmToPoints(this._paddingTop + y))
        .lineTo(this.mmToPoints(x), this.mmToPoints(this._paddingTop + y + length))
        .moveTo(this.mmToPoints(x), this.mmToPoints(this._paddingTop + y + height - length))
        .lineTo(this.mmToPoints(x), this.mmToPoints(this._paddingTop + y + height))
        .lineTo(this.mmToPoints(x + length), this.mmToPoints(this._paddingTop + y + height))
        .moveTo(this.mmToPoints(x + width - length), this.mmToPoints(this._paddingTop + y + height))
        .lineTo(this.mmToPoints(x + width), this.mmToPoints(this._paddingTop + y + height))
        .lineTo(this.mmToPoints(x + width), this.mmToPoints(this._paddingTop + y + height - length))
        .moveTo(this.mmToPoints(x + width), this.mmToPoints(this._paddingTop + y + length))
        .lineTo(this.mmToPoints(x + width), this.mmToPoints(this._paddingTop + y))
        .lineTo(this.mmToPoints(x + width - length), this.mmToPoints(this._paddingTop + y))
        .lineWidth(.75)
        .undash()
        .strokeColor("black")
        .stroke();

    }

  }
}