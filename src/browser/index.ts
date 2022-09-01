import { PDF, BlobStream, QRBill } from "./pdf.js";
import { SVG } from "./svg.js";

import * as utils from "../shared/utils.js";
export * as utils from "../shared/utils.js";

import * as types from "../shared/types.js";
export * as types from "../shared/types.js";

export * from "./svg.js";
export * from "./pdf.js";


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