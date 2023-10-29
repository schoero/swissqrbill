import { data } from "./data.js";


const qrBill = new SwissQRBill.svg.SwissQRBill(data);
document.body.appendChild(qrBill.element);
