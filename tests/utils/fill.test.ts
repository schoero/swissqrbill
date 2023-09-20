import { describe, expect, it } from "vitest";

import { fillUntil } from "./fill";


describe("fill", () => {

  it("should repeat the string until the specified length is reached", () => {
    expect(fillUntil("Hello World", 20)).toHaveLength(20);
    expect(fillUntil("Hello World", 20)).toBe("Hello WorldHello Wor");
  });

  it("should cut to long strings", () => {
    expect(fillUntil("Hello World", 5)).toHaveLength(5);
    expect(fillUntil("Hello World", 5)).toBe("Hello");
  });

  it("should be able to handle empty strings", () => {
    expect(fillUntil("", 5)).toHaveLength(5);
    expect(fillUntil("", 5)).toBe("_____");
  });

});
