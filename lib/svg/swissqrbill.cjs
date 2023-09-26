"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const svgEngine = require("svg-engine");
const cleaner = require("../shared/cleaner.cjs");
const qrCode = require("../shared/qr-code.cjs");
const translations = require("../shared/translations.cjs");
const utils = require("../shared/utils.cjs");
const validator = require("../shared/validator.cjs");
const characterWidth = require("./characterWidth.cjs");
class SwissQRBill {
  constructor(data, options) {
    this._language = "DE";
    this._data = data;
    this._data = cleaner.cleanData(this._data);
    validator.validateData(this._data);
    if (options !== void 0) {
      if (options.language !== void 0) {
        this._language = options.language;
      }
    }
    this.instance = new svgEngine.SVG();
    this.instance.width("210mm");
    this.instance.height("105mm");
    this._render();
  }
  get outerHTML() {
    return this.instance.outerHTML;
  }
  /**
   * Outputs the SVG as a string.
   * @returns The outerHTML of the SVG as a `string`.
   */
  toString() {
    return this.outerHTML;
  }
  /**
   * Returns the SVG element.
   * @readonly
   * @returns The SVG element.
   */
  // public get element(): SVGElement {
  //   return this.instance.element as unknown as SVGElement;
  // }
  _render() {
    const formattedCreditorAddress = this._formatAddress(this._data.creditor);
    let receiptLineCount = 0;
    let paymentPartLineCount = 0;
    this.instance.addRect(0, 0, "100%", "100%").fill("#fff");
    this.instance.addLine("62mm", "0mm", "62mm", "105mm").stroke(1, "dashed", "black");
    const scissorsCenter = "M8.55299 18.3969C9.54465 17.5748 9.51074 16.0915 9.08357 14.9829L6.47473 8.02261C7.58167 5.9986 7.26467 3.99833 7.80373 3.99833C8.22582 3.99833 8.13259 4.38482 9.23105 4.32719C10.2854 4.27125 11.0652 3.1711 10.9957 2.13197C11.0025 1.09115 10.2041 0.0130391 9.1056 0.00456339C7.99867 -0.0734135 6.96972 0.858918 6.89683 1.95907C6.70527 3.24907 7.48674 5.53413 5.56613 6.60547C4.09305 5.80705 4.08797 4.38991 4.16255 3.10838C4.22358 2.04552 3.91845 0.76738 2.87424 0.260531C1.87241 -0.229367 0.446794 0.25036 0.139972 1.37594C-0.277034 2.51168 0.250156 4.07122 1.55541 4.34244C2.56233 4.55095 3.03528 3.83729 3.40143 4.1119C3.67774 4.31871 3.5167 5.62906 4.566 7.96667L1.908 15.5033C1.64356 16.456 1.65204 17.6206 2.58776 18.463L5.5424 10.6484L8.55299 18.3969ZM10.1634 2.87953C9.55143 3.97629 7.88849 3.88645 7.56641 2.74731C7.20704 1.71666 8.20887 0.397838 9.32767 0.726697C10.2447 0.919943 10.5821 2.12858 10.1634 2.87953ZM3.36753 2.927C2.94544 4.07122 1.00789 3.87797 0.746835 2.71341C0.479001 1.94042 0.8638 0.836881 1.77409 0.758904C2.88102 0.608036 3.87946 1.90821 3.36753 2.927Z";
    const scissorsSVG = this.instance.addSVG("11px", "19px").x(svgEngine.calc("62mm - 5.25px")).y("30pt");
    scissorsSVG.addPath(scissorsCenter).fill("black");
    const receiptContainer = this.instance.addSVG().x("5mm").y("5mm");
    const receiptTextContainer = receiptContainer.addText();
    receiptTextContainer.addTSpan(translations.translations[this._language].receipt).x(0).y(0).dy("11pt").fontFamily("Arial").fontWeight("bold").fontSize("11pt");
    receiptTextContainer.addTSpan(translations.translations[this._language].account).x(0).y("7mm").dy("9pt").fontFamily("Arial").fontWeight("bold").fontSize("6pt");
    receiptTextContainer.addTSpan(utils.formatIBAN(this._data.creditor.account)).x(0).dy("9pt").fontFamily("Arial").fontWeight("normal").fontSize("8pt");
    receiptLineCount++;
    let receiptCreditorAddressLines = [];
    for (const line of formattedCreditorAddress) {
      const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
      receiptCreditorAddressLines = [...receiptCreditorAddressLines, ...messageLines];
    }
    for (const line of receiptCreditorAddressLines) {
      receiptLineCount++;
      receiptTextContainer.addTSpan(line).x(0).dy("9pt").fontFamily("Arial").fontWeight("normal").fontSize("8pt");
    }
    if (this._data.reference !== void 0) {
      receiptTextContainer.addTSpan(translations.translations[this._language].reference).x(0).dy("18pt").fontFamily("Arial").fontWeight("bold").fontSize("6pt");
      receiptTextContainer.addTSpan(utils.formatReference(this._data.reference)).x(0).dy("9pt").fontFamily("Arial").fontWeight("normal").fontSize("8pt");
      receiptLineCount++;
    }
    if (this._data.debtor !== void 0) {
      const formattedDebtorAddress = this._formatAddress(this._data.debtor);
      receiptTextContainer.addTSpan(translations.translations[this._language].payableBy).x(0).dy("18pt").fontFamily("Arial").fontWeight("bold").fontSize("6pt");
      let receiptDebtorAddressLines = [];
      for (const line of formattedDebtorAddress) {
        const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
        receiptDebtorAddressLines = [...receiptDebtorAddressLines, ...messageLines];
      }
      for (const line of receiptDebtorAddressLines) {
        receiptTextContainer.addTSpan(line).x(0).dy("9pt").fontFamily("Arial").fontWeight("normal").fontSize("8pt");
      }
    } else {
      receiptTextContainer.addTSpan(translations.translations[this._language].payableByName).x(0).dy("18pt").fontFamily("Arial").fontWeight("bold").fontSize("6pt");
      const referenceHeight = this._data.reference !== void 0 ? "18pt" : "0";
      this._addRectangle(5, svgEngine.calc(`12mm + 9pt + (${receiptLineCount} * 9pt) + ${referenceHeight} + 18pt + 1mm`, "mm"), 52, 20);
    }
    const amountContainer = receiptContainer.addText().y("63mm");
    amountContainer.addTSpan(translations.translations[this._language].currency).x(0).dy("6pt").fontFamily("Arial").fontWeight("bold").fontSize("6pt");
    const amountXPosition = this._data.amount === void 0 ? 13 : 22;
    amountContainer.addTSpan(translations.translations[this._language].amount).x(`${amountXPosition}mm`).fontFamily("Arial").fontWeight("bold").fontSize("6pt");
    amountContainer.addTSpan(this._data.currency).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("8pt");
    if (this._data.amount !== void 0) {
      amountContainer.addTSpan(utils.formatAmount(this._data.amount)).x(`${amountXPosition}mm`).fontFamily("Arial").fontWeight("normal").fontSize("8pt");
    } else {
      this._addRectangle(27, 68, 30, 10);
    }
    amountContainer.addTSpan(translations.translations[this._language].acceptancePoint).x("52mm").y("82mm").textAlign("right").fontFamily("Arial").fontWeight("bold").fontSize("6pt");
    const paymentPartContainer = this.instance.addSVG().x("67mm").y("5mm");
    paymentPartContainer.addText(translations.translations[this._language].paymentPart).x(0).y(0).dy("11pt").fontFamily("Arial").fontWeight("bold").fontSize("11pt");
    this._renderQRCode();
    const paymentPartMiddleTextContainer = paymentPartContainer.addText().y("63mm");
    paymentPartMiddleTextContainer.addTSpan(translations.translations[this._language].currency).x(0).dy("8pt").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
    paymentPartMiddleTextContainer.addTSpan(translations.translations[this._language].amount).x("22mm").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
    paymentPartMiddleTextContainer.addTSpan(this._data.currency).x(0).dy("13pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
    if (this._data.amount !== void 0) {
      paymentPartMiddleTextContainer.addTSpan(utils.formatAmount(this._data.amount)).x("22mm").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
    } else {
      this._addRectangle(78, svgEngine.calc("68mm + 8pt + 5pt", "mm"), 40, 15);
    }
    const alternativeSchemeContainer = paymentPartContainer.addText().x(0).y("90mm");
    if (this._data.av1 !== void 0) {
      const [scheme, data] = this._data.av1.split(/(\/.+)/);
      alternativeSchemeContainer.addTSpan(scheme).x(0).fontFamily("Arial").fontWeight("bold").fontSize("7pt");
      alternativeSchemeContainer.addTSpan(this._data.av1.length > 90 ? `${data.substr(0, 87)}...` : data).fontFamily("Arial").fontWeight("normal").fontSize("7pt");
    }
    if (this._data.av2 !== void 0) {
      const [scheme, data] = this._data.av2.split(/(\/.+)/);
      alternativeSchemeContainer.addTSpan(scheme).x(0).dy("8pt").fontFamily("Arial").fontWeight("bold").fontSize("7pt");
      alternativeSchemeContainer.addTSpan(this._data.av2.length > 90 ? `${data.substr(0, 87)}...` : data).fontFamily("Arial").fontWeight("normal").fontSize("7pt");
    }
    const paymentPartDebtorContainer = this.instance.addSVG().x("118mm").y("5mm");
    const paymentPartRightTextContainer = paymentPartDebtorContainer.addText();
    paymentPartRightTextContainer.addTSpan(translations.translations[this._language].account).x(0).y(0).dy("11pt").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
    paymentPartRightTextContainer.addTSpan(utils.formatIBAN(this._data.creditor.account)).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
    paymentPartLineCount++;
    let paymentPartCreditorAddressLines = [];
    for (const line of formattedCreditorAddress) {
      const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
      paymentPartCreditorAddressLines = [...paymentPartCreditorAddressLines, ...messageLines];
    }
    for (const line of paymentPartCreditorAddressLines) {
      paymentPartRightTextContainer.addTSpan(line).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
      paymentPartLineCount++;
    }
    if (this._data.reference !== void 0) {
      paymentPartRightTextContainer.addTSpan(translations.translations[this._language].reference).x(0).dy("22pt").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
      paymentPartRightTextContainer.addTSpan(utils.formatReference(this._data.reference)).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
      paymentPartLineCount++;
    }
    if (this._data.message !== void 0 || this._data.additionalInformation !== void 0) {
      paymentPartRightTextContainer.addTSpan(translations.translations[this._language].additionalInformation).x(0).dy("22pt").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
      const referenceType = utils.getReferenceType(this._data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const lengthInPixel = utils.mm2px(87);
      this._getLineCountOfText(this._data.message, lengthInPixel, "10pt");
      const linesOfAdditionalInformation = this._getLineCountOfText(this._data.additionalInformation, lengthInPixel, "10pt");
      if (this._data.additionalInformation !== void 0) {
        if (referenceType === "QRR" || referenceType === "SCOR") {
          if (this._data.message !== void 0) {
            paymentPartRightTextContainer.addTSpan(this._ellipsis(this._data.message, lengthInPixel, "10pt")).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
            paymentPartLineCount++;
          }
        } else {
          if (this._data.message !== void 0) {
            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            const messageLines = this._fitTextToWidth(this._data.message, lengthInPixel, maxLinesOfMessage, "10pt");
            for (let i = 0; i < maxLinesOfMessage; i++) {
              paymentPartRightTextContainer.addTSpan(messageLines[i]).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
              paymentPartLineCount++;
            }
          }
        }
        const additionalInformationLines = this._fitTextToWidth(this._data.additionalInformation, lengthInPixel, linesOfAdditionalInformation, "10pt");
        for (let i = 0; i < linesOfAdditionalInformation; i++) {
          paymentPartRightTextContainer.addTSpan(additionalInformationLines[i]).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
          paymentPartLineCount++;
        }
      } else if (this._data.message !== void 0) {
        const messageLines = this._fitTextToWidth(this._data.message, lengthInPixel, maxLines, "10pt");
        for (let i = 0; i < maxLines; i++) {
          paymentPartRightTextContainer.addTSpan(messageLines[i]).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
          paymentPartLineCount++;
        }
      }
    }
    if (this._data.debtor !== void 0) {
      const formattedDebtorAddress = this._formatAddress(this._data.debtor);
      paymentPartRightTextContainer.addTSpan(translations.translations[this._language].payableBy).x(0).dy("22pt").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
      let paymentPartDebtorAddressLines = [];
      for (const line of formattedDebtorAddress) {
        const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
        paymentPartDebtorAddressLines = [...paymentPartDebtorAddressLines, ...messageLines];
      }
      for (const line of paymentPartDebtorAddressLines) {
        paymentPartRightTextContainer.addTSpan(line).x(0).dy("11pt").fontFamily("Arial").fontWeight("normal").fontSize("10pt");
      }
    } else {
      paymentPartRightTextContainer.addTSpan(translations.translations[this._language].payableByName).x(0).dy("22pt").fontFamily("Arial").fontWeight("bold").fontSize("8pt");
      const referenceHeight = this._data.reference !== void 0 ? "22pt" : "0";
      const additionalInformationHeight = this._data.additionalInformation !== void 0 || this._data.message !== void 0 ? "22pt" : "0";
      this._addRectangle(118, svgEngine.calc(`5mm + 11pt + (${paymentPartLineCount} * 11pt) + ${referenceHeight} + ${additionalInformationHeight} + 22pt + 1mm`, "mm"), 65, 25);
    }
  }
  _renderQRCode() {
    const qrData = qrCode.generateQRData(this._data);
    const qrCode$1 = qrCode.renderQRCode(qrData, "svg", utils.mm2px(46), 0, 0);
    const qrCodeSVG = this.instance.addSVG("46mm", "46mm").y("17mm").x("67mm");
    qrCodeSVG.addPath(qrCode$1).fill("black");
    qrCodeSVG.addRect("19mm", "19mm", "8mm", "8mm").fill("white");
    qrCodeSVG.addRect("19.5mm", "19.5mm", "7mm", "7mm").fill("black");
    qrCodeSVG.addRect("22.415mm", "21.055mm", "1.17mm", "3.89mm").fill("white");
    qrCodeSVG.addRect("21.055mm", "22.415mm", "3.89mm", "1.17mm").fill("white");
  }
  _formatAddress(data) {
    const countryPrefix = data.country !== "CH" ? `${data.country} - ` : "";
    if (data.buildingNumber !== void 0) {
      return [data.name, `${data.address} ${data.buildingNumber}`, `${countryPrefix}${data.zip} ${data.city}`];
    } else {
      return [data.name, data.address, `${countryPrefix}${data.zip} ${data.city}`];
    }
  }
  _getLineCountOfText(text, lengthInPixel, size) {
    if (text === void 0) {
      return 0;
    } else {
      let lines = 0;
      let remainder = characterWidth.calculateTextWidth(text, size);
      while (remainder > 1) {
        lines++;
        remainder -= lengthInPixel;
      }
      return lines;
    }
  }
  _fitTextToWidth(text, lengthInPixel, maxLines, size) {
    var _a;
    const remainder = text.split(/([ |-])/g);
    let lines = [];
    let currentLine = "";
    const checkCurrentLine = (currentLine2) => {
      const lines2 = [];
      let leftover = "";
      if (characterWidth.calculateTextWidth(currentLine2, size) > lengthInPixel) {
        const currentWordRemainder = currentLine2.split("");
        let currentWord = "";
        while (currentWordRemainder.length > 0) {
          if (characterWidth.calculateTextWidth(currentWord, size) <= lengthInPixel) {
            currentWord += currentWordRemainder.shift();
          } else {
            lines2.push(currentWord);
            currentWord = "";
          }
        }
        if (currentWord !== "") {
          leftover = currentWord;
        }
      } else {
        lines2.push(currentLine2);
      }
      return { leftover, lines: lines2 };
    };
    while (remainder.length > 0) {
      const nextWord = remainder.shift();
      const separator = (_a = remainder.shift()) != null ? _a : "";
      if (characterWidth.calculateTextWidth(currentLine + nextWord + separator, size) <= lengthInPixel) {
        currentLine += nextWord + separator;
      } else {
        if (currentLine !== "") {
          const { leftover, lines: newLines } = checkCurrentLine(currentLine);
          lines.push(...newLines);
          currentLine = leftover + nextWord + separator;
        } else {
          currentLine = nextWord + separator;
        }
      }
    }
    if (currentLine !== "" && currentLine !== " ") {
      const { leftover, lines: newLines } = checkCurrentLine(currentLine);
      lines.push(...newLines);
      if (leftover !== "") {
        lines.push(leftover);
      }
    }
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[lines.length - 1] = this._ellipsis(lines[lines.length - 1], lengthInPixel, size);
    }
    return lines;
  }
  _ellipsis(text, lengthInPixel, size) {
    let result = "";
    if (characterWidth.calculateTextWidth(text, size) > lengthInPixel) {
      for (let c = 0; c < text.length; c++) {
        if (characterWidth.calculateTextWidth(`${result}${text[c]}...`, size) <= lengthInPixel) {
          result += text[c];
        } else {
          break;
        }
      }
    } else {
      return text;
    }
    if (result.substr(-1) === " ") {
      result = result.slice(0, -1);
    }
    return `${result}...`;
  }
  _addRectangle(x, y, width, height) {
    const container = this.instance.addSVG(`${width}mm`, `${height}mm`);
    container.x(`${x}mm`).y(`${y}mm`);
    const length = 3;
    container.addLine("0mm", "0mm", `${length}mm`, "0mm").stroke(".75pt", "solid", "black");
    container.addLine(`${width - length}mm`, "0mm", `${width}mm`, "0mm").stroke(".75pt", "solid", "black");
    container.addLine(`${width}mm`, "0mm", `${width}mm`, `${length}mm`).stroke(".75pt", "solid", "black");
    container.addLine(`${width}mm`, `${height - length}mm`, `${width}mm`, `${height}mm`).stroke(".75pt", "solid", "black");
    container.addLine(`${width - length}mm`, `${height}mm`, `${width}mm`, `${height}mm`).stroke(".75pt", "solid", "black");
    container.addLine("0mm", `${height}mm`, `${length}mm`, `${height}mm`).stroke(".75pt", "solid", "black");
    container.addLine("0mm", `${height - length}mm`, "0mm", `${height}mm`).stroke(".75pt", "solid", "black");
    container.addLine("0mm", "0mm", "0mm", `${length}mm`).stroke(".75pt", "solid", "black");
    return container;
  }
}
exports.SwissQRBill = SwissQRBill;
