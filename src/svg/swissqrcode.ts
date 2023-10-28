import SVG from "svg-engine";

import { renderQRCode, renderSwissCross } from "swissqrbill:shared:qr-code";

import type { Data } from "swissqrbill:shared:types";


export class SwissQRCode extends SVG {

  /**
   * Creates a Swiss QR Code.
   * @param data The data to be encoded in the QR code.
   * @param size The size of the QR code in mm.
   */
  constructor(data: Data, size: number = 46) {

    super();

    this.width(`${size}mm`);
    this.height(`${size}mm`);

    renderQRCode(data, size, (xPos, yPos, blockSize) => {
      this
        .addRect(
          `${xPos}mm`,
          `${yPos}mm`,
          `${blockSize}mm`,
          `${blockSize}mm`
        )
        .fill("black");
    });

    renderSwissCross(size, (xPos, yPos, width, height, fillColor) => {
      this
        .addRect(
          `${xPos}mm`,
          `${yPos}mm`,
          `${width}mm`,
          `${height}mm`
        )
        .fill(fillColor);
    });

  }

}
