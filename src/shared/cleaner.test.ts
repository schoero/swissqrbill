import { cleanData } from "swissqrbill:shared:cleaner.js";
import { describe, expect, it } from "vitest";

import type { Data } from "swissqrbill:types";


describe("cleaner", () => {

  it("should remove all line breaks from every string", () => {
    expect(cleanData({
      creditor: {
        name: "Hello\nWorld"
      },
      message: "Hello\nWorld"
    } as Data)).toEqual({
      creditor: {
        name: "HelloWorld"
      },
      message: "HelloWorld"
    });
  });

  it("should remove all spaces from the reference", () => {
    expect(cleanData({
      reference: "Hello World 123"
    } as Data)).toEqual({
      reference: "HelloWorld123"
    });
  });

  it("should remove all spaces from the account", () => {
    expect(cleanData({
      creditor: {
        account: "Hello World 123"
      }
    } as Data)).toEqual({
      creditor: {
        account: "HelloWorld123"
      }
    });
  });

  it("should remove all spaces from the country", () => {
    expect(cleanData({
      creditor: {
        country: "C H"
      }
    } as Data)).toEqual({
      creditor: {
        country: "CH"
      }
    });
  });

  it("should convert the country to uppercase", () => {
    expect(cleanData({
      creditor: {
        country: "ch"
      }
    } as Data)).toEqual({
      creditor: {
        country: "CH"
      }
    });
  });
});
