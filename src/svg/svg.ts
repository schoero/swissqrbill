import { Data, Languages, Debtor, Creditor, SVGOptions } from "../shared/types";
import { validateData, cleanData } from "../shared/shared";
import { calculateTextWidth } from "./characterWidth.js";
import { SVG, calc } from "svg-engine";
import * as utils from "../shared/utils";
import translations from "../shared/translations";
import generateQRCode from "../shared/qr-code.js";

export class SVG_ {

  private _element: SVG;
  private _data: Data;

  private _language: Languages = "DE";

  constructor(data: Data, options?: SVGOptions) {

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
    }


    //-- Create SVG

    this._element = new SVG();
    this._element.width("210mm");
    this._element.height("105mm");

    this._render();

  }


  public get outerHTML(): string {
    return this._element.outerHTML;
  }


  private _render() {

    const formattedCreditorAddress = this._formatAddress(this._data.creditor);
    let receiptLineCount = 0;
    let paymentPartLineCount = 0;


    //-- Vertical line

    this._element.addLine("62mm", "0mm", "62mm", "105mm")
      .stroke(1, "dashed", "black");


    //-- Scissors

    const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
    const scissorsCenter = "M5.301 10.8527C5.886 10.3677 5.866 9.49269 5.614 8.83869L4.075 4.73269C4.728 3.53869 4.541 2.35869 4.859 2.35869C5.108 2.35869 5.053 2.58669 5.701 2.55269C6.323 2.51969 6.783 1.87069 6.742 1.25769C6.746 0.643692 6.275 0.00769203 5.627 0.00269203C4.974 -0.043308 4.367 0.506692 4.324 1.15569C4.211 1.91669 4.672 3.26469 3.539 3.89669C2.67 3.42569 2.667 2.58969 2.711 1.83369C2.747 1.20669 2.567 0.452692 1.951 0.153692C1.36 -0.135308 0.519004 0.147692 0.338004 0.811692C0.0920042 1.48169 0.403004 2.40169 1.173 2.56169C1.767 2.68469 2.046 2.26369 2.262 2.42569C2.425 2.54769 2.33 3.32069 2.949 4.69969L1.381 9.14569C1.225 9.70769 1.23 10.3947 1.782 10.8917L3.525 6.28169L5.301 10.8527ZM6.251 1.69869C5.89 2.34569 4.909 2.29269 4.719 1.62069C4.507 1.01269 5.098 0.234692 5.758 0.428692C6.299 0.542692 6.498 1.25569 6.251 1.69869ZM2.242 1.72669C1.993 2.40169 0.850004 2.28769 0.696004 1.60069C0.538004 1.14469 0.765004 0.493692 1.302 0.447692C1.955 0.358692 2.544 1.12569 2.242 1.72669Z";

    // Todo: Add scissors


    //-- Receipt

    const receiptContainer = this._element.addSVG()
      .x("5mm")
      .y("5mm");

    const receiptTextContainer = receiptContainer.addText();

    receiptTextContainer.addTSpan(translations[this._language].receipt)
      .x(0)
      .y(0)
      .dy("11pt")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("11pt");


    //-- Creditor

    receiptTextContainer.addTSpan(translations[this._language].account)
      .x(0)
      .y("7mm")
      .dy("9pt")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("6pt");

    receiptTextContainer.addTSpan(utils.formatIBAN(this._data.creditor.account))
      .x(0)
      .dy("9pt")
      .fontFamily("Arial")
      .fontWeight("normal")
      .fontSize("8pt");
    receiptLineCount++;

    let receiptCreditorAddressLines: Array<string> = [];
    for(const line of formattedCreditorAddress){
      const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
      receiptCreditorAddressLines = [...receiptCreditorAddressLines, ...messageLines];
    }

    for(const line of receiptCreditorAddressLines){
      receiptLineCount++;
      receiptTextContainer.addTSpan(line)
        .x(0)
        .dy("9pt")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("8pt");
    }


    //-- Reference

    if(this._data.reference !== undefined){

      receiptTextContainer.addTSpan(translations[this._language].reference)
        .x(0)
        .dy("15pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("6pt");

      receiptTextContainer.addTSpan(utils.formatIBAN(this._data.reference))
        .x(0)
        .dy("9pt")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("8pt");
      receiptLineCount++;

    }


    //-- Debtor

    if(this._data.debtor !== undefined){

      const formattedDebtorAddress = this._formatAddress(this._data.debtor);

      receiptTextContainer.addTSpan(translations[this._language].payableBy)
        .x(0)
        .dy("15pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("6pt");

      let receiptDebtorAddressLines: Array<string> = [];
      for(const line of formattedDebtorAddress){
        const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
        receiptDebtorAddressLines = [...receiptDebtorAddressLines, ...messageLines];
      }

      for(const line of receiptDebtorAddressLines){
        receiptTextContainer.addTSpan(line)
          .x(0)
          .dy("9pt")
          .fontFamily("Arial")
          .fontWeight("normal")
          .fontSize("8pt");
      }

    } else {


      //- Add rectangle

      receiptTextContainer.addTSpan(translations[this._language].payableByName)
        .x(0)
        .dy("15pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("6pt");

      const referenceHeight = this._data.reference !== undefined ? "15pt" : "0";
      this._addRectangle(5, calc(`12mm + 9pt + (${receiptLineCount} * 9pt) + ${referenceHeight} + 15pt + 1mm`, "mm"), 52, 20);

    }


    //-- Amount

    const amountContainer = receiptContainer.addText()
      .y("63mm");

    amountContainer.addTSpan(translations[this._language].currency)
      .x(0)
      .dy("6pt")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("6pt");

    amountContainer.addTSpan(translations[this._language].amount)
      .x("13mm")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("6pt");

    amountContainer.addTSpan(this._data.currency)
      .x(0)
      .dy("11pt")
      .fontFamily("Arial")
      .fontWeight("normal")
      .fontSize("8pt");

    if(this._data.amount !== undefined){
      amountContainer.addTSpan(utils.formatAmount(this._data.amount))
        .x("13mm")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("8pt");
    } else {
      this._addRectangle(27, 68, 30, 10);
    }


    //-- Acceptance point

    amountContainer.addTSpan(translations[this._language].acceptancePoint)
      .x("52mm")
      .y("82mm")
      .textAlign("right")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("6pt");


    //-- Payment part middle column

    const paymentPartContainer = this._element.addSVG()
      .x("67mm")
      .y("5mm");

    paymentPartContainer.addText(translations[this._language].paymentPart)
      .x(0)
      .y(0)
      .dy("11pt")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("11pt");


    //-- QR Code

    this._renderQRCode();


    //-- Amount

    const paymentPartMiddleTextContainer = paymentPartContainer.addText()
      .y("63mm");

    paymentPartMiddleTextContainer.addTSpan(translations[this._language].currency)
      .x(0)
      .dy("8pt")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("8pt");

    paymentPartMiddleTextContainer.addTSpan(translations[this._language].amount)
      .x("20mm")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("8pt");

    paymentPartMiddleTextContainer.addTSpan(this._data.currency)
      .x(0)
      .dy("13pt")
      .fontFamily("Arial")
      .fontWeight("normal")
      .fontSize("10pt");

    if(this._data.amount !== undefined){
      paymentPartMiddleTextContainer.addTSpan(utils.formatAmount(this._data.amount))
        .x("20mm")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("10pt");
    } else {
      this._addRectangle(78, calc("68mm + 8pt + 5pt", "mm"), 40, 15);
    }


    //-- AV1 and AV2

    const alternativeSchemeContainer = paymentPartContainer.addText()
      .x(0)
      .y("90mm");

    if(this._data.av1 !== undefined){

      alternativeSchemeContainer.addTSpan("Name AV1:")
        .x(0)
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("7pt");

      alternativeSchemeContainer.addTSpan(this._data.av1.length > 87 ? this._data.av1.substr(0, 87) + "..." : this._data.av1)
        .x(0)
        .dx("15mm")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("7pt");

    }
    if(this._data.av2 !== undefined){

      alternativeSchemeContainer.addTSpan("Name AV2:")
        .x(0)
        .dy("8pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("7pt");

      alternativeSchemeContainer.addTSpan(this._data.av2.length > 87 ? this._data.av2.substr(0, 87) + "..." : this._data.av2)
        .x(0)
        .dx("15mm")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("7pt");

    }


    //-- Payment part right column

    const paymentPartDebtorContainer = this._element.addSVG()
      .x("118mm")
      .y("5mm");

    const paymentPartRightTextContainer = paymentPartDebtorContainer.addText();


    //-- Creditor

    paymentPartRightTextContainer.addTSpan(translations[this._language].account)
      .x(0)
      .y(0)
      .dy("8pt")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("8pt");

    paymentPartRightTextContainer.addTSpan(utils.formatIBAN(this._data.creditor.account))
      .x(0)
      .dy("11pt")
      .fontFamily("Arial")
      .fontWeight("normal")
      .fontSize("10pt");
    paymentPartLineCount++;

    let paymentPartCreditorAddressLines: Array<string> = [];
    for(const line of formattedCreditorAddress){
      const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
      paymentPartCreditorAddressLines = [...paymentPartCreditorAddressLines, ...messageLines];
    }

    for(const line of paymentPartCreditorAddressLines){
      paymentPartRightTextContainer.addTSpan(line)
        .x(0)
        .dy("11pt")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("10pt");
      paymentPartLineCount++;
    }


    //-- Reference

    if(this._data.reference !== undefined){

      paymentPartRightTextContainer.addTSpan(translations[this._language].reference)
        .x(0)
        .dy("19pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("8pt");

      paymentPartRightTextContainer.addTSpan(utils.formatIBAN(this._data.reference))
        .x(0)
        .dy("11pt")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("10pt");
      paymentPartLineCount++;

    }


    //-- Message / Additional information

    if(this._data.message !== undefined || this._data.additionalInformation !== undefined){

      paymentPartRightTextContainer.addTSpan(translations[this._language].additionalInformation)
        .x(0)
        .dy("19pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("8pt");

      const referenceType = utils.getReferenceType(this._data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const lengthInPixel = utils.mm2px(87);
      const linesOfMessage = this._getLineCountOfText(this._data.message, lengthInPixel, "10pt");
      const linesOfAdditionalInformation = this._getLineCountOfText(this._data.additionalInformation, lengthInPixel, "10pt");

      if(this._data.additionalInformation !== undefined){

        if(referenceType === "QRR" || referenceType === "SCOR"){

          // QRR and SCOR have 1 line for the message and 2 lines for the additional information

          if(this._data.message !== undefined){
            paymentPartRightTextContainer.addTSpan(this._elipsis(this._data.message, lengthInPixel, "10pt"))
              .x(0)
              .dy("11pt")
              .fontFamily("Arial")
              .fontWeight("normal")
              .fontSize("10pt");
            paymentPartLineCount++;
          }
        } else {

          // Non QRR and SCOR have 4 lines total available and the message should be shortened if necessary

          if(this._data.message !== undefined){

            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            const messageLines = this._fitTextToWidth(this._data.message, lengthInPixel, maxLinesOfMessage, "10pt");

            for(let i = 0; i < maxLinesOfMessage; i++){
              paymentPartRightTextContainer.addTSpan(messageLines[i])
                .x(0)
                .dy("11pt")
                .fontFamily("Arial")
                .fontWeight("normal")
                .fontSize("10pt");
              paymentPartLineCount++;
            }

          }


        }

        const additionalInformationLines = this._fitTextToWidth(this._data.additionalInformation, lengthInPixel, linesOfAdditionalInformation, "10pt");
        for(let i = 0; i < linesOfAdditionalInformation; i++){
          paymentPartRightTextContainer.addTSpan(additionalInformationLines[i])
            .x(0)
            .dy("11pt")
            .fontFamily("Arial")
            .fontWeight("normal")
            .fontSize("10pt");
          paymentPartLineCount++;
        }

      } else if(this._data.message !== undefined){
        const messageLines = this._fitTextToWidth(this._data.message, lengthInPixel, maxLines, "10pt");
        for(let i = 0; i < maxLines; i++){
          paymentPartRightTextContainer.addTSpan(messageLines[i])
            .x(0)
            .dy("11pt")
            .fontFamily("Arial")
            .fontWeight("normal")
            .fontSize("10pt");
          paymentPartLineCount++;
        }
      }

    }


    //-- Debtor

    if(this._data.debtor !== undefined){

      const formattedDebtorAddress = this._formatAddress(this._data.debtor);

      paymentPartRightTextContainer.addTSpan(translations[this._language].payableBy)
        .x(0)
        .dy("19pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("8pt");

      let paymentPartDebtorAddressLines: Array<string> = [];
      for(const line of formattedDebtorAddress){
        const messageLines = this._fitTextToWidth(line, utils.mm2px(52), 2, "8pt");
        paymentPartDebtorAddressLines = [...paymentPartDebtorAddressLines, ...messageLines];
      }

      for(const line of paymentPartDebtorAddressLines){
        paymentPartRightTextContainer.addTSpan(line)
          .x(0)
          .dy("11pt")
          .fontFamily("Arial")
          .fontWeight("normal")
          .fontSize("10pt");
      }

    } else {

      paymentPartRightTextContainer.addTSpan(translations[this._language].payableByName)
        .x(0)
        .dy("19pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("8pt");

      const referenceHeight = this._data.reference !== undefined ? "19pt" : "0";
      const additionalInformationHeight = this._data.additionalInformation !== undefined || this._data.message !== undefined ? "19pt" : "0";
      this._addRectangle(118, calc(`5mm + 8pt + (${paymentPartLineCount} * 11pt) + ${referenceHeight} + ${additionalInformationHeight} + 19pt + 1mm`, "mm"), 65, 25);

    }
  }


  private _renderQRCode() {

    const qrcode = generateQRCode(this._data, utils.mm2px(46));

    const qrcodeSVG = this._element.addSVG("46mm", "46mm")
      .y("17mm")
      .x("67mm");

    //-- Add QR Code

    qrcodeSVG.addPath(qrcode)
      .fill("black");


    //-- Add background

    qrcodeSVG.addRect("19mm", "19mm", "8mm", "8mm")
      .fill("white");
    qrcodeSVG.addRect("19.5mm", "19.5mm", "7mm", "7mm")
      .fill("black");


    //-- Add swiss cross

    qrcodeSVG.addRect("22.415mm", "21.055mm", "1.17mm", "3.89mm")
      .fill("white");
    qrcodeSVG.addRect("21.055mm", "22.415mm", "3.89mm", "1.17mm")
      .fill("white");

  }


  private _formatAddress(data: Debtor | Creditor): Array<string> {
    if(data.buildingNumber !== undefined){
      return [data.name, data.address + " " + data.buildingNumber, data.zip + " " + data.city];
    } else {
      return [data.name, data.address, data.zip + " " + data.city];
    }
  }


  private _getLineCountOfText(text: string | undefined, lengthInPixel: number, size: "8pt" | "10pt") {
    if(text === undefined){
      return 0;
    } else {
      let lines = 0;
      let remainder = calculateTextWidth(text, size);
      while(remainder > 1){
        lines++;
        remainder -= lengthInPixel;
      }
      return lines;
    }
  }


  private _fitTextToWidth(text: string, lengthInPixel: number, maxLines: number, size: "8pt" | "10pt"): Array<string> {

    const remainder = text.split(/ |-/g);
    let lines: Array<string> = [];
    let currentLine = "";

    const checkCurrentLine = (currentLine: string): { lines: Array<string>, leftover: string } => {
      const lines: Array<string> = [];
      let leftover: string = "";
      if(calculateTextWidth(currentLine, size) > lengthInPixel){
        const currentWordRemainder = currentLine.split("");
        let currentWord = "";
        while(currentWordRemainder.length > 0){
          if(calculateTextWidth(currentWord, size) <= lengthInPixel){
            currentWord += currentWordRemainder.shift();
          } else {
            lines.push(currentWord);
            currentWord = "";
          }
        }
        if(currentWord !== ""){
          leftover = currentWord;
        }
      } else {
        lines.push(currentLine);
      }
      return { lines, leftover };
    };

    while(remainder.length > 0){
      const nextWord = remainder.shift() + " ";
      if(calculateTextWidth(currentLine + nextWord, size) <= lengthInPixel){
        currentLine += nextWord;
      } else {
        if(currentLine !== ""){
          const { lines: newLines, leftover } = checkCurrentLine(currentLine);
          lines.push(...newLines);
          currentLine = leftover + nextWord;
        } else {
          currentLine = nextWord;
        }
      }
    }
    if(currentLine !== "" && currentLine !== " "){
      const { lines: newLines, leftover } = checkCurrentLine(currentLine);
      lines.push(...newLines);
      if(leftover !== ""){
        lines.push(leftover);
      }
    }

    if(lines.length > maxLines){
      lines = lines.slice(0, maxLines);
      lines[lines.length - 1] = this._elipsis(lines[lines.length - 1], lengthInPixel, size);
    }

    return lines;

  }


  private _elipsis(text: string, lengthInPixel: number, size: "8pt" | "10pt"): string {
    let result = "";
    if(calculateTextWidth(text, size) > lengthInPixel){
      for(let c = 0; c < text.length; c++){
        if(calculateTextWidth(result + text[c] + "...", size) <= lengthInPixel){
          result += text[c];
        } else {
          break;
        }
      }
    } else {
      return text;
    }
    if(result.substr(-1) === " "){
      result = result.slice(0, -1);
    }
    return result + "...";
  }


  private _addRectangle(x: number, y: number, width: number, height: number) {

    const container = this._element.addSVG(width + "mm", height + "mm");
    container.x(x + "mm").y(y + "mm");

    const length = 3;

    container.addLine("0mm", "0mm", length + "mm", "0mm").stroke(".75pt", "solid", "black");
    container.addLine(width - length + "mm", "0mm", width + "mm", "0mm").stroke(".75pt", "solid", "black");
    container.addLine(width + "mm", "0mm", width + "mm", length + "mm").stroke(".75pt", "solid", "black");
    container.addLine(width + "mm", height - length + "mm", width + "mm", height + "mm").stroke(".75pt", "solid", "black");
    container.addLine(width - length + "mm", height + "mm", width + "mm", height + "mm").stroke(".75pt", "solid", "black");
    container.addLine("0mm", height + "mm", length + "mm", height + "mm").stroke(".75pt", "solid", "black");
    container.addLine("0mm", height - length + "mm", "0mm", height + "mm").stroke(".75pt", "solid", "black");
    container.addLine("0mm", "0mm", "0mm", length + "mm").stroke(".75pt", "solid", "black");

    return container;

  }
}