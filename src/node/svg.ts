import { SVG_ } from "../svg/svg.js";


export class SVG extends SVG_ {

  public override toString(): string {
    return this.outerHTML;
  }

}
