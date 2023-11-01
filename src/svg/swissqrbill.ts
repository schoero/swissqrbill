import { calc, SVG } from "svg-engine";

import { cleanData } from "swissqrbill:shared:cleaner";
import { translations } from "swissqrbill:shared:translations";
import { validateData } from "swissqrbill:shared:validator";
import { calculateTextWidth } from "swissqrbill:svg:character-width";
import { SwissQRCode } from "swissqrbill:svg:swissqrcode";
import { formatAmount, formatIBAN, formatReference, getReferenceType, mm2px } from "swissqrbill:utils";

import type { Creditor, Data, Debtor, FontName, Language, SVGOptions } from "swissqrbill:types";


export class SwissQRBill {

  protected instance: SVG;

  private scissors: boolean = true;
  private outlines: boolean = true;
  private language: Language = "DE";
  private font: FontName = "Arial";
  private data: Data;


  constructor(data: Data, options?: SVGOptions) {

    this.data = data;

    // Clean data (remove line breaks and unnecessary white spaces)
    this.data = cleanData(this.data);

    // Validate data
    validateData(this.data);

    // Apply options
    this.language = options?.language !== undefined ? options.language : this.language;
    this.outlines = options?.outlines !== undefined ? options.outlines : this.outlines;
    this.font = options?.fontName !== undefined ? options.fontName : this.font;
    this.scissors = options?.scissors !== undefined ? options.scissors : this.scissors;

    // Create SVG
    this.instance = new SVG();
    this.instance.width("210mm");
    this.instance.height("105mm");

    this._render();

  }


  public get outerHTML(): string {
    return this.instance.outerHTML;
  }


  /**
   * Outputs the SVG as a string.
   * @returns The outerHTML of the SVG as a `string`.
   */
  public toString(): string {
    return this.outerHTML;
  }


  /**
   * Returns the SVG element.
   * @readonly
   * @returns The SVG element.
   */
  public get element(): SVGElement {
    return this.instance.element as unknown as SVGElement;
  }


  private _render() {

    const formattedCreditorAddress = this._formatAddress(this.data.creditor);
    let receiptLineCount = 0;
    let paymentPartLineCount = 0;

    // Background image
    this.instance.addRect(0, 0, "100%", "100%")
      .fill("#fff");

    // Vertical line
    if(this.outlines){
      this.instance.addLine("62mm", "0mm", "62mm", "105mm")
        .stroke(1, "dashed", "black");
    }

    // Scissors
    if(this.scissors){
      const scissorsCenter = "M8.55299 18.3969C9.54465 17.5748 9.51074 16.0915 9.08357 14.9829L6.47473 8.02261C7.58167 5.9986 7.26467 3.99833 7.80373 3.99833C8.22582 3.99833 8.13259 4.38482 9.23105 4.32719C10.2854 4.27125 11.0652 3.1711 10.9957 2.13197C11.0025 1.09115 10.2041 0.0130391 9.1056 0.00456339C7.99867 -0.0734135 6.96972 0.858918 6.89683 1.95907C6.70527 3.24907 7.48674 5.53413 5.56613 6.60547C4.09305 5.80705 4.08797 4.38991 4.16255 3.10838C4.22358 2.04552 3.91845 0.76738 2.87424 0.260531C1.87241 -0.229367 0.446794 0.25036 0.139972 1.37594C-0.277034 2.51168 0.250156 4.07122 1.55541 4.34244C2.56233 4.55095 3.03528 3.83729 3.40143 4.1119C3.67774 4.31871 3.5167 5.62906 4.566 7.96667L1.908 15.5033C1.64356 16.456 1.65204 17.6206 2.58776 18.463L5.5424 10.6484L8.55299 18.3969ZM10.1634 2.87953C9.55143 3.97629 7.88849 3.88645 7.56641 2.74731C7.20704 1.71666 8.20887 0.397838 9.32767 0.726697C10.2447 0.919943 10.5821 2.12858 10.1634 2.87953ZM3.36753 2.927C2.94544 4.07122 1.00789 3.87797 0.746835 2.71341C0.479001 1.94042 0.8638 0.836881 1.77409 0.758904C2.88102 0.608036 3.87946 1.90821 3.36753 2.927Z";

      const scissorsSVG = this.instance.addSVG("11px", "19px").x(calc("62mm - 5.25px"))
        .y("30pt");
      scissorsSVG.addPath(scissorsCenter).fill("black");
    }

    // Receipt
    const receiptContainer = this.instance.addSVG()
      .x("5mm")
      .y("5mm");

    const receiptTextContainer = receiptContainer.addText();

    receiptTextContainer.addTSpan(translations[this.language].receipt)
      .x(0)
      .y(0)
      .dy("11pt")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("11pt");

    // Creditor
    receiptTextContainer.addTSpan(translations[this.language].account)
      .x(0)
      .y("7mm")
      .dy("9pt")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("6pt");

    receiptTextContainer.addTSpan(formatIBAN(this.data.creditor.account))
      .x(0)
      .dy("9pt")
      .fontFamily(this.font)
      .fontWeight("normal")
      .fontSize("8pt");
    receiptLineCount++;

    let receiptCreditorAddressLines: string[] = [];
    for(const line of formattedCreditorAddress){
      const messageLines = this._fitTextToWidth(line, mm2px(52), 2, "8pt");
      receiptCreditorAddressLines = [...receiptCreditorAddressLines, ...messageLines];
    }

    for(const line of receiptCreditorAddressLines){
      receiptLineCount++;
      receiptTextContainer.addTSpan(line)
        .x(0)
        .dy("9pt")
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("8pt");
    }

    // Reference
    if(this.data.reference !== undefined){

      receiptTextContainer.addTSpan(translations[this.language].reference)
        .x(0)
        .dy("18pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("6pt");

      receiptTextContainer.addTSpan(formatReference(this.data.reference))
        .x(0)
        .dy("9pt")
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("8pt");
      receiptLineCount++;

    }

    // Debtor
    if(this.data.debtor !== undefined){

      const formattedDebtorAddress = this._formatAddress(this.data.debtor);

      receiptTextContainer.addTSpan(translations[this.language].payableBy)
        .x(0)
        .dy("18pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("6pt");

      let receiptDebtorAddressLines: string[] = [];
      for(const line of formattedDebtorAddress){
        const messageLines = this._fitTextToWidth(line, mm2px(52), 2, "8pt");
        receiptDebtorAddressLines = [...receiptDebtorAddressLines, ...messageLines];
      }

      for(const line of receiptDebtorAddressLines){
        receiptTextContainer.addTSpan(line)
          .x(0)
          .dy("9pt")
          .fontFamily(this.font)
          .fontWeight("normal")
          .fontSize("8pt");
      }

    } else {

      // Add rectangle
      receiptTextContainer.addTSpan(translations[this.language].payableByName)
        .x(0)
        .dy("18pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("6pt");

      const referenceHeight = this.data.reference !== undefined ? "18pt" : "0";
      this._addRectangle(5, calc(`12mm + 9pt + (${receiptLineCount} * 9pt) + ${referenceHeight} + 18pt + 1mm`, "mm"), 52, 20);

    }

    // Amount
    const amountContainer = receiptContainer.addText()
      .y("63mm");

    amountContainer.addTSpan(translations[this.language].currency)
      .x(0)
      .dy("6pt")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("6pt");

    const amountXPosition = this.data.amount === undefined ? 13 : 22;

    amountContainer.addTSpan(translations[this.language].amount)
      .x(`${amountXPosition}mm`)
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("6pt");

    amountContainer.addTSpan(this.data.currency)
      .x(0)
      .dy("11pt")
      .fontFamily(this.font)
      .fontWeight("normal")
      .fontSize("8pt");

    if(this.data.amount !== undefined){
      amountContainer.addTSpan(formatAmount(this.data.amount))
        .x(`${amountXPosition}mm`)
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("8pt");
    } else {
      this._addRectangle(27, 68, 30, 10);
    }

    // Acceptance point
    amountContainer.addTSpan(translations[this.language].acceptancePoint)
      .x("52mm")
      .y("82mm")
      .textAlign("right")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("6pt");

    // Payment part middle column
    const paymentPartContainer = this.instance.addSVG()
      .x("67mm")
      .y("5mm");

    paymentPartContainer.addText(translations[this.language].paymentPart)
      .x(0)
      .y(0)
      .dy("11pt")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("11pt");

    // QR Code
    this._renderQRCode();

    // Amount
    const paymentPartMiddleTextContainer = paymentPartContainer.addText()
      .y("63mm");

    paymentPartMiddleTextContainer.addTSpan(translations[this.language].currency)
      .x(0)
      .dy("8pt")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("8pt");

    paymentPartMiddleTextContainer.addTSpan(translations[this.language].amount)
      .x("22mm")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("8pt");

    paymentPartMiddleTextContainer.addTSpan(this.data.currency)
      .x(0)
      .dy("13pt")
      .fontFamily(this.font)
      .fontWeight("normal")
      .fontSize("10pt");

    if(this.data.amount !== undefined){
      paymentPartMiddleTextContainer.addTSpan(formatAmount(this.data.amount))
        .x("22mm")
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("10pt");
    } else {
      this._addRectangle(78, calc("68mm + 8pt + 5pt", "mm"), 40, 15);
    }

    // AV1 and AV2
    const alternativeSchemeContainer = paymentPartContainer.addText()
      .x(0)
      .y("90mm");

    if(this.data.av1 !== undefined){

      const [scheme, data] = this.data.av1.split(/(\/.+)/);

      alternativeSchemeContainer.addTSpan(scheme)
        .x(0)
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("7pt");

      alternativeSchemeContainer.addTSpan(this.data.av1.length > 90 ? `${data.substr(0, 87)}...` : data)
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("7pt");

    }
    if(this.data.av2 !== undefined){

      const [scheme, data] = this.data.av2.split(/(\/.+)/);

      alternativeSchemeContainer.addTSpan(scheme)
        .x(0)
        .dy("8pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("7pt");

      alternativeSchemeContainer.addTSpan(this.data.av2.length > 90 ? `${data.substr(0, 87)}...` : data)
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("7pt");

    }

    // Payment part right column
    const paymentPartDebtorContainer = this.instance.addSVG()
      .x("118mm")
      .y("5mm");

    const paymentPartRightTextContainer = paymentPartDebtorContainer.addText();

    // Creditor
    paymentPartRightTextContainer.addTSpan(translations[this.language].account)
      .x(0)
      .y(0)
      .dy("11pt")
      .fontFamily(this.font)
      .fontWeight("bold")
      .fontSize("8pt");

    paymentPartRightTextContainer.addTSpan(formatIBAN(this.data.creditor.account))
      .x(0)
      .dy("11pt")
      .fontFamily(this.font)
      .fontWeight("normal")
      .fontSize("10pt");
    paymentPartLineCount++;

    let paymentPartCreditorAddressLines: string[] = [];
    for(const line of formattedCreditorAddress){
      const messageLines = this._fitTextToWidth(line, mm2px(52), 2, "8pt");
      paymentPartCreditorAddressLines = [...paymentPartCreditorAddressLines, ...messageLines];
    }

    for(const line of paymentPartCreditorAddressLines){
      paymentPartRightTextContainer.addTSpan(line)
        .x(0)
        .dy("11pt")
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("10pt");
      paymentPartLineCount++;
    }

    // Reference
    if(this.data.reference !== undefined){

      paymentPartRightTextContainer.addTSpan(translations[this.language].reference)
        .x(0)
        .dy("22pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("8pt");

      paymentPartRightTextContainer.addTSpan(formatReference(this.data.reference))
        .x(0)
        .dy("11pt")
        .fontFamily(this.font)
        .fontWeight("normal")
        .fontSize("10pt");
      paymentPartLineCount++;

    }

    // Message / Additional information
    if(this.data.message !== undefined || this.data.additionalInformation !== undefined){

      paymentPartRightTextContainer.addTSpan(translations[this.language].additionalInformation)
        .x(0)
        .dy("22pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("8pt");

      const referenceType = getReferenceType(this.data.reference);
      const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
      const lengthInPixel = mm2px(87);
      const linesOfMessage = this._getLineCountOfText(this.data.message, lengthInPixel, "10pt");
      const linesOfAdditionalInformation = this._getLineCountOfText(this.data.additionalInformation, lengthInPixel, "10pt");

      if(this.data.additionalInformation !== undefined){

        if(referenceType === "QRR" || referenceType === "SCOR"){

          // QRR and SCOR have 1 line for the message and 2 lines for the additional information

          if(this.data.message !== undefined){
            paymentPartRightTextContainer.addTSpan(this._ellipsis(this.data.message, lengthInPixel, "10pt"))
              .x(0)
              .dy("11pt")
              .fontFamily(this.font)
              .fontWeight("normal")
              .fontSize("10pt");
            paymentPartLineCount++;
          }
        } else {

          // Non QRR and SCOR have 4 lines total available and the message should be shortened if necessary

          if(this.data.message !== undefined){

            const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
            const messageLines = this._fitTextToWidth(this.data.message, lengthInPixel, maxLinesOfMessage, "10pt");

            for(let i = 0; i < maxLinesOfMessage; i++){
              paymentPartRightTextContainer.addTSpan(messageLines[i])
                .x(0)
                .dy("11pt")
                .fontFamily(this.font)
                .fontWeight("normal")
                .fontSize("10pt");
              paymentPartLineCount++;
            }

          }


        }

        const additionalInformationLines = this._fitTextToWidth(this.data.additionalInformation, lengthInPixel, linesOfAdditionalInformation, "10pt");
        for(let i = 0; i < linesOfAdditionalInformation; i++){
          paymentPartRightTextContainer.addTSpan(additionalInformationLines[i])
            .x(0)
            .dy("11pt")
            .fontFamily(this.font)
            .fontWeight("normal")
            .fontSize("10pt");
          paymentPartLineCount++;
        }

      } else if(this.data.message !== undefined){
        const messageLines = this._fitTextToWidth(this.data.message, lengthInPixel, maxLines, "10pt");
        for(let i = 0; i < maxLines; i++){
          paymentPartRightTextContainer.addTSpan(messageLines[i])
            .x(0)
            .dy("11pt")
            .fontFamily(this.font)
            .fontWeight("normal")
            .fontSize("10pt");
          paymentPartLineCount++;
        }
      }

    }

    // Debtor
    if(this.data.debtor !== undefined){

      const formattedDebtorAddress = this._formatAddress(this.data.debtor);

      paymentPartRightTextContainer.addTSpan(translations[this.language].payableBy)
        .x(0)
        .dy("22pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("8pt");

      let paymentPartDebtorAddressLines: string[] = [];
      for(const line of formattedDebtorAddress){
        const messageLines = this._fitTextToWidth(line, mm2px(52), 2, "8pt");
        paymentPartDebtorAddressLines = [...paymentPartDebtorAddressLines, ...messageLines];
      }

      for(const line of paymentPartDebtorAddressLines){
        paymentPartRightTextContainer.addTSpan(line)
          .x(0)
          .dy("11pt")
          .fontFamily(this.font)
          .fontWeight("normal")
          .fontSize("10pt");
      }

    } else {

      paymentPartRightTextContainer.addTSpan(translations[this.language].payableByName)
        .x(0)
        .dy("22pt")
        .fontFamily(this.font)
        .fontWeight("bold")
        .fontSize("8pt");

      const referenceHeight = this.data.reference !== undefined ? "22pt" : "0";
      const additionalInformationHeight = this.data.additionalInformation !== undefined || this.data.message !== undefined ? "22pt" : "0";
      this._addRectangle(118, calc(`5mm + 11pt + (${paymentPartLineCount} * 11pt) + ${referenceHeight} + ${additionalInformationHeight} + 22pt + 1mm`, "mm"), 65, 25);

    }
  }


  private _renderQRCode() {

    const qrCode = new SwissQRCode(this.data);
    qrCode
      .x("67mm")
      .y("17mm");

    this.instance.appendInstance(qrCode);

  }


  private _formatAddress(data: Creditor | Debtor): string[] {
    const countryPrefix = data.country !== "CH" ? `${data.country} - ` : "";
    if(data.buildingNumber !== undefined){
      return [data.name, `${data.address} ${data.buildingNumber}`, `${countryPrefix}${data.zip} ${data.city}`];
    } else {
      return [data.name, data.address, `${countryPrefix}${data.zip} ${data.city}`];
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


  private _fitTextToWidth(text: string, lengthInPixel: number, maxLines: number, size: "8pt" | "10pt"): string[] {

    const remainder = text.split(/([ |-])/g);
    let lines: string[] = [];
    let currentLine = "";

    const checkCurrentLine = (currentLine: string): { leftover: string; lines: string[]; } => {
      const lines: string[] = [];
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
      return { leftover, lines };
    };

    while(remainder.length > 0){

      const nextWord = remainder.shift()!;
      const separator = remainder.shift() ?? "";

      if(calculateTextWidth(currentLine + nextWord + separator, size) <= lengthInPixel){
        currentLine += nextWord + separator;
      } else {
        if(currentLine !== ""){
          const { leftover, lines: newLines } = checkCurrentLine(currentLine);
          lines.push(...newLines);
          currentLine = leftover + nextWord + separator;
        } else {
          currentLine = nextWord + separator;
        }
      }
    }
    if(currentLine !== "" && currentLine !== " "){
      const { leftover, lines: newLines } = checkCurrentLine(currentLine);
      lines.push(...newLines);
      if(leftover !== ""){
        lines.push(leftover);
      }
    }

    if(lines.length > maxLines){
      lines = lines.slice(0, maxLines);
      lines[lines.length - 1] = this._ellipsis(lines[lines.length - 1], lengthInPixel, size);
    }

    return lines;

  }


  private _ellipsis(text: string, lengthInPixel: number, size: "8pt" | "10pt"): string {

    let result = "";

    if(calculateTextWidth(text, size) > lengthInPixel){
      for(let c = 0; c < text.length; c++){
        if(calculateTextWidth(`${result}${text[c]}...`, size) <= lengthInPixel){
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

    return `${result}...`;

  }


  private _addRectangle(x: number, y: number, width: number, height: number) {

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
