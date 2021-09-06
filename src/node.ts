import { createWriteStream } from "fs";
import { Writable } from "stream";

import * as SwissQRBill_ from "./pdf/pdf";
import * as utils from "./common/utils";
import * as types from "./common/types";

import { PDFTable, PDFRow, PDFColumn } from "./pdf/extended-pdf";

export { PDFTable, PDFRow, PDFColumn, utils };

export import data = types.Data;
export import debtor = types.Debtor;
export import creditor = types.Creditor;
export import options = types.PDFOptions;
export import currency = types.Currency;
export import size = types.Size;
export import languages = types.Languages;

export class PDF extends SwissQRBill_.PDF {

  constructor(data: data, outputPath: string, options?: options)
  constructor(data: data, writeableStream: Writable, options?: options)
  constructor(data: data, outputPath: string, options?: options, callback?: Function)
  constructor(data: data, writeableStream: Writable, options?: options, callback?: Function)
  constructor(data: data, outputPath: string, callback?: Function)
  constructor(data: data, writeableStream: Writable, callback?: Function)
  constructor(data: data, outputPathOrWriteableStream: string | Writable, optionsOrCallback?: options | Function, callbackOrUndefined?: Function | undefined) {

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

    if(typeof outputPathOrWriteableStream === "string"){
      stream = createWriteStream(outputPathOrWriteableStream);
    } else {
      stream = outputPathOrWriteableStream;
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

const SwissQRBill = {
  types: types,
  utils: utils,
  PDF: PDF
};

export default SwissQRBill;