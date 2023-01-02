import { generateQRData, renderQRCode } from "../shared/qr-code.js";
import { cleanData, validateData } from "../shared/shared.js";
import translations from "../shared/translations.js";
import { Creditor, Data, Debtor, Languages, PDFOptions, Size } from "../shared/types.js";
import * as utils from "../shared/utils.js";

import { ExtendedPDF } from "./extended-pdf.js";


export class PDF_ extends ExtendedPDF {

  public size: Size = "A6";
  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected _data: Data; // Was originally a private property but was opened in #368
  private _scissors: boolean = true;
  private _separate: boolean = false;
  private _outlines: boolean = true;
  private _language: Languages = "DE";
  private _marginTop: number = 0;
  private _autoGenerate: boolean = true;


  constructor(data: Data, options?: PDFOptions) {

    super({ autoFirstPage: false, bufferPages: true });

    this._data = data;


    //-- Clean data (remove line breaks and unnecessary white spaces)

    this._data = cleanData(this._data);


    //-- Validate data

    validateData(this._data);


    //-- Apply options

    if(options !== undefined){
      if(options.language !== undefined){
        this._language = options.language;
      }
      if(options.size !== undefined){
        this.size = options.size;
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
  public override addPage(options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument {

    if(options === undefined){
      options = {
        layout: this.size === "A4" ? "portrait" : "landscape",
        margin: utils.mm2pt(5),
        size: this.size === "A4" ? this.size : [utils.mm2pt(105), utils.mm2pt(210)]
      };
    }

    return super.addPage(options);

  }


  public override end(): void {
    this.emit("beforeEnd", this);
    return super.end();
  }


  /**
   * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
   *
   * @param size - The size of the new page if not enough space is left for the QR slip.
   */
  public addQRBill(size: Size = "A6"): void {

    if(this.page.height - this.y < utils.mm2pt(105) && this.y !== this.page.margins.top){
      this.addPage({
        layout: size === "A4" ? "portrait" : "landscape",
        margin: 0,
        size: size === "A4" ? size : [utils.mm2pt(105), utils.mm2pt(210)]
      });
    }

    this._marginTop = this.page.height - utils.mm2pt(105);

    this._render();

  }


  private _render(): void {


    //-- Lines

    if(this._outlines){


      //-- Horizontal line

      if(this.page.height > utils.mm2pt(105)){

        this.moveTo(0, this._marginTop)
          .lineTo(utils.mm2pt(210), this._marginTop)
          .lineWidth(.75)
          .strokeOpacity(1)
          .dash(1, { size: 1 })
          .strokeColor("black")
          .stroke();

      }


      //-- Vertical line

      this.moveTo(utils.mm2pt(62), this._marginTop)
        .lineTo(utils.mm2pt(62), this._marginTop + utils.mm2pt(105))
        .lineWidth(.75)
        .strokeOpacity(1)
        .dash(1, { size: 1 })
        .strokeColor("black")
        .stroke();

    }


    //-- Scissors

    if(this._scissors){

      const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
      const scissorsCenter = "M1.803 4.545C2.388 4.06 2.368 3.185 2.116 2.531l-1.539 -4.106c0.653 -1.194 0.466 -2.374 0.784 -2.374c0.249 0 0.194 0.228 0.842 0.194c0.622 -0.033 1.082 -0.682 1.041 -1.295c0.004 -0.614 -0.467 -1.25 -1.115 -1.255c-0.653 -0.046 -1.26 0.504 -1.303 1.153c-0.113 0.761 0.348 2.109 -0.785 2.741c-0.869 -0.471 -0.872 -1.307 -0.828 -2.063c0.036 -0.627 -0.144 -1.381 -0.76 -1.68c-0.591 -0.289 -1.432 -0.006 -1.613 0.658c-0.246 0.67 0.065 1.59 0.835 1.75c0.594 0.123 0.873 -0.298 1.089 -0.136c0.163 0.122 0.068 0.895 0.687 2.274L-2.117 2.838C-2.273 3.4 -2.268 4.087 -1.716 4.584L0.027 -0.026L1.803 4.545zm0.95 -9.154c-0.361 0.647 -1.342 0.594 -1.532 -0.078c-0.212 -0.608 0.379 -1.386 1.039 -1.192c0.541 0.114 0.74 0.827 0.493 1.27zm-4.009 0.028c-0.249 0.675 -1.392 0.561 -1.546 -0.126c-0.158 -0.456 0.069 -1.107 0.606 -1.153c0.653 -0.089 1.242 0.678 0.94 1.279z";

      if(this.page.height > utils.mm2pt(105)){

        this.addPath(scissorsTop, utils.mm2pt(105), this._marginTop)
          .fillColor("black")
          .fill();

      }

      this.addPath(scissorsCenter, utils.mm2pt(62), this._marginTop + 30)
        .fillColor("black")
        .fill();
      this.translate(0, 0);

    }


    //-- Separation text

    if(this._separate){

      if(this.page.height > utils.mm2pt(105)){

        this.fontSize(11);
        this.font("Helvetica");
        this.text(translations[this._language].separate, utils.mm2pt(0), this._marginTop - 12, {
          align: "center",
          width: utils.mm2pt(210)
        });

      }

    }


    //-- Receipt

    this.fontSize(11);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].receipt, utils.mm2pt(5), this._marginTop + utils.mm2pt(5), {
      align: "left",
      width: utils.mm2pt(52)
    });

    this.fontSize(6);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].account, utils.mm2pt(5), this._marginTop + utils.mm2pt(12) + 3, {
      lineGap: 1,
      width: utils.mm2pt(52)
    });


    //-- Creditor

    this.fontSize(8);
    this.font("Helvetica");
    this.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
      lineGap: -.5,
      width: utils.mm2pt(52)
    });

    this.moveDown();


    //-- Reference

    if(this._data.reference !== undefined){

      this.fontSize(6);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].reference, {
        lineGap: 1,
        width: utils.mm2pt(52)
      });

      this.fontSize(8);
      this.font("Helvetica");
      this.text(utils.formatReference(this._data.reference), {
        lineGap: -.5,
        width: utils.mm2pt(52)
      });

    }


    //-- Debtor

    if(this._data.debtor !== undefined){

      this.fontSize(9);
      this.moveDown();

      this.fontSize(6);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableBy, {
        lineGap: 1,
        width: utils.mm2pt(52)
      });

      this.fontSize(8);
      this.font("Helvetica");
      this.text(this._formatAddress(this._data.debtor), {
        lineGap: -.5,
        width: utils.mm2pt(52)
      });

    } else {

      this.fontSize(9);
      this.moveDown();

      this.fontSize(6);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableByName, {
        lineGap: 1,
        width: utils.mm2pt(52)
      });


      //-- Add rectangle

      this._addRectangle(5, utils.pt2mm(this.y - this._marginTop), 52, 20);

    }


    //-- Amount

    this.fontSize(6);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].currency, utils.mm2pt(5), this._marginTop + utils.mm2pt(68), {
      lineGap: 1,
      width: utils.mm2pt(15)
    });

    const amountXPosition = this._data.amount === undefined ? 18 : 27;

    this.text(translations[this._language].amount, utils.mm2pt(amountXPosition), this._marginTop + utils.mm2pt(68), {
      lineGap: 1,
      width: utils.mm2pt(52 - amountXPosition)
    });

    this.fontSize(8);
    this.font("Helvetica");
    this.text(this._data.currency, utils.mm2pt(5), this._marginTop + utils.mm2pt(71), {
      lineGap: -.5,
      width: utils.mm2pt(15)
    });

    if(this._data.amount !== undefined){
      this.text(utils.formatAmount(this._data.amount), utils.mm2pt(amountXPosition), this._marginTop + utils.mm2pt(71), {
        lineGap: -.5,
        width: utils.mm2pt(52 - amountXPosition)
      });
    } else {
      this._addRectangle(27, 68, 30, 10);
    }

    this.fontSize(6);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].acceptancePoint, utils.mm2pt(5), this._marginTop + utils.mm2pt(82), {
      align: "right",
      lineGap: 1,
      width: utils.mm2pt(52)
    });


    //-- Payment part middle container

    this.fontSize(11);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].paymentPart, utils.mm2pt(67), this._marginTop + utils.mm2pt(5), {
      align: "left",
      lineGap: 1,
      width: utils.mm2pt(51)
    });


    //-- QR Code

    this._renderQRCode();
    this.fillColor("black");


    //-- Amount

    this.fontSize(8);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].currency, utils.mm2pt(67), this._marginTop + utils.mm2pt(68), {
      lineGap: 1,
      width: utils.mm2pt(15)
    });

    this.text(translations[this._language].amount, utils.mm2pt(89), this._marginTop + utils.mm2pt(68), {
      width: utils.mm2pt(29)
    });

    this.fontSize(10);
    this.font("Helvetica");
    this.text(this._data.currency, utils.mm2pt(67), this._marginTop + utils.mm2pt(72), {
      lineGap: -.5,
      width: utils.mm2pt(15)
    });

    if(this._data.amount !== undefined){
      this.text(utils.formatAmount(this._data.amount), utils.mm2pt(89), this._marginTop + utils.mm2pt(72), {
        lineGap: -.5,
        width: utils.mm2pt(29)
      });
    } else {
      this._addRectangle(78, 72, 40, 15);
    }


    //-- AV1 and AV2

    if(this._data.av1 !== undefined){

      const [scheme, data] = this._data.av1.split(/(\/.+)/);

      this.fontSize(7);
      this.font("Helvetica-Bold");
      this.text(scheme, utils.mm2pt(67), this._marginTop + utils.mm2pt(90), {
        continued: true,
        lineGap: 1,
        width: utils.mm2pt(138)
      });

      this.font("Helvetica");
      this.text(this._data.av1.length > 90 ? `${data.substr(0, 87)}...` : data, {
        continued: false
      });

    }

    if(this._data.av2 !== undefined){

      const [scheme, data] = this._data.av2.split(/(\/.+)/);

      this.fontSize(7);
      this.font("Helvetica-Bold");
      this.text(scheme, utils.mm2pt(67), this._marginTop + utils.mm2pt(93), {
        continued: true,
        lineGap: 1,
        width: utils.mm2pt(138)
      });

      this.font("Helvetica");
      this.text(this._data.av2.length > 90 ? `${data.substr(0, 87)}...` : data, {
        lineGap: -.5
      });

    }


    //-- Payment part right column

    this.fontSize(8);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].account, utils.mm2pt(118), this._marginTop + utils.mm2pt(5) + 3, {
      lineGap: 1,
      width: utils.mm2pt(87)
    });

    this.fontSize(10);
    this.font("Helvetica");
    this.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
      lineGap: -.75,
      width: utils.mm2pt(87)
    });

    this.moveDown();

    if(this._data.reference !== undefined){

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].reference, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });

      this.fontSize(10);
      this.font("Helvetica");
      this.text(utils.formatReference(this._data.reference), {
        lineGap: -.75,
        width: utils.mm2pt(87)
      });

      this.moveDown();

    }


    //-- Message / Additional information

    if(this._data.message !== undefined || this._data.additionalInformation !== undefined){

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].additionalInformation, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });

      this.fontSize(10);
      this.font("Helvetica");

      const options = {
        lineGap: -.75,
        width: utils.mm2pt(87)
      };

      const singleLineHeight = this.heightOfString("A", options);
      const referenceType = utils.getReferenceType(this._data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const linesOfAdditionalInformation = this._data.additionalInformation !== undefined ? this.heightOfString(this._data.additionalInformation, options) / singleLineHeight : 0;

      if(this._data.additionalInformation !== undefined){

        if(referenceType === "QRR" || referenceType === "SCOR"){

          // QRR and SCOR have 1 line for the message and 2 lines for the additional information

          if(this._data.message !== undefined){
            this.text(this._data.message, { ...options, ellipsis: true, height: singleLineHeight, lineBreak: false });
          }

        } else {

          // Non QRR and SCOR have 4 lines total available and the message should be shortened if necessary

          if(this._data.message !== undefined){
            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            this.text(this._data.message, { ...options, ellipsis: true, height: singleLineHeight * maxLinesOfMessage, lineBreak: true });
          }

        }

        this.text(this._data.additionalInformation, options);

      } else if(this._data.message !== undefined){
        this.text(this._data.message, { ...options, ellipsis: true, height: singleLineHeight * maxLines, lineBreak: true });
      }

      this.moveDown();

    }

    if(this._data.debtor !== undefined){

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableBy, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });

      this.fontSize(10);
      this.font("Helvetica");
      this.text(this._formatAddress(this._data.debtor), {
        lineGap: -.75,
        width: utils.mm2pt(87)
      });

    } else {

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableByName, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });

      this._addRectangle(118, utils.pt2mm(this.y - this._marginTop), 65, 25);

    }

  }


  private _renderQRCode(): void {

    const qrData = generateQRData(this._data);
    const qrCode = renderQRCode(qrData, "pdf", utils.mm2pt(67), this._marginTop + utils.mm2pt(17), utils.mm2pt(46));


    //-- Add QR Code

    this.addContent(qrCode)
      .fillColor("black")
      .fill();


    //-- Add Swiss Cross

    const swissCrossBackground = "M18.3 0.7L1.6 0.7 0.7 0.7 0.7 1.6 0.7 18.3 0.7 19.1 1.6 19.1 18.3 19.1 19.1 19.1 19.1 18.3 19.1 1.6 19.1 0.7Z";
    const swissCross = "M8.3 4H11.6V15H8.3V4Z M4.4 7.9H15.4V11.2H4.4V7.9Z";

    this.addPath(swissCrossBackground, utils.mm2pt(86.5), this._marginTop + utils.mm2pt(36))
      .undash()
      .fillColor("black")
      .lineWidth(1.42)
      .strokeColor("white")
      .fillAndStroke();

    this.addPath(swissCross, utils.mm2pt(86.5), this._marginTop + utils.mm2pt(36))
      .fillColor("white")
      .fill();

  }


  private _formatAddress(data: Creditor | Debtor): string {
    const countryPrefix = data.country !== "CH" ? `${data.country} - ` : "";
    if(data.buildingNumber !== undefined){
      return `${data.name}\n${data.address} ${data.buildingNumber}\n${countryPrefix}${data.zip} ${data.city}`;
    }

    return `${data.name}\n${data.address}\n${countryPrefix}${data.zip} ${data.city}`;
  }


  private _addRectangle(x: number, y: number, width: number, height: number): void {

    const length = 3;

    this.moveTo(utils.mm2pt(x + length), this._marginTop + utils.mm2pt(y))
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
