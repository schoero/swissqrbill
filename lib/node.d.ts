/// <reference types="node" />
import fs from "fs";
import * as SwissQRBill_ from "./swissqrbill";
declare module SwissQRBill {
    export import data = SwissQRBill_.data;
    export import debtor = SwissQRBill_.debtor;
    export import creditor = SwissQRBill_.creditor;
    export import options = SwissQRBill_.options;
    export import PDFTable = SwissQRBill_.PDFTable;
    export import PDFRow = SwissQRBill_.PDFRow;
    export import PDFColumn = SwissQRBill_.PDFColumn;
    export import currency = SwissQRBill_.currency;
    export import size = SwissQRBill_.size;
    export import languages = SwissQRBill_.languages;
    class PDF extends SwissQRBill_.PDF {
        constructor(data: data, outputPath: string, options?: options);
        constructor(data: data, writeableStream: fs.WriteStream, options?: options);
        constructor(data: data, outputPath: string, options?: options, callback?: Function);
        constructor(data: data, writeableStream: fs.WriteStream, options?: options, callback?: Function);
        constructor(data: data, outputPath: string, callback?: Function);
        constructor(data: data, writeableStream: fs.WriteStream, callback?: Function);
    }
}
export = SwissQRBill;
