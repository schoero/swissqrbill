import { writeFileSync } from "fs";
import { SwissQRBill } from "swissqrbill/svg";

import { data } from "./data.js";


const qrBill = new SwissQRBill(data);
writeFileSync("./output/swissqrbill.svg", qrBill.toString());
