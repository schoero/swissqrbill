import * as SwissQRBill_ from "./swissqrbill";
import BlobStream_ from "blob-stream";
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
    export import utils = SwissQRBill_.utils;
    export import blobStream = BlobStream_;
    export import BlobStream = BlobStream_;
    class PDF extends SwissQRBill_.PDF {
        constructor(data: data, writeableStream: BlobStream_.IBlobStream, options?: options);
        constructor(data: data, writeableStream: BlobStream_.IBlobStream, options?: options, callback?: Function);
        constructor(data: data, writeableStream: BlobStream_.IBlobStream, callback?: Function);
    }
}
export default SwissQRBill;
