import { cleanData } from "swissqrbill:shared/cleaner";
import { generateQRData, renderQRCode } from "swissqrbill:shared/qr-code";
import { translations } from "swissqrbill:shared/translations";
import { formatAmount, formatIBAN, formatReference, getReferenceType, mm2pt, pt2mm } from "swissqrbill:shared/utils";
import { validateData } from "swissqrbill:shared/validator";

import type { Creditor, Data, Debtor, Languages, QRBillOptions, Size } from "swissqrbill:shared/types";


/**
 * The QRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
 * using the {@link SwissQRBill.attachTo} method.
 */
export class SwissQRBill {

  private data: Data;
  private scissors: boolean = true;
  private separate: boolean = false;
  private outlines: boolean = true;
  private language: Languages = "DE";

  private size: Size | undefined;

  private _x: number = 0;
  private _y: number = 0;

  constructor(data: Data, options?: QRBillOptions) {

    this.data = data;

    // Remove line breaks and unnecessary white spaces
    this.data = cleanData(this.data);

    // Validate data
    void validateData(this.data);

    // Apply options
    if(options !== undefined){
      if(options.language !== undefined){
        this.language = options.language;
      }
      if(options.scissors !== undefined){
        this.scissors = options.scissors;
        this.separate = !options.scissors;
      }
      if(options.separate !== undefined){
        this.separate = options.separate;
        this.scissors = !options.separate;
      }
      if(options.size !== undefined){
        this.size = options.size;
      }
      if(options.scissors === false && options.separate === false){
        this.separate = false;
        this.scissors = false;
      }
      if(options.outlines !== undefined){
        this.outlines = options.outlines;
      }
    }

  }


  /**
   * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
   * @param doc The PDFKit instance
   * @param xPosition The x position where the QR Bill will be placed.
   * @param yPosition The y position where the QR Bill will be placed.
   */
  public attachTo(doc: PDFKit.PDFDocument, xPosition: number = 0, yPosition: number = doc.page.height - mm2pt(105)): void {

    const width = mm2pt(210);
    const height = mm2pt(105);

    if(!this.isSpaceSufficient(doc, xPosition, yPosition, width, height)){
      doc.addPage({
        layout: this.size === "A6/5"
          ? "landscape"
          : undefined,
        margin: 0,
        size: this.getNewPageSize(doc)
      });
      xPosition = 0;
      yPosition = 0;
    }

    this._x = xPosition;
    this._y = yPosition;

    this.render(doc);

  }

  private getNewPageSize(doc: PDFKit.PDFDocument): [width: number, height: number] {

    const minWidth = mm2pt(210);
    const minHeight = mm2pt(105);

    if(this.size !== "A6/5" && doc.page.width >= minWidth && doc.page.height >= minHeight){
      return [doc.page.width, doc.page.height];
    }

    return [minWidth, minHeight];

  }

  private x(millimeters: number = 0) {
    return this._x + mm2pt(millimeters);
  }

  private y(millimeters: number = 0) {
    return this._y + mm2pt(millimeters);
  }

  private render(doc: PDFKit.PDFDocument): void {

    // Lines
    if(this.outlines){

      // Horizontal line
      if(doc.page.height > mm2pt(105)){

        doc.moveTo(this.x(), this.y())
          .lineTo(this.x(210), this.y())
          .lineWidth(.75)
          .strokeOpacity(1)
          .dash(1, { size: 1 })
          .strokeColor("black")
          .stroke();

      }

      // Vertical line
      doc.moveTo(this.x(62), this.y())
        .lineTo(this.x(62), this.y(105))
        .lineWidth(.75)
        .strokeOpacity(1)
        .dash(1, { size: 1 })
        .strokeColor("black")
        .stroke();

    }

    // Scissors
    if(this.scissors){

      const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
      const scissorsCenter = "M1.803 4.545C2.388 4.06 2.368 3.185 2.116 2.531l-1.539 -4.106c0.653 -1.194 0.466 -2.374 0.784 -2.374c0.249 0 0.194 0.228 0.842 0.194c0.622 -0.033 1.082 -0.682 1.041 -1.295c0.004 -0.614 -0.467 -1.25 -1.115 -1.255c-0.653 -0.046 -1.26 0.504 -1.303 1.153c-0.113 0.761 0.348 2.109 -0.785 2.741c-0.869 -0.471 -0.872 -1.307 -0.828 -2.063c0.036 -0.627 -0.144 -1.381 -0.76 -1.68c-0.591 -0.289 -1.432 -0.006 -1.613 0.658c-0.246 0.67 0.065 1.59 0.835 1.75c0.594 0.123 0.873 -0.298 1.089 -0.136c0.163 0.122 0.068 0.895 0.687 2.274L-2.117 2.838C-2.273 3.4 -2.268 4.087 -1.716 4.584L0.027 -0.026L1.803 4.545zm0.95 -9.154c-0.361 0.647 -1.342 0.594 -1.532 -0.078c-0.212 -0.608 0.379 -1.386 1.039 -1.192c0.541 0.114 0.74 0.827 0.493 1.27zm-4.009 0.028c-0.249 0.675 -1.392 0.561 -1.546 -0.126c-0.158 -0.456 0.069 -1.107 0.606 -1.153c0.653 -0.089 1.242 0.678 0.94 1.279z";

      if(doc.page.height > mm2pt(105)){

        doc.save();

        doc.translate(this.x(105), this.y());
        doc.path(scissorsTop)
          .fillColor("black")
          .fill();

        doc.restore();

      }

      doc.save();

      doc.translate(this.x(62), this.y() + 30);
      doc.path(scissorsCenter)
        .fillColor("black")
        .fill();

      doc.restore();

    }

    // Separation text
    if(this.separate){

      if(doc.page.height > mm2pt(105)){

        doc.fontSize(11);
        doc.font("Helvetica");
        doc.text(translations[this.language].separate, 0, this.y() - 12, {
          align: "center",
          width: mm2pt(210)
        });

      }

    }

    // Receipt
    doc.fontSize(11);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].receipt, this.x(5), this.y(5), {
      align: "left",
      width: mm2pt(52)
    });

    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].account, this.x(5), this.y(12), {
      lineGap: 1,
      width: mm2pt(52)
    });

    // Creditor
    doc.fontSize(8);
    doc.font("Helvetica");
    doc.text(`${formatIBAN(this.data.creditor.account)}\n${this.formatAddress(this.data.creditor)}`, {
      lineGap: -.5,
      width: mm2pt(52)
    });

    doc.fontSize(9);
    doc.moveDown();

    // Reference
    if(this.data.reference !== undefined){

      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].reference, {
        lineGap: 1,
        width: mm2pt(52)
      });

      doc.fontSize(8);
      doc.font("Helvetica");
      doc.text(formatReference(this.data.reference), {
        lineGap: -.5,
        width: mm2pt(52)
      });

      doc.fontSize(9);
      doc.moveDown();

    }

    // Debtor
    if(this.data.debtor !== undefined){

      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].payableBy, {
        lineGap: 1,
        width: mm2pt(52)
      });

      doc.fontSize(8);
      doc.font("Helvetica");
      doc.text(this.formatAddress(this.data.debtor), {
        lineGap: -.5,
        width: mm2pt(52)
      });

    } else {

      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].payableByName, {
        lineGap: 1,
        width: mm2pt(52)
      });

      // Add rectangle
      this.addRectangle(doc, 5, pt2mm(doc.y - this.y()), 52, 20);

    }

    // Amount
    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].currency, this.x(5), this.y(68), {
      lineGap: 1,
      width: mm2pt(15)
    });

    const amountXPosition = this.data.amount === undefined ? 18 : 27;

    doc.text(translations[this.language].amount, this.x(amountXPosition), this.y(68), {
      lineGap: 1,
      width: mm2pt(52 - amountXPosition)
    });

    doc.fontSize(8);
    doc.font("Helvetica");
    doc.text(this.data.currency, this.x(5), this.y(71), {
      lineGap: -.5,
      width: mm2pt(15)
    });

    if(this.data.amount !== undefined){
      doc.text(formatAmount(this.data.amount), this.x(amountXPosition), this.y(71), {
        lineGap: -.5,
        width: mm2pt(52 - amountXPosition)
      });
    } else {
      this.addRectangle(doc, 27, 68, 30, 10);
    }

    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].acceptancePoint, this.x(5), this.y(82), {
      align: "right",
      height: mm2pt(18),
      lineGap: 1,
      width: mm2pt(52)
    });

    // Payment part middle container
    doc.fontSize(11);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].paymentPart, this.x(67), this.y(5), {
      align: "left",
      lineGap: 1,
      width: mm2pt(51)
    });

    // QR Code
    const qrData = generateQRData(this.data);
    const qrCode = renderQRCode(qrData, "pdf", mm2pt(46));

    // Add QR Code
    doc.save();

    doc.translate(this.x(67), this.y(17));
    doc.path(qrCode);
    doc.fillColor("black");
    doc.fill();

    doc.restore();

    // Add Swiss Cross
    const swissCrossBackground = "18.3 0.7 m1.6 0.7 l0.7 0.7 l0.7 1.6 l0.7 18.3 l0.7 19.1 l1.6 19.1 l18.3 19.1 l19.1 19.1 l19.1 18.3 l19.1 1.6 l19.1 0.7 lh";
    const swissCross = "8.3 4 m11.6 4 l11.6 15 l8.3 15 l8.3 4 lh4.4 7.9 m15.4 7.9 l15.4 11.2 l4.4 11.2 l4.4 7.9 lh";

    doc.save();

    doc.translate(this.x(86.5), this.y(36));
    doc.path(swissCrossBackground)
      .undash()
      .fillColor("black")
      .lineWidth(1.42)
      .strokeColor("white")
      .fillAndStroke();

    doc.restore();

    doc.save();

    doc.translate(this.x(86.5), this.y(36));
    doc.path(swissCross)
      .fillColor("white")
      .fill();

    doc.restore();

    doc.fillColor("black");

    // Amount
    doc.fontSize(8);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].currency, this.x(67), this.y(68), {
      lineGap: 1,
      width: mm2pt(15)
    });

    doc.text(translations[this.language].amount, this.x(89), this.y(68), {
      width: mm2pt(29)
    });

    doc.fontSize(10);
    doc.font("Helvetica");
    doc.text(this.data.currency, this.x(67), this.y(72), {
      lineGap: -.5,
      width: mm2pt(15)
    });

    if(this.data.amount !== undefined){
      doc.text(formatAmount(this.data.amount), this.x(89), this.y(72), {
        lineGap: -.5,
        width: mm2pt(29)
      });
    } else {
      this.addRectangle(doc, 78, 72, 40, 15);
    }

    // AV1 and AV2
    if(this.data.av1 !== undefined){

      const [scheme, data] = this.data.av1.split(/(\/.+)/);

      doc.fontSize(7);
      doc.font("Helvetica-Bold");
      doc.text(scheme, this.x(67), this.y(90), {
        continued: true,
        height: mm2pt(3),
        lineGap: 1,
        width: mm2pt(138)
      });

      doc.font("Helvetica");
      doc.text(this.data.av1.length > 90 ? `${data.substring(0, 87)}...` : data, {
        continued: false
      });

    }

    if(this.data.av2 !== undefined){

      const [scheme, data] = this.data.av2.split(/(\/.+)/);

      doc.fontSize(7);
      doc.font("Helvetica-Bold");
      doc.text(scheme, this.x(67), this.y(93), {
        continued: true,
        height: mm2pt(3),
        lineGap: 1,
        width: mm2pt(138)
      });

      doc.font("Helvetica");
      doc.text(this.data.av2.length > 90 ? `${data.substring(0, 87)}...` : data, {
        lineGap: -.5
      });

    }

    // Payment part right column
    doc.fontSize(8);
    doc.font("Helvetica-Bold");
    doc.text(translations[this.language].account, this.x(118), this.y(5), {
      lineGap: 1,
      width: mm2pt(87)
    });

    doc.fontSize(10);
    doc.font("Helvetica");
    doc.text(`${formatIBAN(this.data.creditor.account)}\n${this.formatAddress(this.data.creditor)}`, {
      lineGap: -.75,
      width: mm2pt(87)
    });

    doc.fontSize(9);
    doc.moveDown();

    if(this.data.reference !== undefined){

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].reference, {
        lineGap: 1,
        width: mm2pt(87)
      });

      doc.fontSize(10);
      doc.font("Helvetica");
      doc.text(formatReference(this.data.reference), {
        lineGap: -.75,
        width: mm2pt(87)
      });

      doc.fontSize(9);
      doc.moveDown();

    }

    // Message / Additional information
    if(this.data.message !== undefined || this.data.additionalInformation !== undefined){

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].additionalInformation, {
        lineGap: 1,
        width: mm2pt(87)
      });

      doc.fontSize(10);
      doc.font("Helvetica");

      const options = {
        lineGap: -.75,
        width: mm2pt(87)
      };

      const singleLineHeight = doc.heightOfString("A", options);
      const referenceType = getReferenceType(this.data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const linesOfAdditionalInformation = this.data.additionalInformation !== undefined ? doc.heightOfString(this.data.additionalInformation, options) / singleLineHeight : 0;

      if(this.data.additionalInformation !== undefined){

        if(referenceType === "QRR" || referenceType === "SCOR"){

          // QRR and SCOR have 1 line for the message and 2 lines for the additional information
          if(this.data.message !== undefined){
            doc.text(this.data.message, { ...options, ellipsis: true, height: singleLineHeight, lineBreak: false });
          }

        } else {

          // Non QRR and SCOR have 4 lines total available and the message should be shortened if necessary
          if(this.data.message !== undefined){
            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            doc.text(this.data.message, { ...options, ellipsis: true, height: singleLineHeight * maxLinesOfMessage, lineBreak: true });
          }

        }

        doc.text(this.data.additionalInformation, options);

      } else if(this.data.message !== undefined){
        doc.text(this.data.message, { ...options, ellipsis: true, height: singleLineHeight * maxLines, lineBreak: true });
      }

      doc.fontSize(9);
      doc.moveDown();

    }

    if(this.data.debtor !== undefined){

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].payableBy, {
        lineGap: 1,
        width: mm2pt(87)
      });

      doc.fontSize(10);
      doc.font("Helvetica");
      doc.text(this.formatAddress(this.data.debtor), {
        lineGap: -.75,
        width: mm2pt(87)
      });

    } else {

      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations[this.language].payableByName, {
        lineGap: 1,
        width: mm2pt(87)
      });

      this.addRectangle(doc, 118, pt2mm(doc.y - this.y()), 65, 25);

    }

  }

  private formatAddress(data: Creditor | Debtor): string {
    const countryPrefix = data.country !== "CH" ? `${data.country} - ` : "";
    if(data.buildingNumber !== undefined){
      return `${data.name}\n${data.address} ${data.buildingNumber}\n${countryPrefix}${data.zip} ${data.city}`;
    }

    return `${data.name}\n${data.address}\n${countryPrefix}${data.zip} ${data.city}`;
  }


  private addRectangle(doc: PDFKit.PDFDocument, x: number, y: number, width: number, height: number): void {

    const length = 3;

    doc.moveTo(this.x(x + length), this.y(y))
      .lineTo(this.x(x), this.y(y))
      .lineTo(this.x(x), this.y(y + length))
      .moveTo(this.x(x), this.y(y + height - length))
      .lineTo(this.x(x), this.y(y + height))
      .lineTo(this.x(x + length), this.y(y + height))
      .moveTo(this.x(x + width - length), this.y(y + height))
      .lineTo(this.x(x + width), this.y(y + height))
      .lineTo(this.x(x + width), this.y(y + height - length))
      .moveTo(this.x(x + width), this.y(y + length))
      .lineTo(this.x(x + width), this.y(y))
      .lineTo(this.x(x + width - length), this.y(y))
      .lineWidth(.75)
      .undash()
      .strokeColor("black")
      .stroke();

  }

  private isSpaceSufficient(doc: PDFKit.PDFDocument, xPosition: number, yPosition: number, width: number, height: number): boolean {

    if(!doc.page){
      return false;
    }

    return (
      Math.round(xPosition + width) <= Math.round(doc.page.width) &&
     Math.round(doc.y + height) <= Math.round(doc.page.height) &&
     Math.round(yPosition + height) <= Math.round(doc.page.height)
    );
  }


}
