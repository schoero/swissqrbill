import { renderQRCode, renderSwissCross } from "swissqrbill:shared:qr-code";
import { mm2pt } from "swissqrbill:shared:utils";

import type { Data } from "swissqrbill:shared:types";


export class SwissQRCode {

  private size: number;
  private data: Data;

  /**
   * Creates a Swiss QR Code.
   * @param data The data to be encoded in the QR code.
   * @param size The size of the QR code in mm.
   */
  constructor(data: Data, size: number = 46) {
    this.size = mm2pt(size);
    this.data = data;
  }


  /**
   * Attaches the Swiss QR Code to a PDF document.
   * @param doc The PDF document to attach the Swiss QR Code to.
   * @param x The horizontal position in points where the Swiss QR Code will be placed.
   * @param y The vertical position in points where the Swiss QR Code will be placed.
   */
  public attachTo(doc: PDFKit.PDFDocument, x: number = doc.x ?? 0, y: number = doc.y ?? 0): void {

    doc.save();

    doc.translate(x, y);

    renderQRCode(this.data, this.size, (xPos, yPos, blockSize) => {
      doc.rect(
        xPos,
        yPos,
        blockSize,
        blockSize
      );
    });

    doc.fillColor("black");
    doc.fill();

    renderSwissCross(this.size, (xPos, yPos, width, height, fillColor) => {
      doc
        .rect(
          xPos,
          yPos,
          width,
          height
        )
        .fillColor(fillColor)
        .fill();
    });

    doc.restore();

  }

}
