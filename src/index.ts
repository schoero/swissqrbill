import QRCode from "qrcode-svg";
import fs from "fs";
import PDFDocument from "pdfkit";
import { parse } from "svg-parser";
import svgpath from "svgpath";

//https://www.paymentstandards.ch/dam/downloads/style-guide-de.pdf
//https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-de.pdf


const sampleObject: SwissQRBillData = {
  currency: "CHF",
  amount: 729.75,
  reference: "C21 00000 00003 13947 14300 09017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debitor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    country: "CH"
  }
};


interface SwissQRBillData {
  currency: "CHF" | "EUR",
  creditor: SwissQRBillCreditor,
  debitor?: SwissQRBillDebitor
  amount?: number,
  reference?: string,
  message?: string,
  information?: string,
  av1?: string,
  av2?: string
}

interface SwissQRBillDebitor {
  name: string,
  address: string,
  zip: number,
  city: string,
  country: string
  houseNumber?: string
}

interface SwissQRBillCreditor extends SwissQRBillDebitor {
  account: string,
}

interface SwissQRBillOptions {
  language?: SwissQRBillLanguages,
  size: SwissQRBillSize
}

type SwissQRBillSize = "A4" | "A5";
type SwissQRBillLanguages = "DE" | "EN" | "IT" | "FR";


export default class SwissQRBill {

  public document: PDFKit.PDFDocument;

  public size: SwissQRBillSize = "A4";

  private _data: SwissQRBillData;
  private _language: SwissQRBillLanguages = "DE";
  private _paddingTop: number = 192;

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
      reference: "Référence",
      additionalInformation: "Informations additionnelles",
      furtherInformation: "Informations supplémentaires",
      currency: "Monnaie",
      amount: "Montant",
      receipt: "Récépissé",
      acceptancePoint: "Point de dépôt",
      separate: "A détacher avant le versement",
      payableBy: "Payable par",
      payableByName: "Payable par (nom/adresse)",
      inFavourOf: "En faveur de"
    }
  }


  constructor(data: SwissQRBillData, outputPath: string, options?: SwissQRBillOptions){

    this._data = data;

    if(options !== undefined){
      if(options.language !== undefined){
        this._language = options.language;
      }
      if(options.size !== undefined){
        this._paddingTop = options.size === "A4" ? 192 : 0;
        this.size = options.size;
      }
    }

    this.document = new PDFDocument({ autoFirstPage: false });
    this.document.pipe(fs.createWriteStream(outputPath));

    this.document.info.Author = "SwissQRBill";

    this.addPage();

    this.drawQRBill(data);

    this.document.end();

  }


  public addPage() {
    this.document.addPage({
      margin: 0,
      layout: this.size === "A4" ? "portrait" : "landscape",
      size: this.size
    });
  }


  public drawQRBill(data: SwissQRBillData): void {

    this._drawOutlines();

    this._drawReceipt();

    this._drawPaymentPart();

  }


  private _drawOutlines(): void {

    this.document.moveTo(0, this._mmToPoints(this._paddingTop))
      .lineTo(this._mmToPoints(210), this._mmToPoints(this._paddingTop))
      .moveTo(this._mmToPoints(62), this._mmToPoints(this._paddingTop))
      .lineTo(this._mmToPoints(62), this._mmToPoints(this._paddingTop + 105))
      .lineWidth(.75)
      .strokeColor("black")
      .stroke();

  }


  private _drawReceipt(): void {

    this.document.fontSize(11);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].receipt, this._mmToPoints(5), this._mmToPoints(this._paddingTop + 5), {
      width: this._mmToPoints(52),
      align: "left",
    });

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].account, this._mmToPoints(5), this._mmToPoints(this._paddingTop + 12), {
      width: this._mmToPoints(52)
    });


    //-- Creditor

    this.document.fontSize(8);
    this.document.font("Helvetica");
    this.document.text(`${this._data.creditor.account}\n${this._formatAddress(this._data.creditor)}`, {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(9);
    this.document.moveDown();

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].reference, {
      width: this._mmToPoints(52)
    });


    //-- Reference

    if(this._data.reference !== undefined){

      this.document.fontSize(8);
      this.document.font("Helvetica");
      this.document.text(this._data.reference, {
        width: this._mmToPoints(52)
      });

    }


    //-- Debitor

    if(this._data.debitor !== undefined){

      this.document.fontSize(9);
      this.document.moveDown();

      this.document.fontSize(6);
      this.document.font("Helvetica-Bold");
      this.document.text(SwissQRBill.translations[this._language].payableBy, {
        width: this._mmToPoints(52)
      });

      this.document.fontSize(8);
      this.document.font("Helvetica");
      this.document.text(this._formatAddress(this._data.debitor), {
        width: this._mmToPoints(52)
      });

    } else {
      // Todo draw rectangle
    }


    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].currency, this._mmToPoints(5), this._mmToPoints(this._paddingTop + 68), {
      width: this._mmToPoints(15)
    });

    this.document.text(SwissQRBill.translations[this._language].amount, this._mmToPoints(20), this._mmToPoints(this._paddingTop + 68), {
      width: this._mmToPoints(37)
    });

    this.document.fontSize(8);
    this.document.font("Helvetica");
    this.document.text(this._data.currency, this._mmToPoints(5), this._mmToPoints(263), {
      width: this._mmToPoints(15)
    });

    if(this._data.amount !== undefined){
      this.document.text(this._formatAmount(this._data.amount), this._mmToPoints(20), this._mmToPoints(263), {
        width: this._mmToPoints(37)
      });
    } else {
      // Todo draw rectangle
    }

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].acceptancePoint, this._mmToPoints(5), this._mmToPoints(this._paddingTop + 82), {
      width: this._mmToPoints(52),
      align: "right",
    });

  }


  private _drawPaymentPart(): void {

    this.document.fontSize(11);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].paymentPart, this._mmToPoints(67), this._mmToPoints(this._paddingTop + 5), {
      width: this._mmToPoints(51),
      align: "left",
    });

    this._generateQRCode();

    this.document.fillColor("black");

    this.document.fontSize(8);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].currency, this._mmToPoints(67), this._mmToPoints(this._paddingTop + 68), {
      width: this._mmToPoints(15)
    });

    this.document.text(SwissQRBill.translations[this._language].amount, this._mmToPoints(87), this._mmToPoints(this._paddingTop + 68), {
      width: this._mmToPoints(36)
    });

    this.document.fontSize(10);
    this.document.font("Helvetica");
    this.document.text(this._data.currency, this._mmToPoints(67), this._mmToPoints(this._paddingTop + 71), {
      width: this._mmToPoints(15)
    });

    if(this._data.amount !== undefined){
      this.document.text(this._formatAmount(this._data.amount), this._mmToPoints(87), this._mmToPoints(this._paddingTop + 71), {
        width: this._mmToPoints(36)
      });
    }


    //-- AV1 and AV2

    if(this._data.av1 !== undefined){
      this.document.fontSize(7);
      this.document.font("Helvetica-Bold");
      this.document.text("Name AV1:", this._mmToPoints(67), this._mmToPoints(this._paddingTop + 90), {
        width: this._mmToPoints(15)
      });

      this.document.fontSize(7);
      this.document.font("Helvetica");
      this.document.text("UV;UltraPay005;12345:", this._mmToPoints(81), this._mmToPoints(this._paddingTop + 90), {
        width: this._mmToPoints(37)
      });
    }

    if(this._data.av2 !== undefined){
      this.document.fontSize(7);
      this.document.font("Helvetica-Bold");
      this.document.text("Name AV2:", this._mmToPoints(67), this._mmToPoints(this._paddingTop + 93), {
        width: this._mmToPoints(15)
      });

      this.document.fontSize(7);
      this.document.font("Helvetica");
      this.document.text("XY;XYService;54321", this._mmToPoints(81), this._mmToPoints(this._paddingTop + 93), {
        width: this._mmToPoints(37)
      });
    }

    this.document.fontSize(8);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].account, this._mmToPoints(118), this._mmToPoints(this._paddingTop + 5), {
      width: this._mmToPoints(87)
    });

    this.document.fontSize(10);
    this.document.font("Helvetica");
    this.document.text(`${this._data.creditor.account}\n${this._formatAddress(this._data.creditor)}`, this._mmToPoints(118), this._mmToPoints(this._paddingTop + 9.5), {
      width: this._mmToPoints(87)
    });

    this.document.moveDown();

    this.document.fontSize(8);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].reference, {
      width: this._mmToPoints(87)
    });

    this.document.fontSize(10);
    this.document.font("Helvetica");
    this.document.text("21 00000 00003 13947 14300 09017", {
      width: this._mmToPoints(87)
    });

    this.document.moveDown();


    //-- Additional information

    if(this._data.information !== undefined){

      this.document.fontSize(8);
      this.document.font("Helvetica-Bold");
      this.document.text(SwissQRBill.translations[this._language].additionalInformation, {
        width: this._mmToPoints(87)
      });

      this.document.fontSize(10);
      this.document.font("Helvetica");
      this.document.text(this._data.information, {
        width: this._mmToPoints(87)
      });

      this.document.moveDown();

    }

    this.document.fontSize(8);
    this.document.font("Helvetica-Bold");
    this.document.text(SwissQRBill.translations[this._language].payableBy, {
      width: this._mmToPoints(87)
    });

    if(this._data.debitor !== undefined){
      this.document.fontSize(10);
      this.document.font("Helvetica");
      this.document.text(this._formatAddress(this._data.debitor), {
        width: this._mmToPoints(87)
      });
    } else {
      // Todo draw rectangle
    }
  }


  private _generateQRCode(){

    let qrString = "";

    qrString += "SPC\n";                                                                        // Swiss Payments Code
    qrString += "0200\n";                                                                       // Version
    qrString += "1\n";                                                                          // Coding Type UTF-8
    qrString += this._data.creditor.account + "\n";                                             // IBAN

    if(this._data.creditor.houseNumber !== undefined){
      qrString += "S\n";                                                                        // Adress Type
      qrString += this._data.creditor.name + "\n";                                              // Name
      qrString += this._data.creditor.address + "\n";                                           // Address
      qrString += this._data.creditor.houseNumber + "\n";                                       // House number
      qrString += this._data.creditor.zip + "\n";                                               // Zip code
      qrString += this._data.creditor.city + "\n";                                              // City
    } else {
      qrString += "K\n";                                                                        // Adress Type
      qrString += this._data.creditor.name + "\n";                                              // Name
      qrString += this._data.creditor.address + "\n";                                           // Address
      qrString += this._data.creditor.zip + " " + this._data.creditor.city + "\n";              // Zip code + city
    }

    qrString += this._data.creditor.country + "\n";                                             // Country


    //-- 7 x empty

    qrString += "\n";                                                                           // 1
    qrString += "\n";                                                                           // 2
    qrString += "\n";                                                                           // 3
    qrString += "\n";                                                                           // 4
    qrString += "\n";                                                                           // 5
    qrString += "\n";                                                                           // 6
    qrString += "\n";                                                                           // 7

    qrString += (this._data.amount ?? "") + "\n";                                               // Amount
    qrString += this._data.currency + "\n";                                                     // Currency

    if(this._data.debitor !== undefined){
      if(this._data.debitor.houseNumber !== undefined){
        qrString += "S\n";                                                                      // Adress Type
        qrString += this._data.debitor.name + "\n";                                             // Name
        qrString += this._data.debitor.address + "\n";                                          // Address
        qrString += this._data.debitor.houseNumber + "\n";                                      // House number
        qrString += this._data.debitor.zip + "\n";                                              // Zip code
        qrString += this._data.debitor.city + "\n";                                             // City
      } else {
        qrString += "K\n";                                                                      // Adress Type
        qrString += this._data.debitor.name + "\n";                                             // Name
        qrString += this._data.debitor.address + "\n";                                          // Address
        qrString += this._data.debitor.zip + " " + this._data.creditor.city + "\n";             // Zip code + city
      }
      qrString += this._data.debitor.country + "\n";                                            // Country
    }

    qrString += "QRR" + "\n";                                                                   // Referencetype Todo: calculate
    qrString += this._data.reference + "\n";                                                    // Reference

    if(this._data.message !== undefined){
      qrString += this._data.reference + "\n";                                                  // Unstructured message
    }

    qrString += "EPD" + "\n";                                                                   // End Payment Data

    if(this._data.information !== undefined){
      qrString += this._data.information + "\n";                                                // Bill infromation
    }

    if(this._data.information !== undefined){
      qrString += this._data.av1 + "\n";                                                        // AV1
    }

    if(this._data.information !== undefined){
      qrString += this._data.av2 + "\n";                                                        // AV2
    }

    const qrcodeString = new QRCode({
      content: qrString,
      join: true,
      width: this._mmToPoints(46),
      height: this._mmToPoints(46),
      padding: 0
    }).svg();

    let svgPath = this._getSVGPathFromQRCodeString(qrcodeString);

    if(svgPath === undefined){
      console.error("Could not convert svg image to path");
      return;
    }

    this.document.moveTo(this._mmToPoints(67), this._mmToPoints(this._paddingTop + 17));

    svgPath = svgpath(svgPath)
      .translate(this._mmToPoints(67), this._mmToPoints(this._paddingTop + 17))
      .toString();


    //-- Black rectangle

    let background = "M18.3 0.7L1.6 0.7 0.7 0.7 0.7 1.6 0.7 18.3 0.7 19.1 1.6 19.1 18.3 19.1 19.1 19.1 19.1 18.3 19.1 1.6 19.1 0.7Z";
    let cross = "M8.3 4H11.6V15H8.3V4Z M4.4 7.9H15.4V11.2H4.4V7.9Z";

    background = svgpath(background)
      .translate(this._mmToPoints(86), this._mmToPoints(this._paddingTop + 36))
      .toString();

    cross = svgpath(cross)
      .translate(this._mmToPoints(86), this._mmToPoints(this._paddingTop + 36))
      .toString();

    this.document.path(svgPath)
      .undash()
      .fillColor("black")
      .fill();

    this.document.path(background)
      .fillColor("black")
      .lineWidth(1)
      .strokeColor("white")
      .fillAndStroke();

    this.document.path(cross)
      .fillColor("white")
      .fill();

  }


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


  private _mmToPoints(mm: number): number {
    return Math.round(mm * 2.83465);
  }


  private _formatAddress(data: SwissQRBillDebitor | SwissQRBillCreditor): string {
    if(data.houseNumber !== undefined) {
      return `${data.name}\n${data.address} ${data.houseNumber}\n${data.zip} ${data.city}`;
    } else {
      return `${data.name}\n${data.address}\n${data.zip} ${data.city}`;
    }
  }


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

}

const bill = new SwissQRBill(sampleObject, "bill.pdf", { size: "A4", language: "DE" });