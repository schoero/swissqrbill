"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const cleaner = require("../shared/cleaner.cjs");
const qrCode = require("../shared/qr-code.cjs");
const translations = require("../shared/translations.cjs");
const utils = require("../shared/utils.cjs");
const validator = require("../shared/validator.cjs");
class SwissQRBill {
  constructor(data, options) {
    this.scissors = true;
    this.separate = false;
    this.outlines = true;
    this.language = "DE";
    this._x = 0;
    this._y = 0;
    this.data = data;
    this.data = cleaner.cleanData(this.data);
    void validator.validateData(this.data);
    if (options !== void 0) {
      if (options.language !== void 0) {
        this.language = options.language;
      }
      if (options.scissors !== void 0) {
        this.scissors = options.scissors;
        this.separate = !options.scissors;
      }
      if (options.separate !== void 0) {
        this.separate = options.separate;
        this.scissors = !options.separate;
      }
      if (options.size !== void 0) {
        this.size = options.size;
      }
      if (options.scissors === false && options.separate === false) {
        this.separate = false;
        this.scissors = false;
      }
      if (options.outlines !== void 0) {
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
  attachTo(doc, xPosition = 0, yPosition = doc.page.height - utils.mm2pt(105)) {
    const width = utils.mm2pt(210);
    const height = utils.mm2pt(105);
    if (!this.isSpaceSufficient(doc, xPosition, yPosition, width, height)) {
      doc.addPage({
        layout: this.size === "A6/5" ? "landscape" : void 0,
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
  getNewPageSize(doc) {
    const minWidth = utils.mm2pt(210);
    const minHeight = utils.mm2pt(105);
    if (this.size !== "A6/5" && doc.page.width >= minWidth && doc.page.height >= minHeight) {
      return [doc.page.width, doc.page.height];
    }
    return [minWidth, minHeight];
  }
  x(millimeters = 0) {
    return this._x + utils.mm2pt(millimeters);
  }
  y(millimeters = 0) {
    return this._y + utils.mm2pt(millimeters);
  }
  render(doc) {
    if (this.outlines) {
      if (doc.page.height > utils.mm2pt(105)) {
        doc.moveTo(this.x(), this.y()).lineTo(this.x(210), this.y()).lineWidth(0.75).strokeOpacity(1).dash(1, { size: 1 }).strokeColor("black").stroke();
      }
      doc.moveTo(this.x(62), this.y()).lineTo(this.x(62), this.y(105)).lineWidth(0.75).strokeOpacity(1).dash(1, { size: 1 }).strokeColor("black").stroke();
    }
    if (this.scissors) {
      const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
      const scissorsCenter = "M1.803 4.545C2.388 4.06 2.368 3.185 2.116 2.531l-1.539 -4.106c0.653 -1.194 0.466 -2.374 0.784 -2.374c0.249 0 0.194 0.228 0.842 0.194c0.622 -0.033 1.082 -0.682 1.041 -1.295c0.004 -0.614 -0.467 -1.25 -1.115 -1.255c-0.653 -0.046 -1.26 0.504 -1.303 1.153c-0.113 0.761 0.348 2.109 -0.785 2.741c-0.869 -0.471 -0.872 -1.307 -0.828 -2.063c0.036 -0.627 -0.144 -1.381 -0.76 -1.68c-0.591 -0.289 -1.432 -0.006 -1.613 0.658c-0.246 0.67 0.065 1.59 0.835 1.75c0.594 0.123 0.873 -0.298 1.089 -0.136c0.163 0.122 0.068 0.895 0.687 2.274L-2.117 2.838C-2.273 3.4 -2.268 4.087 -1.716 4.584L0.027 -0.026L1.803 4.545zm0.95 -9.154c-0.361 0.647 -1.342 0.594 -1.532 -0.078c-0.212 -0.608 0.379 -1.386 1.039 -1.192c0.541 0.114 0.74 0.827 0.493 1.27zm-4.009 0.028c-0.249 0.675 -1.392 0.561 -1.546 -0.126c-0.158 -0.456 0.069 -1.107 0.606 -1.153c0.653 -0.089 1.242 0.678 0.94 1.279z";
      if (doc.page.height > utils.mm2pt(105)) {
        doc.save();
        doc.translate(this.x(105), this.y());
        doc.path(scissorsTop).fillColor("black").fill();
        doc.restore();
      }
      doc.save();
      doc.translate(this.x(62), this.y() + 30);
      doc.path(scissorsCenter).fillColor("black").fill();
      doc.restore();
    }
    if (this.separate) {
      if (doc.page.height > utils.mm2pt(105)) {
        doc.fontSize(11);
        doc.font("Helvetica");
        doc.text(translations.translations[this.language].separate, 0, this.y() - 12, {
          align: "center",
          width: utils.mm2pt(210)
        });
      }
    }
    doc.fontSize(11);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].receipt, this.x(5), this.y(5), {
      align: "left",
      width: utils.mm2pt(52)
    });
    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].account, this.x(5), this.y(12), {
      lineGap: 1,
      width: utils.mm2pt(52)
    });
    doc.fontSize(8);
    doc.font("Helvetica");
    doc.text(`${utils.formatIBAN(this.data.creditor.account)}
${this.formatAddress(this.data.creditor)}`, {
      lineGap: -0.5,
      width: utils.mm2pt(52)
    });
    doc.fontSize(9);
    doc.moveDown();
    if (this.data.reference !== void 0) {
      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].reference, {
        lineGap: 1,
        width: utils.mm2pt(52)
      });
      doc.fontSize(8);
      doc.font("Helvetica");
      doc.text(utils.formatReference(this.data.reference), {
        lineGap: -0.5,
        width: utils.mm2pt(52)
      });
      doc.fontSize(9);
      doc.moveDown();
    }
    if (this.data.debtor !== void 0) {
      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].payableBy, {
        lineGap: 1,
        width: utils.mm2pt(52)
      });
      doc.fontSize(8);
      doc.font("Helvetica");
      doc.text(this.formatAddress(this.data.debtor), {
        lineGap: -0.5,
        width: utils.mm2pt(52)
      });
    } else {
      doc.fontSize(6);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].payableByName, {
        lineGap: 1,
        width: utils.mm2pt(52)
      });
      this.addRectangle(doc, 5, utils.pt2mm(doc.y - this.y()), 52, 20);
    }
    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].currency, this.x(5), this.y(68), {
      lineGap: 1,
      width: utils.mm2pt(15)
    });
    const amountXPosition = this.data.amount === void 0 ? 18 : 27;
    doc.text(translations.translations[this.language].amount, this.x(amountXPosition), this.y(68), {
      lineGap: 1,
      width: utils.mm2pt(52 - amountXPosition)
    });
    doc.fontSize(8);
    doc.font("Helvetica");
    doc.text(this.data.currency, this.x(5), this.y(71), {
      lineGap: -0.5,
      width: utils.mm2pt(15)
    });
    if (this.data.amount !== void 0) {
      doc.text(utils.formatAmount(this.data.amount), this.x(amountXPosition), this.y(71), {
        lineGap: -0.5,
        width: utils.mm2pt(52 - amountXPosition)
      });
    } else {
      this.addRectangle(doc, 27, 68, 30, 10);
    }
    doc.fontSize(6);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].acceptancePoint, this.x(5), this.y(82), {
      align: "right",
      height: utils.mm2pt(18),
      lineGap: 1,
      width: utils.mm2pt(52)
    });
    doc.fontSize(11);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].paymentPart, this.x(67), this.y(5), {
      align: "left",
      lineGap: 1,
      width: utils.mm2pt(51)
    });
    const qrData = qrCode.generateQRData(this.data);
    const qrCode$1 = qrCode.renderQRCode(qrData, "pdf", utils.mm2pt(46));
    doc.save();
    doc.translate(this.x(67), this.y(17));
    doc.addContent(qrCode$1);
    doc.fillColor("black");
    doc.fill();
    doc.restore();
    const swissCrossBackground = "M18.3 0.7L1.6 0.7 0.7 0.7 0.7 1.6 0.7 18.3 0.7 19.1 1.6 19.1 18.3 19.1 19.1 19.1 19.1 18.3 19.1 1.6 19.1 0.7Z";
    const swissCross = "M8.3 4H11.6V15H8.3V4Z M4.4 7.9H15.4V11.2H4.4V7.9Z";
    doc.save();
    doc.translate(this.x(86.5), this.y(36));
    doc.path(swissCrossBackground).undash().fillColor("black").lineWidth(1.42).strokeColor("white").fillAndStroke();
    doc.restore();
    doc.save();
    doc.translate(this.x(86.5), this.y(36));
    doc.path(swissCross).fillColor("white").fill();
    doc.restore();
    doc.fillColor("black");
    doc.fontSize(8);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].currency, this.x(67), this.y(68), {
      lineGap: 1,
      width: utils.mm2pt(15)
    });
    doc.text(translations.translations[this.language].amount, this.x(89), this.y(68), {
      width: utils.mm2pt(29)
    });
    doc.fontSize(10);
    doc.font("Helvetica");
    doc.text(this.data.currency, this.x(67), this.y(72), {
      lineGap: -0.5,
      width: utils.mm2pt(15)
    });
    if (this.data.amount !== void 0) {
      doc.text(utils.formatAmount(this.data.amount), this.x(89), this.y(72), {
        lineGap: -0.5,
        width: utils.mm2pt(29)
      });
    } else {
      this.addRectangle(doc, 78, 72, 40, 15);
    }
    if (this.data.av1 !== void 0) {
      const [scheme, data] = this.data.av1.split(/(\/.+)/);
      doc.fontSize(7);
      doc.font("Helvetica-Bold");
      doc.text(scheme, this.x(67), this.y(90), {
        continued: true,
        height: utils.mm2pt(3),
        lineGap: 1,
        width: utils.mm2pt(138)
      });
      doc.font("Helvetica");
      doc.text(this.data.av1.length > 90 ? `${data.substring(0, 87)}...` : data, {
        continued: false
      });
    }
    if (this.data.av2 !== void 0) {
      const [scheme, data] = this.data.av2.split(/(\/.+)/);
      doc.fontSize(7);
      doc.font("Helvetica-Bold");
      doc.text(scheme, this.x(67), this.y(93), {
        continued: true,
        height: utils.mm2pt(3),
        lineGap: 1,
        width: utils.mm2pt(138)
      });
      doc.font("Helvetica");
      doc.text(this.data.av2.length > 90 ? `${data.substring(0, 87)}...` : data, {
        lineGap: -0.5
      });
    }
    doc.fontSize(8);
    doc.font("Helvetica-Bold");
    doc.text(translations.translations[this.language].account, this.x(118), this.y(5), {
      lineGap: 1,
      width: utils.mm2pt(87)
    });
    doc.fontSize(10);
    doc.font("Helvetica");
    doc.text(`${utils.formatIBAN(this.data.creditor.account)}
${this.formatAddress(this.data.creditor)}`, {
      lineGap: -0.75,
      width: utils.mm2pt(87)
    });
    doc.fontSize(9);
    doc.moveDown();
    if (this.data.reference !== void 0) {
      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].reference, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });
      doc.fontSize(10);
      doc.font("Helvetica");
      doc.text(utils.formatReference(this.data.reference), {
        lineGap: -0.75,
        width: utils.mm2pt(87)
      });
      doc.fontSize(9);
      doc.moveDown();
    }
    if (this.data.message !== void 0 || this.data.additionalInformation !== void 0) {
      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].additionalInformation, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });
      doc.fontSize(10);
      doc.font("Helvetica");
      const options = {
        lineGap: -0.75,
        width: utils.mm2pt(87)
      };
      const singleLineHeight = doc.heightOfString("A", options);
      const referenceType = utils.getReferenceType(this.data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const linesOfAdditionalInformation = this.data.additionalInformation !== void 0 ? doc.heightOfString(this.data.additionalInformation, options) / singleLineHeight : 0;
      if (this.data.additionalInformation !== void 0) {
        if (referenceType === "QRR" || referenceType === "SCOR") {
          if (this.data.message !== void 0) {
            doc.text(this.data.message, __spreadProps(__spreadValues({}, options), { ellipsis: true, height: singleLineHeight, lineBreak: false }));
          }
        } else {
          if (this.data.message !== void 0) {
            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            doc.text(this.data.message, __spreadProps(__spreadValues({}, options), { ellipsis: true, height: singleLineHeight * maxLinesOfMessage, lineBreak: true }));
          }
        }
        doc.text(this.data.additionalInformation, options);
      } else if (this.data.message !== void 0) {
        doc.text(this.data.message, __spreadProps(__spreadValues({}, options), { ellipsis: true, height: singleLineHeight * maxLines, lineBreak: true }));
      }
      doc.fontSize(9);
      doc.moveDown();
    }
    if (this.data.debtor !== void 0) {
      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].payableBy, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });
      doc.fontSize(10);
      doc.font("Helvetica");
      doc.text(this.formatAddress(this.data.debtor), {
        lineGap: -0.75,
        width: utils.mm2pt(87)
      });
    } else {
      doc.fontSize(8);
      doc.font("Helvetica-Bold");
      doc.text(translations.translations[this.language].payableByName, {
        lineGap: 1,
        width: utils.mm2pt(87)
      });
      this.addRectangle(doc, 118, utils.pt2mm(doc.y - this.y()), 65, 25);
    }
  }
  formatAddress(data) {
    const countryPrefix = data.country !== "CH" ? `${data.country} - ` : "";
    if (data.buildingNumber !== void 0) {
      return `${data.name}
${data.address} ${data.buildingNumber}
${countryPrefix}${data.zip} ${data.city}`;
    }
    return `${data.name}
${data.address}
${countryPrefix}${data.zip} ${data.city}`;
  }
  addRectangle(doc, x, y, width, height) {
    const length = 3;
    doc.moveTo(this.x(x + length), this.y(y)).lineTo(this.x(x), this.y(y)).lineTo(this.x(x), this.y(y + length)).moveTo(this.x(x), this.y(y + height - length)).lineTo(this.x(x), this.y(y + height)).lineTo(this.x(x + length), this.y(y + height)).moveTo(this.x(x + width - length), this.y(y + height)).lineTo(this.x(x + width), this.y(y + height)).lineTo(this.x(x + width), this.y(y + height - length)).moveTo(this.x(x + width), this.y(y + length)).lineTo(this.x(x + width), this.y(y)).lineTo(this.x(x + width - length), this.y(y)).lineWidth(0.75).undash().strokeColor("black").stroke();
  }
  isSpaceSufficient(doc, xPosition, yPosition, width, height) {
    if (!doc.page) {
      return false;
    }
    return Math.round(xPosition + width) <= Math.round(doc.page.width) && Math.round(doc.y + height) <= Math.round(doc.page.height) && Math.round(yPosition + height) <= Math.round(doc.page.height);
  }
}
exports.SwissQRBill = SwissQRBill;
