import { createWriteStream } from "fs";
import { Writable } from "stream";

import { PDF_ } from "../pdf/pdf.js";
import { Data, PDFOptions } from "../shared/types.js";


export class PDF extends PDF_ {

  constructor(data: Data, outputPath: string, options?: PDFOptions);
  constructor(data: Data, writableStream: Writable, options?: PDFOptions);
  constructor(data: Data, outputPath: string, options?: PDFOptions, callback?: Function);
  constructor(data: Data, writableStream: Writable, options?: PDFOptions, callback?: Function);
  constructor(data: Data, outputPath: string, callback?: Function);
  constructor(data: Data, writableStream: Writable, callback?: Function);
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
