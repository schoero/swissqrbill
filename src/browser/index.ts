import * as types from "../shared/types.js";
import * as utils from "../shared/utils.js";

import { BlobStream, PDF } from "./pdf.js";
import { SVG } from "./svg.js";


export * as types from "../shared/types.js";
export * as utils from "../shared/utils.js";
export * from "./pdf.js";
export * from "./svg.js";


const SwissQRBill = {
  BlobStream,
  PDF,
  SVG,
  blobStream: BlobStream,
  types,
  utils
};

export default SwissQRBill;
