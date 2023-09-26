"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const utils = require("./utils.cjs");
const qrCodeGenerator = require("./qr-code-generator.cjs");
function generateQRData(data) {
  var _a, _b, _c, _d, _e, _f, _g;
  const amount = (_a = data.amount) == null ? void 0 : _a.toFixed(2);
  const reference = utils.getReferenceType(data.reference);
  const qrData = [
    "SPC",
    // Swiss Payments Code
    "0200",
    // Version
    "1",
    // Coding Type UTF-8
    (_b = data.creditor.account) != null ? _b : "",
    // IBAN
    ...data.creditor.buildingNumber ? [
      "S",
      // Address Type
      data.creditor.name,
      // Name
      data.creditor.address,
      // Address
      `${data.creditor.buildingNumber}`,
      // Building number
      `${data.creditor.zip}`,
      // Zip
      data.creditor.city
      // City
    ] : [
      "K",
      // Address Type
      data.creditor.name,
      // Name
      data.creditor.address,
      // Address
      `${data.creditor.zip} ${data.creditor.city}`,
      // Zip and city
      "",
      // Empty zip field
      ""
      // Empty city field
    ],
    data.creditor.country,
    // Country
    "",
    // 1x Empty
    "",
    // 2x Empty
    "",
    // 3x Empty
    "",
    // 4x Empty
    "",
    // 5x Empty
    "",
    // 6x Empty
    "",
    // 7x Empty
    amount != null ? amount : "",
    // Amount
    data.currency,
    // Currency
    ...data.debtor ? [
      ...data.debtor.buildingNumber ? [
        "S",
        // Address Type
        data.debtor.name,
        // Name
        data.debtor.address,
        // Address
        `${data.debtor.buildingNumber}`,
        // Building number
        `${data.debtor.zip}`,
        // Zip
        data.debtor.city
        // City
      ] : [
        "K",
        // Address Type
        data.debtor.name,
        // Name
        data.debtor.address,
        // Address
        `${data.debtor.zip} ${data.debtor.city}`,
        // Zip and city
        "",
        // Empty zip field
        ""
        // Empty city field
      ],
      (_d = (_c = data.debtor) == null ? void 0 : _c.country) != null ? _d : ""
      // Country
    ] : [
      "",
      // Empty address type
      "",
      // Empty name
      "",
      // Empty address
      "",
      // Empty zip and city
      "",
      // Empty zip field
      "",
      // Empty city field
      ""
      // Empty country
    ],
    reference,
    // Reference type
    (_e = data.reference) != null ? _e : "",
    // Reference
    (_f = data.message) != null ? _f : "",
    // Unstructured message
    "EPD",
    // End of payment data
    (_g = data.additionalInformation) != null ? _g : "",
    // Additional information
    ...data.av1 ? [
      data.av1
    ] : [],
    ...data.av2 ? [
      data.av2
    ] : []
  ];
  return qrData.join("\n");
}
function renderQRCode(qrData, type, size, xOrigin = 0, yOrigin = 0) {
  const eci = qrCodeGenerator.qrcodegen.QrSegment.makeEci(26);
  const segments = qrCodeGenerator.qrcodegen.QrSegment.makeSegments(qrData);
  const qrCode = qrCodeGenerator.qrcodegen.QrCode.encodeSegments([eci, ...segments], qrCodeGenerator.qrcodegen.QrCode.Ecc.MEDIUM, 10, 25);
  const blockSize = size / qrCode.size;
  const parts = [];
  for (let x = 0; x < qrCode.size; x++) {
    const xPos = x * blockSize;
    for (let y = 0; y < qrCode.size; y++) {
      const yPos = y * blockSize;
      if (qrCode.getModule(x, y)) {
        switch (type) {
          case "pdf":
            parts.push(`${limitNumber(xOrigin + xPos)} ${limitNumber(yOrigin + yPos)} ${limitNumber(blockSize)} ${limitNumber(blockSize)} re`);
            break;
          case "svg":
            parts.push(`M ${xPos}, ${yPos} V ${yPos + blockSize} H ${xPos + blockSize} V ${yPos} H ${xPos} Z `);
            break;
        }
      }
    }
  }
  return parts.join(" ");
}
function limitNumber(n) {
  if (n > -1e21 && n < 1e21) {
    return Math.round(n * 1e6) / 1e6;
  }
  throw new RangeError(`unsupported number: ${n}`);
}
exports.generateQRData = generateQRData;
exports.renderQRCode = renderQRCode;
