import { getReferenceType } from "../shared/utils";

import { qrcodegen } from "./qr-code-generator";

import type { Data } from "./types";


export function generateQRData(data: Data): string {

  const amount = data.amount?.toFixed(2);
  const reference = getReferenceType(data.reference);

  const qrData: string[] = [
    "SPC",                                                 // Swiss Payments Code
    "0200",                                                // Version
    "1",                                                   // Coding Type UTF-8
    data.creditor.account ?? "",                           // IBAN
    ...data.creditor.buildingNumber
      ? [
        "S",                                               // Address Type
        data.creditor.name,                                // Name
        data.creditor.address,                             // Address
        `${data.creditor.buildingNumber}`,                 // Building number
        `${data.creditor.zip}`,                            // Zip
        data.creditor.city                                 // City
      ]
      : [
        "K",                                               // Address Type
        data.creditor.name,                                // Name
        data.creditor.address,                             // Address
        `${data.creditor.zip} ${data.creditor.city}`,      // Zip and city
        "",                                                // Empty zip field
        ""                                                 // Empty city field
      ],
    data.creditor.country,                                 // Country
    "",                                                    // 1x Empty
    "",                                                    // 2x Empty
    "",                                                    // 3x Empty
    "",                                                    // 4x Empty
    "",                                                    // 5x Empty
    "",                                                    // 6x Empty
    "",                                                    // 7x Empty
    amount ?? "",                                          // Amount
    data.currency,                                         // Currency
    ...data.debtor
      ? [
        ...data.debtor.buildingNumber
          ? [
            "S",                                           // Address Type
            data.debtor.name,                              // Name
            data.debtor.address,                           // Address
            `${data.debtor.buildingNumber}`,               // Building number
            `${data.debtor.zip}`,                          // Zip
            data.debtor.city                               // City
          ]
          : [
            "K",                                           // Address Type
            data.debtor.name,                              // Name
            data.debtor.address,                           // Address
            `${data.debtor.zip} ${data.debtor.city}`,      // Zip and city
            "",                                            // Empty zip field
            ""                                             // Empty city field
          ],
        data.debtor?.country ?? ""                         // Country
      ]
      : [
        "",                                                // Empty address type
        "",                                                // Empty name
        "",                                                // Empty address
        "",                                                // Empty zip and city
        "",                                                // Empty zip field
        "",                                                // Empty city field
        ""                                                 // Empty country
      ],
    reference,                                             // Reference type
    data.reference ?? "",                                  // Reference
    data.message ?? "",                                    // Unstructured message
    "EPD",                                                 // End of payment data
    data.additionalInformation ?? "",                      // Additional information
    ...data.av1                                            // Alternative scheme 1
      ? [
        data.av1
      ]
      : [],
    ...data.av2                                            // Alternative scheme 2
      ? [
        data.av2
      ]
      : []
  ];

  return qrData.join("\n");

}


export function renderQRCode(qrData: string, type: "pdf" | "svg", size: number, xOrigin: number = 0, yOrigin: number = 0): string {

  const eci = qrcodegen.QrSegment.makeEci(26);
  const segments = qrcodegen.QrSegment.makeSegments(qrData);
  const qrCode = qrcodegen.QrCode.encodeSegments([eci, ...segments], qrcodegen.QrCode.Ecc.MEDIUM, 10, 25);

  const blockSize = size / qrCode.size;
  const parts: string[] = [];

  for(let x = 0; x < qrCode.size; x++){
    const xPos = x * blockSize;
    for(let y = 0; y < qrCode.size; y++){
      const yPos = y * blockSize;
      if(qrCode.getModule(x, y)){

        switch (type){
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

/**
 * Limits the maximum and minimum number possible according to the PDF specifications.
 * Borrowed from: https://github.com/foliojs/pdfkit/blob/120c3f9519e49d719a88d22d70139cc9f54d17d8/lib/object.js#L123-L130
 * @param n The number to limit
 * @returns The limited number
 * @throws { RangeError } If the number is out of range.
 */
function limitNumber(n: number) {
  if(n > -1e21 && n < 1e21){
    return Math.round(n * 1e6) / 1e6;
  }

  throw new RangeError(`unsupported number: ${n}`);
}
