import { describe, expect, it } from "vitest";

import { cleanData } from "swissqrbill:shared:cleaner.js";

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

  it("should remove spaces from the account and uppercase it", () => {
    expect(cleanData({
      creditor: {
        account: "Hello World 123"
      }
    } as Data)).toEqual({
      creditor: {
        account: "HELLOWORLD123"
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

  it("should remove empty optional fields", () => {
    expect(cleanData({
      additionalInformation: "",
      av1: "",
      av2: "",
      creditor: {
        buildingNumber: ""
      },
      debtor: {
        buildingNumber: ""
      },
      message: "",
      reference: ""
    } as Data)).toStrictEqual({
      creditor: {},
      debtor: {}
    });
  });

  it("should remove optional fields that are empty after cleaning", () => {
    expect(cleanData({
      additionalInformation: "\r\n",
      av1: "\n",
      reference: " "
    } as Data)).toStrictEqual({});
  });

  it("should keep empty required fields", () => {
    expect(cleanData({
      creditor: {
        address: "",
        name: ""
      }
    } as Data)).toStrictEqual({
      creditor: {
        address: "",
        name: ""
      }
    });
  });

  it("should keep a building number of 0", () => {
    expect(cleanData({
      creditor: {
        buildingNumber: 0
      }
    } as Data)).toStrictEqual({
      creditor: {
        buildingNumber: 0
      }
    });
  });
});
