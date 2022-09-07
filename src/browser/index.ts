import BlobStream from "blob-stream";

import { SVG } from "./svg.js";
import { PDF, QRBill } from "../pdf/pdf.js";

import * as utils from "../shared/utils.js";
export * as utils from "../shared/utils.js";

import * as types from "../shared/types.js";
export * as types from "../shared/types.js";

export * from "./svg.js";
export * from "../pdf/pdf.js";


const SwissQRBill = {
  utils: utils,
  types: types,
  BlobStream: BlobStream,
  blobStream: BlobStream,
  PDF: PDF,
  SVG: SVG,
  QRBill: QRBill
};

export default SwissQRBill;