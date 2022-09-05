import { PDF_, QRBill } from "../pdf/pdf.js";
import { default as BlobStream_, IBlobStream } from "blob-stream";
import { PDFOptions, Data } from "../shared/types.js";

export import blobStream = BlobStream_;
export import BlobStream = BlobStream_;

export { QRBill };

export class PDF extends PDF_ {

  /**
   * @deprecated Although passing data and options as parameters is still supported, it will deprecated in favour of the new syntax {@link addQRBill}
  */
  constructor(writableStream: IBlobStream, data: Data, options: PDFOptions);
  constructor(writableStream: IBlobStream, data: Data);

  constructor(writableStream: IBlobStream, callback: Function, data: Data, options: PDFOptions);
  constructor(writableStream: IBlobStream, callback: Function, data: Data);

  /**
    * @param writableStream a writableStream to stream data into
    * @param callback function that gets called right after the pdf has been created, optional.
  */
  constructor(writableStream: IBlobStream, callback?: Function);
  constructor(writeableStream: IBlobStream, callbackOrData?: Function | Data, dataOrOptions?: Data | PDFOptions, optionsOrUndefined?: PDFOptions | undefined) {

    let callback: Function | undefined;
    let data: Data | undefined;
    let options: PDFOptions | undefined;

    if(typeof callbackOrData == "function"){
      callback = callbackOrData;

      data = dataOrOptions as Data;
      options = optionsOrUndefined as PDFOptions;
    } else {
      data = callbackOrData;
      options = dataOrOptions as PDFOptions;
    }

    super(data, options);

    const stream = this.pipe(writeableStream);

    stream.on("finish", ev => {

      if(typeof callback === "function"){
        callback(this);
      }

      this.emit("finish", ev);

    });

  }

}