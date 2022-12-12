import { Data, SVGOptions } from "../shared/types.js";
import { SVG_ } from "../svg/svg.js";


export class SVG extends SVG_ {

  constructor(data: Data, options?: SVGOptions) {
    super(data, options);
  }

  public toString(): string {
    return this.outerHTML;
  }

}
