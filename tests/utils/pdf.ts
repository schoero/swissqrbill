import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve as resolvePath } from "node:path";

import { pdfToPng } from "pdf-to-png-converter";

import { PDF } from "swissqrbill:node:pdf.js";
import { Data, PDFOptions } from "swissqrbill:shared:types.js";

import { WritableMemory } from "./writable-memory.js";


const VISUAL = process.env.VISUAL === "true";

export function createPDF(data: Data, path: string, options?: PDFOptions): { pdf: PDF; snapshots: Promise<string[]>; } {

  const stream = new WritableMemory();
  const pdf = new PDF(data, stream, { ...options });

  const snapshots = new Promise<string[]>(resolve => {

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    pdf.on("finish", async () => {

      const buffer = stream.read();
      const snapshots = await pdfBufferToImages(buffer);

      if(VISUAL === true){
        await mkdir(dirname(resolvePath(path)), { recursive: true });
        await writeFile(path, buffer);
      }

      resolve(snapshots);

    });

  });

  return {
    pdf,
    snapshots
  };

}


export async function pdf(data: Data, path: string, options?: PDFOptions) {
  const { snapshots } = createPDF(data, path, options);
  return await snapshots;
}


export async function pdfBufferToImages(pdfBuffer: Buffer) {

  const images = await pdfToPng(pdfBuffer, {
    disableFontFace: false,
    useSystemFonts: true,
    viewportScale: 0.2
  });

  return images.map(page => page.content.toString("base64"));

}
