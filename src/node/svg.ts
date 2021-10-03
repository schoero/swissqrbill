import { SVG_ } from "../svg/svg.js";
import { SVGOptions, Data } from "../shared/types.js";


export class SVG extends SVG_ {

  constructor(data: Data, options?: SVGOptions) {
    super(data, options);
  }

  public toString(): string {
    return this.outerHTML;
  }

}
