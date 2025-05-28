import { cleanData } from "swissqrbill:shared:cleaner.js";
import { qrcodegen } from "swissqrbill:shared:qr-code-generator.js";
import { validateData } from "swissqrbill:shared:validator.js";
import { getReferenceType, mm2pt } from "swissqrbill:utils";

import type { Data } from "swissqrbill:shared:types.js";


export function generateQRData(data: Data): string {

  const cleanedData = cleanData(data);

  validateData(cleanedData);

  const amount = cleanedData.amount?.toFixed(2);
  const reference = getReferenceType(cleanedData.reference);

  const qrData: string[] = [
    "SPC",                                                               // Swiss Payments Code
    "0200",                                                              // Version
    "1",                                                                 // Coding Type UTF-8
    cleanedData.creditor.account ?? "",                                  // IBAN
    "S",                                                                 // Address Type
    cleanedData.creditor.name,                                           // Name
    cleanedData.creditor.address,                                        // Address
    cleanedData.creditor.buildingNumber                                  // Building number
      ? `${cleanedData.creditor.buildingNumber}`
      : "",
    `${cleanedData.creditor.zip}`,                                       // Zip
    cleanedData.creditor.city,                                           // City
    cleanedData.creditor.country,                                        // Country
    "",                                                                  // 1x Empty
    "",                                                                  // 2x Empty
    "",                                                                  // 3x Empty
    "",                                                                  // 4x Empty
    "",                                                                  // 5x Empty
    "",                                                                  // 6x Empty
    "",                                                                  // 7x Empty
    amount ?? "",                                                        // Amount
    cleanedData.currency,                                                // Currency
    ...cleanedData.debtor
      ? [
        "S",                                                             // Address Type
        cleanedData.debtor.name,                                         // Name
        cleanedData.debtor.address,                                      // Address
        cleanedData.debtor.buildingNumber                                // Building number
          ? `${cleanedData.debtor.buildingNumber}`
          : "",
        `${cleanedData.debtor.zip}`,                                     // Zip
        cleanedData.debtor.city,                                         // City
        cleanedData.debtor.country ?? ""                                 // Country
      ]
      : [
        "",                                                              // Empty address type
        "",                                                              // Empty name
        "",                                                              // Empty address
        "",                                                              // Empty building number
        "",                                                              // Empty zip field
        "",                                                              // Empty city field
        ""                                                               // Empty country
      ],
    reference,                                                           // Reference type
    cleanedData.reference ?? "",                                         // Reference
    cleanedData.message ?? "",                                           // Unstructured message
    "EPD",                                                               // End of payment data
    cleanedData.additionalInformation ?? "",                             // Additional information
    ...cleanedData.av1                                                   // Alternative scheme 1
      ? [
        cleanedData.av1
      ]
      : [],
    ...cleanedData.av2                                                   // Alternative scheme 2
      ? [
        cleanedData.av2
      ]
      : []
  ];

  return qrData.join("\n");

}


export function renderQRCode(data: Data, size: number, renderBlockFunction: (x: number, y: number, blockSize: number) => void): void {

  const qrData = generateQRData(data);
  const eci = qrcodegen.QrSegment.makeEci(26);
  const segments = qrcodegen.QrSegment.makeSegments(qrData);
  const qrCode = qrcodegen.QrCode.encodeSegments([eci, ...segments], qrcodegen.QrCode.Ecc.MEDIUM, 10, 25);

  const blockSize = size / qrCode.size;

  for(let x = 0; x < qrCode.size; x++){
    const xPos = x * blockSize;
    for(let y = 0; y < qrCode.size; y++){
      const yPos = y * blockSize;
      if(qrCode.getModule(x, y)){
        renderBlockFunction(xPos, yPos, blockSize);
      }
    }

  }

}


export function renderSwissCross(size: number, renderRectFunction: (x: number, y: number, width: number, height: number, fillColor: string) => void) {

  const scale = size / mm2pt(46);

  const swissCrossWhiteBackgroundSize = mm2pt(7) * scale;
  const swissCrossBlackBackgroundSize = mm2pt(6) * scale;

  const swissCrossThickness = mm2pt(1.17) * scale;
  const swissCrossLength = mm2pt(3.89) * scale;

  renderRectFunction(
    size / 2 - swissCrossWhiteBackgroundSize / 2,
    size / 2 - swissCrossWhiteBackgroundSize / 2,
    swissCrossWhiteBackgroundSize,
    swissCrossWhiteBackgroundSize,
    "white"
  );

  renderRectFunction(
    size / 2 - swissCrossBlackBackgroundSize / 2,
    size / 2 - swissCrossBlackBackgroundSize / 2,
    swissCrossBlackBackgroundSize,
    swissCrossBlackBackgroundSize,
    "black"
  );

  renderRectFunction(
    size / 2 - swissCrossLength / 2,
    size / 2 - swissCrossThickness / 2,
    swissCrossLength,
    swissCrossThickness,
    "white"
  );

  renderRectFunction(
    size / 2 - swissCrossThickness / 2,
    size / 2 - swissCrossLength / 2,
    swissCrossThickness,
    swissCrossLength,
    "white"
  );

}
