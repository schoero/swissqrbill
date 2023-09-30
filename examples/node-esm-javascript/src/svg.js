import { writeFileSync } from "fs";
import { SwissQRBill } from "swissqrbill/svg";

import { data } from "./data.js";


const qrBill = new SwissQRBill(data);
writeFileSync("./swissqrbill.svg", qrBill.toString());
