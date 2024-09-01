import { describe, expect, it } from "vitest";

import { getErrorCodeByMessage, ValidationErrors } from "swissqrbill:errors";
import { } from "swissqrbill:shared:cleaner.js";


describe("getErrorCodeByMessage", () => {

  it("should return the correct error code", () => {
    const key = "ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING";
    expect(getErrorCodeByMessage(ValidationErrors[key])).toBe(key);
  });


});
