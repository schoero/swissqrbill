import { createWriteStream } from "fs";
import { Writable } from "stream";
import { PDF_, QRBill } from "../pdf/pdf.js";
import { PDFOptions, Data } from "../shared/types.js";

export { QRBill };

export class PDF extends PDF_ {

  /**
   * @deprecated Although passing data and options as parameters is still supported, it will deprecated in favour of the new syntax {@link addQRBill}
   */
  constructor(outputPath: string, data: Data, options: PDFOptions);
  constructor(writableStream: Writable, data: Data, options: PDFOptions);

  constructor(outputPath: string, data: Data);
  constructor(writableStream: Writable, data: Data);

  constructor(outputPath: string, callback: Function, data: Data, options: PDFOptions);
  constructor(writableStream: Writable, callback: Function, data: Data, options: PDFOptions);

  constructor(outputPath: string, callback: Function, data: Data);
  constructor(writableStream: Writable, callback: Function, data: Data);

  /**
   * @param outputPath output path for the generated PDF file
   * @param callback function that gets called right after the pdf has been created, optional.
   */
  constructor(outputPath: string, callback?: Function);

  /**
   * @param writableStream a writableStream to stream data into
   * @param callback function that gets called right after the pdf has been created, optional.
   */
  constructor(writableStream: Writable, callback?: Function);
  constructor(outputPathOrWritableStream: string | Writable, callbackOrData?: Function | Data, dataOrOptions?: Data | PDFOptions, optionsOrUndefined?: PDFOptions) {
    let callback: Function | undefined;
    let data: Data | undefined;
    let options: PDFOptions | undefined;

    if(typeof callbackOrData === "function"){
      callback = callbackOrData;

      data = dataOrOptions as Data;
      options = optionsOrUndefined as PDFOptions;
    } else {
      data = callbackOrData;
      options = dataOrOptions as PDFOptions;
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