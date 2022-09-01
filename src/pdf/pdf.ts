import { ExtendedPDF } from "./extended-pdf.js";
import { Size, Data, Languages, PDFOptions, Debtor, Creditor } from "../shared/types";
import { validateData, cleanData } from "../shared/shared.js";
import * as utils from "../shared/utils.js";
import translations from "../shared/translations.js";
import generateQRCode from "../shared/qr-code.js";

export class QRBill {

  private readonly _data: Data;
  private _scissors: boolean = true;
  private _separate: boolean = false;
  private _outlines: boolean = true;
  private _language: Languages = "DE";
  private _marginTop: number = 0;

  constructor(data: Data, options?: PDFOptions) {

    this._data = data;


    //-- Clean data (remove line breaks and unnecessary whitespaces)

    this._data = cleanData(this._data);


    //-- Validate data

    validateData(this._data);


    //-- Apply options

    if(options !== undefined){
      if(options.language !== undefined){
        this._language = options.language;
      }
      if(options.scissors !== undefined){
        this._scissors = options.scissors;
        this._separate = !options.scissors;
      }
      if(options.separate !== undefined){
        this._separate = options.separate;
        this._scissors = !options.separate;
      }
      if(options.scissors === false && options.separate === false){
        this._separate = false;
        this._scissors = false;
      }
      if(options.outlines !== undefined){
        this._outlines = options.outlines;
      }
    }
  }


  /**
   * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
   *
   * @param doc - The PDFKit instance
   * @param size - The size of the new page if not enough space is left for the QR slip.
   */
  public render(doc: PDFKit.PDFDocument, size: Size = "A6/5"): void {

    if(doc.page.height - doc.y < utils.mm2pt(105) && doc.y !== doc.page.margins.top){
      doc.addPage({
        margin: 0,
        layout: size === "A4" ? "portrait" : "landscape",
        size: size === "A4" ? size : [utils.mm2pt(105), utils.mm2pt(210)]
      });
    }

    this._marginTop = doc.page.height - utils.mm2pt(105);

    this._render(doc);

  }


  private _render(doc: PDFKit.PDFDocument): void {


    //-- Lines

    if(this._outlines){


      //-- Horizontal line

      if(doc.page.height > utils.mm2pt(105)){

        doc.moveTo(0, this._marginTop)
          .lineTo(utils.mm2pt(210), this._marginTop)
          .lineWidth(.75)
          .strokeOpacity(1)
          .dash(1, { size: 1 })
          .strokeColor("black")
          .stroke();

      }


      //-- Vertical line

      doc.moveTo(utils.mm2pt(62), this._marginTop)
        .lineTo(utils.mm2pt(62), this._marginTop + utils.mm2pt(105))
        .lineWidth(.75)
        .strokeOpacity(1)
        .dash(1, { size: 1 })
        .strokeColor("black")
        .stroke();

    }


    //-- Scissors

    if(this._scissors){

      // TODO(@danielpanero): remove svg path and convert to pdf reference for better performance
      const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
      const scissorsCenter = "M1.803 4.545C2.388 4.06 2.368 3.185 2.116 2.531l-1.539 -4.106c0.653 -1.194 0.466 -2.374 0.784 -2.374c0.249 0 0.194 0.228 0.842 0.194c0.622 -0.033 1.082 -0.682 1.041 -1.295c0.004 -0.614 -0.467 -1.25 -1.115 -1.255c-0.653 -0.046 -1.26 0.504 -1.303 1.153c-0.113 0.761 0.348 2.109 -0.785 2.741c-0.869 -0.471 -0.872 -1.307 -0.828 -2.063c0.036 -0.627 -0.144 -1.381 -0.76 -1.68c-0.591 -0.289 -1.432 -0.006 -1.613 0.658c-0.246 0.67 0.065 1.59 0.835 1.75c0.594 0.123 0.873 -0.298 1.089 -0.136c0.163 0.122 0.068 0.895 0.687 2.274L-2.117 2.838C-2.273 3.4 -2.268 4.087 -1.716 4.584L0.027 -0.026L1.803 4.545zm0.95 -9.154c-0.361 0.647 -1.342 0.594 -1.532 -0.078c-0.212 -0.608 0.379 -1.386 1.039 -1.192c0.541 0.114 0.74 0.827 0.493 1.27zm-4.009 0.028c-0.249 0.675 -1.392 0.561 -1.546 -0.126c-0.158 -0.456 0.069 -1.107 0.606 -1.153c0.653 -0.089 1.242 0.678 0.94 1.279z";

      if(doc.page.height > utils.mm2pt(105)){

        doc.save().translate(utils.mm2pt(105), this._marginTop);

        doc.path(scissorsTop)
          .fillColor("black")
          .fill();

        doc.restore();

      }

      doc.save().translate(utils.mm2pt(62), this._marginTop + 30);

      doc.path(scissorsCenter)
        .fillColor("black")
        .fill();
      doc.restore();

    }


    //-- Separation text

    if(this._separate){

      if(doc.page.height > utils.mm2pt(105)){

        doc.fontSize(11);
        doc.font("Helvetica");
        doc.text(translations[this._language].separate, utils.mm2pt(0), this._marginTop - 12, {
          width: utils.mm2pt(210),
          align: "center"
        });

      }

    }


    //-- Receipt

    doc.fontSize(11);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].receipt, utils.mm2pt(5), this._marginTop + utils.mm2pt(5), {
      width: utils.mm2pt(52),
      align: "left"
    });

    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].account, utils.mm2pt(5), this._marginTop + utils.mm2pt(12) + 3, {
      width: utils.mm2pt(52),
      lineGap: 1
    });


    //-- Creditor

    doc.fontSize(8);
    doc.font("Helvetica");
    doc.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
      width: utils.mm2pt(52),
      lineGap: -.5
    });

    doc.moveDown();


    //-- Reference

    if(this._data.reference !== undefined){

      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].reference, {
        width: utils.mm2pt(52),
        lineGap: 1
      });

      doc.fontSize(8);
      doc.font("Helvetica");
      doc.text(utils.formatReference(this._data.reference), {
        width: utils.mm2pt(52),
        lineGap: -.5
      });

    }


    //-- Debtor

    if(this._data.debtor !== undefined){

      doc.fontSize(9);
      doc.moveDown();

      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].payableBy, {
        width: utils.mm2pt(52),
        lineGap: 1
      });

      doc.fontSize(8);
      doc.font("Helvetica");
      doc.text(this._formatAddress(this._data.debtor), {
        width: utils.mm2pt(52),
        lineGap: -.5
      });

    } else {

      doc.fontSize(9);
      doc.moveDown();

      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].payableByName, {
        width: utils.mm2pt(52),
        lineGap: 1
      });


      //-- Add rectangle

      this._addRectangle(doc, 5, utils.pt2mm(doc.y - this._marginTop), 52, 20);

    }


    //-- Amount

    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].currency, utils.mm2pt(5), this._marginTop + utils.mm2pt(68), {
      width: utils.mm2pt(15),
      lineGap: 1
    });

    const amountXPosition = this._data.amount === undefined ? 18 : 27;

    doc.text(translations[this._language].amount, utils.mm2pt(amountXPosition), this._marginTop + utils.mm2pt(68), {
      width: utils.mm2pt(52 - amountXPosition),
      lineGap: 1
    });

    doc.fontSize(8);
    doc.font("Helvetica");
    doc.text(this._data.currency, utils.mm2pt(5), this._marginTop + utils.mm2pt(71), {
      width: utils.mm2pt(15),
      lineGap: -.5
    });

    if(this._data.amount !== undefined){
      doc.text(utils.formatAmount(this._data.amount), utils.mm2pt(amountXPosition), this._marginTop + utils.mm2pt(71), {
        width: utils.mm2pt(52 - amountXPosition),
        lineGap: -.5
      });
    } else {
      this._addRectangle(doc, 27, 68, 30, 10);
    }

    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].acceptancePoint, utils.mm2pt(5), this._marginTop + utils.mm2pt(82), {
      width: utils.mm2pt(52),
      align: "right",
      lineGap: 1
    });


    //-- Payment part middle container

    doc.fontSize(11);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].paymentPart, utils.mm2pt(67), this._marginTop + utils.mm2pt(5), {
      width: utils.mm2pt(51),
      align: "left",
      lineGap: 1
    });


    //-- QR Code

    this._renderQRCode(doc);
    doc.fillColor("black");


    //-- Amount

    doc.fontSize(8);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].currency, utils.mm2pt(67), this._marginTop + utils.mm2pt(68), {
      width: utils.mm2pt(15),
      lineGap: 1
    });

    doc.text(translations[this._language].amount, utils.mm2pt(89), this._marginTop + utils.mm2pt(68), {
      width: utils.mm2pt(29)
    });

    doc.fontSize(10);
    doc.font("Helvetica");
    doc.text(this._data.currency, utils.mm2pt(67), this._marginTop + utils.mm2pt(72), {
      width: utils.mm2pt(15),
      lineGap: -.5
    });

    if(this._data.amount !== undefined){
      doc.text(utils.formatAmount(this._data.amount), utils.mm2pt(89), this._marginTop + utils.mm2pt(72), {
        width: utils.mm2pt(29),
        lineGap: -.5
      });
    } else {
      this._addRectangle(doc, 78, 72, 40, 15);
    }


    //-- AV1 and AV2

    if(this._data.av1 !== undefined){

      const [scheme, data] = this._data.av1.split(/(\/.+)/);

      doc.fontSize(7);
      doc.font("Helvetica-Bold");
      doc.text(scheme, utils.mm2pt(67), this._marginTop + utils.mm2pt(90), {
        width: utils.mm2pt(138),
        continued: true,
        lineGap: 1
      });

      doc.font("Helvetica");
      doc.text(this._data.av1.length > 90 ? data.substr(0, 87) + "..." : data, {
        continued: false
      });

    }

    if(this._data.av2 !== undefined){

      const [scheme, data] = this._data.av2.split(/(\/.+)/);

      doc.fontSize(7);
      doc.font("Helvetica-Bold");
      doc.text(scheme, utils.mm2pt(67), this._marginTop + utils.mm2pt(93), {
        width: utils.mm2pt(138),
        continued: true,
        lineGap: 1
      });

      doc.font("Helvetica");
      doc.text(this._data.av2.length > 90 ? data.substr(0, 87) + "..." : data, {
        lineGap: -.5
      });

    }


    //-- Payment part right column

    doc.fontSize(8);
    doc.font("Helvetica-Bold");
    doc.text(translations[this._language].account, utils.mm2pt(118), this._marginTop + utils.mm2pt(5) + 3, {
      width: utils.mm2pt(87),
      lineGap: 1
    });

    doc.fontSize(10);
    doc.font("Helvetica");
    doc.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
      width: utils.mm2pt(87),
      lineGap: -.75
    });

    doc.moveDown();

    if(this._data.reference !== undefined){

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].reference, {
        width: utils.mm2pt(87),
        lineGap: 1
      });

      doc.fontSize(10);
      doc.font("Helvetica");
      doc.text(utils.formatReference(this._data.reference), {
        width: utils.mm2pt(87),
        lineGap: -.75
      });

      doc.moveDown();

    }


    //-- Message / Additional information

    if(this._data.message !== undefined || this._data.additionalInformation !== undefined){

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].additionalInformation, {
        width: utils.mm2pt(87),
        lineGap: 1
      });

      doc.fontSize(10);
      doc.font("Helvetica");

      const options = {
        width: utils.mm2pt(87),
        lineGap: -.75
      };

      const singleLineHeight = doc.heightOfString("A", options);
      const referenceType = utils.getReferenceType(this._data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const linesOfAdditionalInformation = this._data.additionalInformation !== undefined ? doc.heightOfString(this._data.additionalInformation, options) / singleLineHeight : 0;

      if(this._data.additionalInformation !== undefined){

        if(referenceType === "QRR" || referenceType === "SCOR"){

          // QRR and SCOR have 1 line for the message and 2 lines for the additional information

          if(this._data.message !== undefined){
            doc.text(this._data.message, { ...options, lineBreak: false, ellipsis: true, height: singleLineHeight });
          }

        } else {

          // Non QRR and SCOR have 4 lines total available and the message should be shortened if necessary

          if(this._data.message !== undefined){
            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            doc.text(this._data.message, { ...options, height: singleLineHeight * maxLinesOfMessage, lineBreak: true, ellipsis: true });
          }

        }

        doc.text(this._data.additionalInformation, options);

      } else if(this._data.message !== undefined){
        doc.text(this._data.message, { ...options, height: singleLineHeight * maxLines, lineBreak: true, ellipsis: true });
      }

      doc.moveDown();

    }

    if(this._data.debtor !== undefined){

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].payableBy, {
        width: utils.mm2pt(87),
        lineGap: 1
      });

      doc.fontSize(10);
      doc.font("Helvetica");
      doc.text(this._formatAddress(this._data.debtor), {
        width: utils.mm2pt(87),
        lineGap: -.75
      });

    } else {

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this._language].payableByName, {
        width: utils.mm2pt(87),
        lineGap: 1
      });

      this._addRectangle(doc, 118, utils.pt2mm(doc.y - this._marginTop), 65, 25);

    }

  }


  private _renderQRCode(doc: PDFKit.PDFDocument): void {

    // TODO(@danielpanero) Since _data is immutable we would consider caching the qrcode on creation
    const qrcode = generateQRCode(this._data, "pdf", utils.mm2pt(67), this._marginTop + utils.mm2pt(17), utils.mm2pt(46));


    //-- Add QR Code
    doc.addContent(qrcode).fillColor("black").fill();


    //-- Add Swiss Cross

    // TODO(@danielpanero): convert to PDF reference
    const swissCrossBackground = "M18.3 0.7L1.6 0.7 0.7 0.7 0.7 1.6 0.7 18.3 0.7 19.1 1.6 19.1 18.3 19.1 19.1 19.1 19.1 18.3 19.1 1.6 19.1 0.7Z";
    const swissCross = "M8.3 4H11.6V15H8.3V4Z M4.4 7.9H15.4V11.2H4.4V7.9Z";

    doc.save().translate(utils.mm2pt(86.5), this._marginTop + utils.mm2pt(36));

    doc.path(swissCrossBackground)
      .undash()
      .fillColor("black")
      .lineWidth(1.42)
      .strokeColor("white")
      .fillAndStroke();

    doc.restore();

    doc.save().translate(utils.mm2pt(86.5), this._marginTop + utils.mm2pt(36));

    doc.path(swissCross)
      .fillColor("white")
      .fill();

    doc.restore();
  }


  private _formatAddress(data: Debtor | Creditor): string {
    const countryPrefix = data.country !== "CH" ? data.country + " - " : "";
    if(data.buildingNumber !== undefined){
      return `${data.name}\n${data.address} ${data.buildingNumber}\n${countryPrefix}${data.zip} ${data.city}`;
    }

    return `${data.name}\n${data.address}\n${countryPrefix}${data.zip} ${data.city}`;
  }


  private _addRectangle(doc: PDFKit.PDFDocument, x: number, y: number, width: number, height: number): void {

    const length = 3;

    doc.moveTo(utils.mm2pt(x + length), this._marginTop + utils.mm2pt(y))
      .lineTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y))
      .lineTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y + length))
      .moveTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y + height - length))
      .lineTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y + height))
      .lineTo(utils.mm2pt(x + length), this._marginTop + utils.mm2pt(y + height))
      .moveTo(utils.mm2pt(x + width - length), this._marginTop + utils.mm2pt(y + height))
      .lineTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y + height))
      .lineTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y + height - length))
      .moveTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y + length))
      .lineTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y))
      .lineTo(utils.mm2pt(x + width - length), this._marginTop + utils.mm2pt(y))
      .lineWidth(.75)
      .undash()
      .strokeColor("black")
      .stroke();

  }

}


export class PDF_ extends ExtendedPDF {

  public size: Size = "A6/5";
  private _data: Data;
  private _options?: PDFOptions;

  private _autoGenerate: boolean = true;


  constructor(data: Data, options?: PDFOptions) {

    super({ autoFirstPage: false, bufferPages: true });

    // TODO(@danielpanero): decide if we want to use _data for back-compatibility or use _bill and changeBill(newBill: Bill){_bill = newBill}
    this._data = data;
    this._options = options;


    //-- Clean data (remove line breaks and unnecessary whitespaces)

    this._data = cleanData(this._data);


    //-- Validate data

    validateData(this._data);


    //-- Apply options

    if(options !== undefined){
      if(options.size !== undefined){
        this.size = options.size;
      }
      if(options.autoGenerate !== undefined){
        this._autoGenerate = options.autoGenerate;
      }
    }

    this.info.Producer = this.info.Creator = this.info.Author = "SwissQRBill";

    this.addPage();

    if(this._autoGenerate){
      this.addQRBill();
      this.end();
    }

  }


  /**
   * Adds a new page to the PDF. This method is basically the same as the original [PDFKit `addPage()` method](https://pdfkit.org/docs/getting_started.html#adding_pages). However the default values are changed to use the default page size provided in the constructor options.
   * @param options - An object containing [PDFKit document options.](https://pdfkit.org/docs/getting_started.html#adding_pages)
   * @returns `this`
   */
  public addPage(options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument {

    if(options === undefined){
      options = {
        margin: utils.mm2pt(5),
        layout: this.size === "A4" ? "portrait" : "landscape",
        size: this.size === "A4" ? this.size : [utils.mm2pt(105), utils.mm2pt(210)]
      };
    }

    return super.addPage(options);

  }


  public end(): void {
    this.emit("beforeEnd", this);
    return super.end();
  }


  /**
   * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
   *
   * @param size - The size of the new page if not enough space is left for the QR slip.
   */
  public addQRBill(size: Size = "A6/5"): void {
    const tmp = new QRBill(this._data, this._options);
    tmp.render(this, size);
  }


}
