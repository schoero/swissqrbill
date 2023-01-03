import { default as BlobStream_, IBlobStream } from "blob-stream";

import { PDF_ } from "../pdf/pdf.js";
import { Data, PDFOptions } from "../shared/types.js";


export import blobStream = BlobStream_;
export import BlobStream = BlobStream_;


export class PDF extends PDF_ {

  constructor(data: Data, writeableStream: IBlobStream, callback?: Function);
  constructor(data: Data, writeableStream: IBlobStream, options?: PDFOptions, callback?: Function);
  constructor(data: Data, writeableStream: IBlobStream, optionsOrCallback?: Function | PDFOptions, callbackOrUndefined?: Function | undefined) {

    let callback: Function | undefined;
    let options: PDFOptions | undefined;

    if(typeof optionsOrCallback === "object"){

      options = optionsOrCallback;

      if(typeof callbackOrUndefined === "function"){
        callback = callbackOrUndefined;
      }

    } else if(typeof optionsOrCallback === "function"){
      callback = optionsOrCallback;
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
