import { createWriteStream } from "fs";
import { Writable } from "stream";

import { PDF_ } from "./pdf/pdf";
import { SVG_ } from "./svg";

import * as utils from "./shared/utils";
import * as types from "./shared/types";

import { PDFTable, PDFRow, PDFColumn } from "./pdf/extended-pdf";
export { PDFTable, PDFRow, PDFColumn, utils };

export import data = types.Data;
export import debtor = types.Debtor;
export import creditor = types.Creditor;
export import options = types.PDFOptions;
export import currency = types.Currency;
export import size = types.Size;
export import languages = types.Languages;

export class PDF extends PDF_ {

  constructor(data: data, outputPath: string, options?: options)
  constructor(data: data, writableStream: Writable, options?: options)
  constructor(data: data, outputPath: string, options?: options, callback?: Function)
  constructor(data: data, writableStream: Writable, options?: options, callback?: Function)
  constructor(data: data, outputPath: string, callback?: Function)
  constructor(data: data, writableStream: Writable, callback?: Function)
  constructor(data: data, outputPathOrWritableStream: string | Writable, optionsOrCallback?: options | Function, callbackOrUndefined?: Function | undefined) {

    let callback: Function | undefined = undefined;
    let options: options | undefined = undefined;

    if(typeof optionsOrCallback === "object"){

      options = optionsOrCallback;

      if(typeof callbackOrUndefined === "function"){
        callback = callbackOrUndefined;
      }

    } else if(typeof optionsOrCallback === "function"){
      callback = optionsOrCallback;
    }

    super(data, options);

    let stream: Writable | undefined;

    if(typeof outputPathOrWritableStream === "string"){
      stream = createWriteStream(outputPathOrWritableStream);
    } else {
      stream = outputPathOrWritableStream;
    }

    super.pipe(stream);

    stream.on("finish", ev => {

      if(typeof callback === "function"){
        callback(this);
      }

      this.emit("finish", ev);

    });

  }

}

export class SVG extends SVG_ {
  constructor(data: data) {
    super(data);
  }


  public toString(): string {
    return this.outerHTML;
  }
}

const SwissQRBill = {
  types: types,
  utils: utils,
  PDF: PDF,
  SVG: SVG
};

export default SwissQRBill;