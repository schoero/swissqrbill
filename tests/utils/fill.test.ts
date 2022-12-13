import { describe, expect, it } from "vitest";

import { fillUntil } from "./fill.js";


describe("fill", () => {

  it("should repeat the string until the specified length is reached", () => {
    expect(fillUntil("Hello World", 20)).to.have.lengthOf(20);
    expect(fillUntil("Hello World", 20)).to.equal("Hello WorldHello Wor");
  });

  it("should cut to long strings", () => {
    expect(fillUntil("Hello World", 5)).to.have.lengthOf(5);
    expect(fillUntil("Hello World", 5)).to.equal("Hello");
  });

  it("should be able to handle empty strings", () => {
    expect(fillUntil("", 5)).to.have.lengthOf(5);
    expect(fillUntil("", 5)).to.equal("_____");
  });

});
