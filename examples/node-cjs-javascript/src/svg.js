const { writeFileSync } = require("fs");
const { SwissQRBill } = require("swissqrbill/svg");

const data = require("./data.js");


const qrBill = new SwissQRBill(data);
writeFileSync("./swissqrbill.svg", qrBill.toString());
