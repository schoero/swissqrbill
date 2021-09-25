import { PDF } from "./pdf.js";
import { SVG } from "./svg.js";
import BlobStream_ from "blob-stream";

import * as utils from "../shared/utils.js";
export * as utils from "../shared/utils.js";

import * as types from "../shared/types.js";
export * as types from "../shared/types.js";

export * from "./svg.js";
export * from "./pdf.js";

export import blobStream = BlobStream_;
export import BlobStream = BlobStream_;

const SwissQRBill = {
  utils: utils,
  types: types,
  BlobStream: BlobStream_,
  blobStream: BlobStream_,
  PDF: PDF,
  SVG: SVG
};

export default SwissQRBill;