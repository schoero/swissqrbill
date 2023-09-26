import type { Data } from "./types";
export declare function generateQRData(data: Data): string;
export declare function renderQRCode(qrData: string, type: "pdf" | "svg", size: number, xOrigin?: number, yOrigin?: number): string;
