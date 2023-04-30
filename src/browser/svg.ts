import { SVG_ } from "../svg/svg.js";


export class SVG extends SVG_ {


  /**
   * Outputs the SVG as a string.
   * @returns The outerHTML of the SVG as a `string`.
   */
  public override toString(): string {
    return this.outerHTML;
  }


  /**
   * Returns the SVG element.
   *
   * **Note:** This function is only available in the browser.
   * @readonly
   */
  public get element(): SVGElement {
    return this.instance.element as unknown as SVGElement;
  }

}
