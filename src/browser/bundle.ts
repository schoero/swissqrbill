import fs from "fs";

import BlobStream_ from "blob-stream";

// @ts-expect-error - Import resolution does not work here
import Helvetica from "../../node_modules/pdfkit/js/data/Helvetica.afm";
// @ts-expect-error - Import resolution does not work here
import HelveticaBold from "../../node_modules/pdfkit/js/data/Helvetica-Bold.afm";
import * as types from "../shared/types.js";
import * as utils from "../shared/utils.js";

import { PDF } from "./pdf.js";
import { SVG } from "./svg.js";


export import blobStream = BlobStream_;
export import BlobStream = BlobStream_;


export * as types from "../shared/types.js";
export * as utils from "../shared/utils.js";
export * from "./pdf.js";
export * from "./svg.js";

fs.writeFileSync("data/Helvetica.afm", Helvetica);
fs.writeFileSync("data/Helvetica-Bold.afm", HelveticaBold);

const SwissQRBill = {
  BlobStream: BlobStream_,
  PDF,
  SVG,
  blobStream: BlobStream_,
  types,
  utils
};

export default SwissQRBill;
