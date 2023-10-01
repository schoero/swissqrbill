import { data } from "./data.js";


const qrBill = new SwissQRBill.SVG(data);
document.body.appendChild(qrBill);
