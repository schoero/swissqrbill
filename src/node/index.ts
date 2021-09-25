import { PDF } from "./pdf.js";
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
  PDF: PDF,
  SVG: SVG
};

export default SwissQRBill;