import { SwissQRBill } from "swissqrbill/svg"
import { writeFileSync } from "node:fs";
import { data } from "./data.js";

const qrBill = new SwissQRBill(data);
writeFileSync('./swissqrbill.svg', qrBill.toString());
