import { SVG_ } from "../svg/svg.js";
import { SVGOptions, Data } from "../shared/types.js";


export class SVG extends SVG_ {

  constructor(data: Data, options?: SVGOptions) {
    super(data, options);
  }


  /**
   * Outputs the SVG as a string.
   *
   * @returns {string} `string` containing the outerHTML of the SVG.
   * @memberof SVG
   */
  public toString(): string {
    return this.outerHTML;
  }


  /**
   * Returns the SVG element.
   * > **Note:** This function is only available in the browser.
   *
   * @readonly
   * @type {SVGElement}
   * @memberof SVG
   */
  public get element(): SVGElement {
    return this.instance.element as unknown as SVGElement;
  }

}