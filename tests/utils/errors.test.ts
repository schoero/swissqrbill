import { ValidationError, ValidationErrors } from "swissqrbill:errors";
import { describe, expect, it } from "vitest";

import { getValidationError } from "./errors";


describe("error", () => {

  it("should return the caught error", () => {
    expect(getValidationError(() => { throw new ValidationError(ValidationErrors.ACCOUNT_LENGTH_IS_INVALID); })).toBeInstanceOf(Error);
    expect(getValidationError(() => { throw new ValidationError(ValidationErrors.ACCOUNT_LENGTH_IS_INVALID); })?.message).toBe(ValidationErrors.ACCOUNT_LENGTH_IS_INVALID);
  });

});
