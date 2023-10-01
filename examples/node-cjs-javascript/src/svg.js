const { writeFileSync } = require("fs");
const { SwissQRBill } = require("swissqrbill/svg");

const data = require("./data.js");


const qrBill = new SwissQRBill(data);
writeFileSync("./output/swissqrbill.svg", qrBill.toString());
