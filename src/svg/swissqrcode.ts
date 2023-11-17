import { SVG } from "svg-engine";

import { renderQRCode, renderSwissCross } from "swissqrbill:shared:qr-code.js";

import type { ValidationError } from "swissqrbill:errors";
import type { Data } from "swissqrbill:types";


export class SwissQRCode {

  public instance: SVG;

  /**
   * Creates a Swiss QR Code.
   * @param data The data to be encoded in the QR code.
   * @param size The size of the QR code in mm.
   * @throws { ValidationError } Throws an error if the data is invalid.
   */
  constructor(data: Data, size: number = 46) {

    this.instance = new SVG();

    this.instance.width(`${size}mm`);
    this.instance.height(`${size}mm`);

    renderQRCode(data, size, (xPos, yPos, blockSize) => {
      this.instance
        .addRect(
          `${xPos}mm`,
          `${yPos}mm`,
          `${blockSize}mm`,
          `${blockSize}mm`
        )
        .fill("black");
    });

    renderSwissCross(size, (xPos, yPos, width, height, fillColor) => {
      this.instance
        .addRect(
          `${xPos}mm`,
          `${yPos}mm`,
          `${width}mm`,
          `${height}mm`
        )
        .fill(fillColor);
    });

  }


  /**
   * Outputs the SVG as a string.
   * @returns The outerHTML of the SVG element.
   */
  public toString(): string {
    return this.instance.outerHTML;
  }


  /**
   * Returns the SVG element.
   * @returns The SVG element.
   */
  public get element(): SVGElement {
    return this.instance.element as unknown as SVGElement;
  }

}
