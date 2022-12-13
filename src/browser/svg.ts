import { Data, SVGOptions } from "../shared/types.js";
import { SVG_ } from "../svg/svg.js";


export class SVG extends SVG_ {

  constructor(data: Data, options?: SVGOptions) {
    super(data, options);
  }


  /**
   * Outputs the SVG as a string.
   *
   * @returns The outerHTML of the SVG as a `string`.
   */
  public toString(): string {
    return this.outerHTML;
  }


  /**
   * Returns the SVG element.
   * > **Note:** This function is only available in the browser.
   *
   * @readonly
   */
  public get element(): SVGElement {
    return this.instance.element as unknown as SVGElement;
  }

}
