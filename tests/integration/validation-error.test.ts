import { describe, expect, it } from "vitest";

import { ValidationError, ValidationErrors } from "swissqrbill:errors";
import { cleanData } from "swissqrbill:shared:cleaner";
import { validateData } from "swissqrbill:shared:validator";
import { missingCreditor } from "swissqrbill:tests:data/invalid-data";
import { getValidationError } from "swissqrbill:tests:utils/errors";


describe("errors", () => {

  it("should be of instance 'Error' and 'ValidationError'", async () => {
    expect(getValidationError(() => validateData(cleanData(missingCreditor)))).toBeInstanceOf(Error);
    expect(getValidationError(() => validateData(cleanData(missingCreditor)))).toBeInstanceOf(ValidationError);
  });

  it("should have an error code", async () => {
    const code = "CREDITOR_IS_UNDEFINED";
    expect(getValidationError(() => validateData(cleanData(missingCreditor)))?.code).toBeDefined();
    expect(getValidationError(() => validateData(cleanData(missingCreditor)))?.code).toBe(code);
  });

  it("should have an error message", async () => {
    const code = "CREDITOR_IS_UNDEFINED";
    expect(getValidationError(() => validateData(cleanData(missingCreditor)))?.message).toBeDefined();
    expect(getValidationError(() => validateData(cleanData(missingCreditor)))?.message).toBe(ValidationErrors[code]);
  });

});
