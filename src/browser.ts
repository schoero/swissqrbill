import * as SwissQRBill_ from "./pdf/pdf";
import BlobStream_ from "blob-stream";
import * as types from "./common/types";
import * as utils from "./common/utils";
import { PDFTable, PDFRow, PDFColumn } from "./pdf/extended-pdf";

export { PDFTable, PDFRow, PDFColumn, utils };

export import data = types.Data;
export import debtor = types.Debtor;
export import creditor = types.Creditor;
export import options = types.PDFOptions;
export import currency = types.Currency;
export import size = types.Size;
export import languages = types.Languages;

export import blobStream = BlobStream_;
export import BlobStream = BlobStream_;

export class PDF extends SwissQRBill_.PDF {

  constructor(data: data, writableStream: BlobStream_.IBlobStream, options?: options)
  constructor(data: data, writeableStream: BlobStream_.IBlobStream, options?: options, callback?: Function)
  constructor(data: data, writeableStream: BlobStream_.IBlobStream, callback?: Function)
  constructor(data: data, writeableStream: BlobStream_.IBlobStream, optionsOrCallback?: options | Function, callbackOrUndefined?: Function | undefined) {

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

    const stream = super.pipe(writeableStream);

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
  BlobStream: BlobStream_,
  blobStream: BlobStream_,
  PDF: PDF
};

export default SwissQRBill;