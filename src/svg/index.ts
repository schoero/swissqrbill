import { parse } from "svg-parser";
import { Size, Data, Languages, PDFOptions, Debtor, Creditor } from "../shared/types";
import * as utils from "../shared/utils";
import { validateData, cleanData } from "../shared/shared";
import { SVG } from "svg-engine";
import translations from "../shared/translations";
import generateQRCode from "../shared/qr-code.js";

export interface SVGOptions {
  language?: Languages,
}

export class SVG_ {

  private _element: SVG;
  private _data: Data;

  private _language: Languages = "DE";

  constructor(data: Data, options?: SVGOptions) {

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
    }


    //-- Create SVG

    this._element = new SVG();
    this._element.width("210mm");
    this._element.height("105mm");

    this._drawOutlines();
    this._drawReceipt();
    this._drawPaymentPart();

  }


  public get outerHTML(): string {
    return this._element.outerHTML;
  }


  private _drawOutlines() {


    //-- Vertical line

    this._element.addLine("62mm", "0mm", "62mm", "105mm")
      .stroke(1, "dashed", "black");


    //-- Scissors

    const scissorsTop = "M4.545 -1.803C4.06 -2.388 3.185 -2.368 2.531 -2.116l-4.106 1.539c-1.194 -0.653 -2.374 -0.466 -2.374 -0.784c0 -0.249 0.228 -0.194 0.194 -0.842c-0.033 -0.622 -0.682 -1.082 -1.295 -1.041c-0.614 -0.004 -1.25 0.467 -1.255 1.115c-0.046 0.653 0.504 1.26 1.153 1.303c0.761 0.113 2.109 -0.348 2.741 0.785c-0.471 0.869 -1.307 0.872 -2.063 0.828c-0.627 -0.036 -1.381 0.144 -1.68 0.76c-0.289 0.591 -0.006 1.432 0.658 1.613c0.67 0.246 1.59 -0.065 1.75 -0.835c0.123 -0.594 -0.298 -0.873 -0.136 -1.089c0.122 -0.163 0.895 -0.068 2.274 -0.687L2.838 2.117C3.4 2.273 4.087 2.268 4.584 1.716L-0.026 -0.027L4.545 -1.803zm-9.154 -0.95c0.647 0.361 0.594 1.342 -0.078 1.532c-0.608 0.212 -1.386 -0.379 -1.192 -1.039c0.114 -0.541 0.827 -0.74 1.27 -0.493zm0.028 4.009c0.675 0.249 0.561 1.392 -0.126 1.546c-0.456 0.158 -1.107 -0.069 -1.153 -0.606c-0.089 -0.653 0.678 -1.242 1.279 -0.94z";
    const scissorsCenter = "M5.301 10.8527C5.886 10.3677 5.866 9.49269 5.614 8.83869L4.075 4.73269C4.728 3.53869 4.541 2.35869 4.859 2.35869C5.108 2.35869 5.053 2.58669 5.701 2.55269C6.323 2.51969 6.783 1.87069 6.742 1.25769C6.746 0.643692 6.275 0.00769203 5.627 0.00269203C4.974 -0.043308 4.367 0.506692 4.324 1.15569C4.211 1.91669 4.672 3.26469 3.539 3.89669C2.67 3.42569 2.667 2.58969 2.711 1.83369C2.747 1.20669 2.567 0.452692 1.951 0.153692C1.36 -0.135308 0.519004 0.147692 0.338004 0.811692C0.0920042 1.48169 0.403004 2.40169 1.173 2.56169C1.767 2.68469 2.046 2.26369 2.262 2.42569C2.425 2.54769 2.33 3.32069 2.949 4.69969L1.381 9.14569C1.225 9.70769 1.23 10.3947 1.782 10.8917L3.525 6.28169L5.301 10.8527ZM6.251 1.69869C5.89 2.34569 4.909 2.29269 4.719 1.62069C4.507 1.01269 5.098 0.234692 5.758 0.428692C6.299 0.542692 6.498 1.25569 6.251 1.69869ZM2.242 1.72669C1.993 2.40169 0.850004 2.28769 0.696004 1.60069C0.538004 1.14469 0.765004 0.493692 1.302 0.447692C1.955 0.358692 2.544 1.12569 2.242 1.72669Z";

    // Todo: Add scissors

  }


  private _drawReceipt() {

    const receiptContainer = this._element.addSVG()
      .width("52mm")
      .x("5mm")
      .y("5mm");

    receiptContainer.addText(translations[this._language].receipt)
      .x(0)
      .y(0)
      .dy("5mm")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("11pt");

    const textContainer = receiptContainer.addText();


    //-- Creditor

    textContainer.addTSpan(translations[this._language].account)
      .x(0)
      .y("12mm")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("6pt");

    textContainer.addTSpan(utils.formatIBAN(this._data.creditor.account))
      .x(0)
      .dy("9pt")
      .fontFamily("Arial")
      .fontWeight("normal")
      .fontSize("8pt");

    const formattedAddress = this._formatAddress(this._data.creditor);

    for(const line of formattedAddress){
      textContainer.addTSpan(line)
        .x(0)
        .dy("8pt")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("8pt");
    }


    //-- Reference

    if(this._data.reference !== undefined){

      textContainer.addTSpan(translations[this._language].reference)
        .x(0)
        .dy("15pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("6pt");

      textContainer.addTSpan(utils.formatIBAN(this._data.reference))
        .x(0)
        .dy("9pt")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("8pt");

    }


    //-- Debtor

    if(this._data.debtor !== undefined){

      textContainer.addTSpan(translations[this._language].payableBy)
        .x(0)
        .dy("15pt")
        .fontFamily("Arial")
        .fontWeight("bold")
        .fontSize("6pt");

      const formattedAddress = this._formatAddress(this._data.debtor);

      for(const line of formattedAddress){
        textContainer.addTSpan(line)
          .x(0)
          .dy("9pt")
          .fontFamily("Arial")
          .fontWeight("normal")
          .fontSize("8pt");
      }
    } else {
      // Todo: Draw rectangle
    }


    //-- Amount

    const amountContainer = receiptContainer.addText()
      .y("63mm");

    amountContainer.addTSpan(translations[this._language].currency)
      .x(0)
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("6pt");

    amountContainer.addTSpan(translations[this._language].amount)
      .x("15mm")
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
        .x("15mm")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("8pt");
    } else {
      // Todo: Draw rectangle
    }

  }


  private _drawPaymentPart() {

    const paymentPartContainer = this._element.addSVG()
      .width("52mm")
      .x("67mm")
      .y("5mm");

    paymentPartContainer.addText(translations[this._language].paymentPart)
      .x(0)
      .y(0)
      .dy("5mm")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("11pt");

    this._drawQRCode();

    const amountContainer = paymentPartContainer.addText()
      .y("63mm");

    amountContainer.addTSpan(translations[this._language].currency)
      .x(0)
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("8pt");

    amountContainer.addTSpan(translations[this._language].amount)
      .x("20mm")
      .fontFamily("Arial")
      .fontWeight("bold")
      .fontSize("8pt");

    amountContainer.addTSpan(this._data.currency)
      .x(0)
      .dy("13pt")
      .fontFamily("Arial")
      .fontWeight("normal")
      .fontSize("11pt");

    if(this._data.amount !== undefined){
      amountContainer.addTSpan(utils.formatAmount(this._data.amount))
        .x("20mm")
        .fontFamily("Arial")
        .fontWeight("normal")
        .fontSize("11pt");
    } else {
      // Todo: Draw rectangle
    }


  }


  private _drawQRCode() {

    const qrcode = generateQRCode(this._data, utils.mmToPixels(46));

    const qrcodeSVG = this._element.addSVG("46mm", "46mm")
      .y("15mm")
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
    if(data.houseNumber !== undefined){
      return [data.name, data.address + " " + data.houseNumber, data.zip + " " + data.city];
    } else {
      return [data.name, data.address, data.zip + " " + data.city];
    }
  }


}