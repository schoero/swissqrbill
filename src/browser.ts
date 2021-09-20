import { PDF_ } from "./pdf/pdf";
import { SVG_ } from "./svg/svg";

import BlobStream_ from "blob-stream";

import * as types from "./shared/types";
import * as utils from "./shared/utils";

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

export import blobStream = BlobStream_;
export import BlobStream = BlobStream_;

export class PDF extends PDF_ {

  constructor(data: Data, writableStream: BlobStream_.IBlobStream, options?: PDFOptions)
  constructor(data: Data, writeableStream: BlobStream_.IBlobStream, options?: PDFOptions, callback?: Function)
  constructor(data: Data, writeableStream: BlobStream_.IBlobStream, callback?: Function)
  constructor(data: Data, writeableStream: BlobStream_.IBlobStream, optionsOrCallback?: PDFOptions | Function, callbackOrUndefined?: Function | undefined) {

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

    const stream = super.pipe(writeableStream);

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
  BlobStream: BlobStream_,
  blobStream: BlobStream_,
  PDF: PDF,
  SVG: SVG
};

export default SwissQRBill;