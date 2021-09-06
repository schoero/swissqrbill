import { PDF as ExtendedPDF } from "./extended-pdf";
import { Size, Data, Languages, PDFOptions, Debtor, Creditor } from "../common/types";
import * as utils from "../common/utils";
import translations from "../common/translations";
import generateQRCode from "../common/qr-code";
import { validateData, cleanData } from "../common/common";

export class PDF extends ExtendedPDF {

  public size: Size = "A6/5";
  private _data: Data;
  private _scissors: boolean = true;
  private _separate: boolean = false;
  private _outlines: boolean = true;
  private _language: Languages = "DE";
  private _marginTop: number = 0;
  private _autoGenerate: boolean = true;


  constructor(data: Data, options?: PDFOptions) {

    super({ autoFirstPage: false, bufferPages: true });

    this._data = data;

    if(this._data.debtor === undefined && this._data.debitor !== undefined){
      this._data.debtor = this._data.debitor;
    }


    //-- Clean data (remove line breaks and unnecessary whitespaces)

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

    if(this._autoGenerate === true){
      this.addQRBill();
      this.end();
    }

  }


  public addPage(options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument {

    if(options === undefined){
      options = {
        margin: utils.mmToPoints(5),
        layout: this.size === "A4" ? "portrait" : "landscape",
        size: this.size === "A4" ? this.size : [utils.mmToPoints(105), utils.mmToPoints(210)]
      };
    }

    return super.addPage(options);

  }


  public end(): void {
    this.emit("beforeEnd", this);
    return super.end();
  }


  public addQRBill(): void {

    if(this.page.height - this.y < utils.mmToPoints(105) && this.y !== this.page.margins.top){
      this.addPage({
        layout: "landscape",
        margin: 0,
        size: [utils.mmToPoints(105), utils.mmToPoints(210)]
      });
    }

    this._marginTop = this.page.height - utils.mmToPoints(105);

    this._drawOutlines();
    this._drawReceipt();
    this._drawPaymentPart();

  }


  private _drawOutlines(): void {


    //-- Lines

    if(this._outlines === true){


      //-- Horizontal line

      if(this.page.height > utils.mmToPoints(105)){

        this.moveTo(0, this._marginTop)
          .lineTo(utils.mmToPoints(210), this._marginTop)
          .lineWidth(.75)
          .strokeOpacity(1)
          .dash(1, { size: 1 })
          .strokeColor("black")
          .stroke();

      }


      //-- Vertical line

      this.moveTo(utils.mmToPoints(62), this._marginTop)
        .lineTo(utils.mmToPoints(62), this._marginTop + utils.mmToPoints(105))
        .lineWidth(.75)
        .strokeOpacity(1)
        .dash(1, { size: 1 })
        .strokeColor("black")
        .stroke();

    }


    //-- Scissors

    if(this._scissors === true){

      const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
      const scissorsCenter = "M1.803 4.545C2.388 4.06 2.368 3.185 2.116 2.531l-1.539 -4.106c0.653 -1.194 0.466 -2.374 0.784 -2.374c0.249 0 0.194 0.228 0.842 0.194c0.622 -0.033 1.082 -0.682 1.041 -1.295c0.004 -0.614 -0.467 -1.25 -1.115 -1.255c-0.653 -0.046 -1.26 0.504 -1.303 1.153c-0.113 0.761 0.348 2.109 -0.785 2.741c-0.869 -0.471 -0.872 -1.307 -0.828 -2.063c0.036 -0.627 -0.144 -1.381 -0.76 -1.68c-0.591 -0.289 -1.432 -0.006 -1.613 0.658c-0.246 0.67 0.065 1.59 0.835 1.75c0.594 0.123 0.873 -0.298 1.089 -0.136c0.163 0.122 0.068 0.895 0.687 2.274L-2.117 2.838C-2.273 3.4 -2.268 4.087 -1.716 4.584L0.027 -0.026L1.803 4.545zm0.95 -9.154c-0.361 0.647 -1.342 0.594 -1.532 -0.078c-0.212 -0.608 0.379 -1.386 1.039 -1.192c0.541 0.114 0.74 0.827 0.493 1.27zm-4.009 0.028c-0.249 0.675 -1.392 0.561 -1.546 -0.126c-0.158 -0.456 0.069 -1.107 0.606 -1.153c0.653 -0.089 1.242 0.678 0.94 1.279z";

      if(this.page.height > utils.mmToPoints(105)){

        this.addPath(scissorsTop, utils.mmToPoints(105), this._marginTop)
          .fillColor("black")
          .fill();

      }

      this.addPath(scissorsCenter, utils.mmToPoints(62), this._marginTop + 30)
        .fillColor("black")
        .fill();
      this.translate(0, 0);

    }


    //-- Separation text

    if(this._separate === true){

      if(this.page.height > utils.mmToPoints(105)){

        this.fontSize(11);
        this.font("Helvetica");
        this.text(translations[this._language].separate, utils.mmToPoints(0), this._marginTop - 12, {
          width: utils.mmToPoints(210),
          align: "center"
        });

      }

    }

  }


  private _drawReceipt(): void {

    this.fontSize(11);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].receipt, utils.mmToPoints(5), this._marginTop + utils.mmToPoints(5), {
      width: utils.mmToPoints(52),
      align: "left"
    });

    this.fontSize(6);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].account, utils.mmToPoints(5), this._marginTop + utils.mmToPoints(12), {
      width: utils.mmToPoints(52)
    });


    //-- Creditor

    this.fontSize(8);
    this.font("Helvetica");
    this.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
      width: utils.mmToPoints(52)
    });

    this.moveDown();


    //-- Reference

    if(this._data.reference !== undefined){

      this.fontSize(6);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].reference, {
        width: utils.mmToPoints(52)
      });

      this.fontSize(8);
      this.font("Helvetica");
      this.text(this._formatReference(this._data.reference), {
        width: utils.mmToPoints(52)
      });

    }


    //-- Debtor

    if(this._data.debtor !== undefined){

      this.fontSize(9);
      this.moveDown();

      this.fontSize(6);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableBy, {
        width: utils.mmToPoints(52)
      });

      this.fontSize(8);
      this.font("Helvetica");
      this.text(this._formatAddress(this._data.debtor), {
        width: utils.mmToPoints(52)
      });

    } else {

      this.fontSize(9);
      this.moveDown();

      this.fontSize(6);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableByName, {
        width: utils.mmToPoints(52)
      });


      //-- Draw rectangle

      const posY = this._data.reference === undefined ? 38 : 43;

      this._drawRectangle(5, posY, 52, 20);

    }

    this.fontSize(6);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].currency, utils.mmToPoints(5), this._marginTop + utils.mmToPoints(68), {
      width: utils.mmToPoints(15)
    });

    this.text(translations[this._language].amount, utils.mmToPoints(20), this._marginTop + utils.mmToPoints(68), {
      width: utils.mmToPoints(37)
    });

    this.fontSize(8);
    this.font("Helvetica");
    this.text(this._data.currency, utils.mmToPoints(5), this._marginTop + utils.mmToPoints(71), {
      width: utils.mmToPoints(15)
    });

    if(this._data.amount !== undefined){
      this.text(utils.formatAmount(this._data.amount), utils.mmToPoints(20), this._marginTop + utils.mmToPoints(71), {
        width: utils.mmToPoints(37)
      });
    } else {
      this._drawRectangle(30, 68, 30, 10);
    }

    this.fontSize(6);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].acceptancePoint, utils.mmToPoints(5), this._marginTop + utils.mmToPoints(82), {
      width: utils.mmToPoints(52),
      align: "right"
    });

  }


  private _drawPaymentPart(): void {

    this.fontSize(11);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].paymentPart, utils.mmToPoints(67), this._marginTop + utils.mmToPoints(5), {
      width: utils.mmToPoints(51),
      align: "left"
    });

    this._drawQRCode();

    this.fillColor("black");

    this.fontSize(8);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].currency, utils.mmToPoints(67), this._marginTop + utils.mmToPoints(68), {
      width: utils.mmToPoints(15)
    });

    this.text(translations[this._language].amount, utils.mmToPoints(87), this._marginTop + utils.mmToPoints(68), {
      width: utils.mmToPoints(36)
    });

    this.fontSize(10);
    this.font("Helvetica");
    this.text(this._data.currency, utils.mmToPoints(67), this._marginTop + utils.mmToPoints(72), {
      width: utils.mmToPoints(15)
    });

    if(this._data.amount !== undefined){
      this.text(utils.formatAmount(this._data.amount), utils.mmToPoints(87), this._marginTop + utils.mmToPoints(72), {
        width: utils.mmToPoints(36)
      });
    } else {
      this._drawRectangle(80, 72, 40, 15);
    }


    //-- AV1 and AV2

    if(this._data.av1 !== undefined){
      this.fontSize(7);
      this.font("Helvetica-Bold");
      this.text("Name AV1:", utils.mmToPoints(67), this._marginTop + utils.mmToPoints(90), {
        width: utils.mmToPoints(15)
      });

      this.fontSize(7);
      this.font("Helvetica");
      this.text((this._data.av1.length > 87 ? this._data.av1.substr(0, 87) + "..." : this._data.av1), utils.mmToPoints(81), this._marginTop + utils.mmToPoints(90), {
        width: utils.mmToPoints(37)
      });
    }

    if(this._data.av2 !== undefined){
      this.fontSize(7);
      this.font("Helvetica-Bold");
      this.text("Name AV2:", utils.mmToPoints(67), this._marginTop + utils.mmToPoints(93), {
        width: utils.mmToPoints(15)
      });

      this.fontSize(7);
      this.font("Helvetica");
      this.text((this._data.av2.length > 87 ? this._data.av2.substr(0, 87) + "..." : this._data.av2), utils.mmToPoints(81), this._marginTop + utils.mmToPoints(93), {
        width: utils.mmToPoints(37)
      });
    }

    this.fontSize(8);
    this.font("Helvetica-Bold");
    this.text(translations[this._language].account, utils.mmToPoints(118), this._marginTop + utils.mmToPoints(5), {
      width: utils.mmToPoints(87)
    });

    this.fontSize(10);
    this.font("Helvetica");
    this.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, utils.mmToPoints(118), this._marginTop + utils.mmToPoints(9.5), {
      width: utils.mmToPoints(87)
    });

    this.moveDown();

    if(this._data.reference !== undefined){

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].reference, {
        width: utils.mmToPoints(87)
      });

      this.fontSize(10);
      this.font("Helvetica");
      this.text(this._formatReference(this._data.reference), {
        width: utils.mmToPoints(87)
      });

      this.moveDown();

    }


    //-- Additional information

    if(this._data.additionalInformation !== undefined){

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].additionalInformation, {
        width: utils.mmToPoints(87)
      });

      this.fontSize(10);
      this.font("Helvetica");
      this.text(this._data.additionalInformation, {
        width: utils.mmToPoints(87)
      });

      this.moveDown();

    }

    if(this._data.debtor !== undefined){

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableBy, {
        width: utils.mmToPoints(87)
      });

      this.fontSize(10);
      this.font("Helvetica");
      this.text(this._formatAddress(this._data.debtor), {
        width: utils.mmToPoints(87)
      });

    } else {

      this.fontSize(8);
      this.font("Helvetica-Bold");
      this.text(translations[this._language].payableByName, {
        width: utils.mmToPoints(87)
      });

      const posY = this._data.reference === undefined ? 34 : 45;

      this._drawRectangle(118, posY, 65, 25);

    }
  }


  private _drawQRCode(): void {

    const { qrcode, swissCross, swissCrossBackground } = generateQRCode(this._data);

    this.moveTo(utils.mmToPoints(67), this._marginTop + utils.mmToPoints(17));


    //-- Add QR Code

    this.addPath(qrcode, utils.mmToPoints(67), this._marginTop + utils.mmToPoints(17))
      .undash()
      .fillColor("black")
      .fill();


    //-- Add Swiss Cross

    this.addPath(swissCrossBackground, utils.mmToPoints(86), this._marginTop + utils.mmToPoints(36))
      .fillColor("black")
      .lineWidth(1.4357)
      .strokeColor("white")
      .fillAndStroke();

    this.addPath(swissCross, utils.mmToPoints(86), this._marginTop + utils.mmToPoints(36))
      .fillColor("white")
      .fill();

  }


  public mmToPoints(mm: number): number {
    return utils.mmToPoints(mm);
  }


  private _formatAddress(data: Debtor | Creditor): string {
    if(data.houseNumber !== undefined){
      return `${data.name}\n${data.address} ${data.houseNumber}\n${data.zip} ${data.city}`;
    } else {
      return `${data.name}\n${data.address}\n${data.zip} ${data.city}`;
    }
  }


  private _formatReference(reference: string): string {

    const referenceType = utils.getReferenceType(reference);

    if(referenceType === "QRR"){
      return utils.formatQRReference(reference);
    } else if(referenceType === "SCOR"){
      return utils.formatSCORReference(reference);
    }

    return reference;

  }


  private _drawRectangle(x: number, y: number, width: number, height: number): void {

    const length = 3;

    this.moveTo(utils.mmToPoints(x + length), this._marginTop + utils.mmToPoints(y))
      .lineTo(utils.mmToPoints(x), this._marginTop + utils.mmToPoints(y))
      .lineTo(utils.mmToPoints(x), this._marginTop + utils.mmToPoints(y + length))
      .moveTo(utils.mmToPoints(x), this._marginTop + utils.mmToPoints(y + height - length))
      .lineTo(utils.mmToPoints(x), this._marginTop + utils.mmToPoints(y + height))
      .lineTo(utils.mmToPoints(x + length), this._marginTop + utils.mmToPoints(y + height))
      .moveTo(utils.mmToPoints(x + width - length), this._marginTop + utils.mmToPoints(y + height))
      .lineTo(utils.mmToPoints(x + width), this._marginTop + utils.mmToPoints(y + height))
      .lineTo(utils.mmToPoints(x + width), this._marginTop + utils.mmToPoints(y + height - length))
      .moveTo(utils.mmToPoints(x + width), this._marginTop + utils.mmToPoints(y + length))
      .lineTo(utils.mmToPoints(x + width), this._marginTop + utils.mmToPoints(y))
      .lineTo(utils.mmToPoints(x + width - length), this._marginTop + utils.mmToPoints(y))
      .lineWidth(.75)
      .undash()
      .strokeColor("black")
      .stroke();

  }

}
