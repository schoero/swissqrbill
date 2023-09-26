import { SVG } from "svg-engine";
import type { Data, SVGOptions } from "swissqrbill:shared/types";
export declare class SwissQRBill {
    protected instance: SVG;
    private _data;
    private _language;
    constructor(data: Data, options?: SVGOptions);
    get outerHTML(): string;
    /**
     * Outputs the SVG as a string.
     * @returns The outerHTML of the SVG as a `string`.
     */
    toString(): string;
    /**
     * Returns the SVG element.
     * @readonly
     * @returns The SVG element.
     */
    private _render;
    private _renderQRCode;
    private _formatAddress;
    private _getLineCountOfText;
    private _fitTextToWidth;
    private _ellipsis;
    private _addRectangle;
}
