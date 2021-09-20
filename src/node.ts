import { createWriteStream } from "fs";
import { Writable } from "stream";

import { PDF_ } from "./pdf/pdf";
import { SVG_ } from "./svg/svg";

import * as utils from "./shared/utils";
import * as types from "./shared/types";

import { PDFTable, PDFRow, PDFColumn } from "./pdf/extended-pdf";
export { PDFTable, PDFRow, PDFColumn, utils };

export import Data = types.Data;
export import Debtor = types.Debtor;
export import Creditor = types.Creditor;
export import PDFOptions = types.PDFOptions;
export import Currency = types.Currency;
export import Size = types.Size;
export import Languages = types.Languages;
export import SVGOptions = types.SVGOptions;

export class PDF extends PDF_ {

  constructor(data: Data, outputPath: string, options?: PDFOptions)
  constructor(data: Data, writableStream: Writable, options?: PDFOptions)
  constructor(data: Data, outputPath: string, options?: PDFOptions, callback?: Function)
  constructor(data: Data, writableStream: Writable, options?: PDFOptions, callback?: Function)
  constructor(data: Data, outputPath: string, callback?: Function)
  constructor(data: Data, writableStream: Writable, callback?: Function)
  constructor(data: Data, outputPathOrWritableStream: string | Writable, optionsOrCallback?: PDFOptions | Function, callbackOrUndefined?: Function | undefined) {

    let callback: Function | undefined = undefined;
    let options: PDFOptions | undefined = undefined;

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

  constructor(data: Data, options?: SVGOptions) {
    super(data, options);
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