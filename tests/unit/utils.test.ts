import { describe, expect, test } from "vitest";

import {
  calculateQRReferenceChecksum,
  calculateSCORReferenceChecksum,
  formatAmount,
  formatIBAN,
  formatQRReference,
  formatReference,
  formatSCORReference,
  isIBANValid,
  isQRIBAN,
  isQRReference,
  isQRReferenceValid,
  isSCORReference
} from "swissqrbill:shared:utils.js";


// https://github.com/swico/qr-bill#qr-iban

describe("utils", () => {

  test("isQRIBAN", () => {

    expect(isQRIBAN("CH44 3199 9123 0008 8901 2")).toBe(true);
    expect(isQRIBAN("CH4431999123000889012")).toBe(true);

    expect(isQRIBAN("CH58 0079 1123 0008 8901 2")).toBe(false);
    expect(isQRIBAN("CH5800791123000889012")).toBe(false);

  });

  test("isIBANValid", () => {

    expect(isIBANValid("CH44 3199 9123 0008 8901 2")).toBe(true);
    expect(isIBANValid("CH4431999123000889012")).toBe(true);
    expect(isIBANValid("CH44 3199 9123 0008 8901 1")).toBe(false);
    expect(isIBANValid("CH4431999123000889011")).toBe(false);

    expect(isIBANValid("CH06 3000 5230 5042 2318 T")).toBe(true);
    expect(isIBANValid("CH063000523050422318T")).toBe(true);
    expect(isIBANValid("CH05 3000 5230 5042 2318 T")).toBe(false);
    expect(isIBANValid("CH053000523050422318T")).toBe(false);

    expect(isIBANValid("CH30 3000 0001 2500 9072 0")).toBe(true);
    expect(isIBANValid("CH3030000001250090720")).toBe(true);
    expect(isIBANValid("CH30 3000 0001 2500 9072 1")).toBe(false);
    expect(isIBANValid("CH3030000001250090721")).toBe(false);

    expect(isIBANValid("CH58 0078 8000 Z321 8002 5")).toBe(true);
    expect(isIBANValid("CH5800788000Z32180025")).toBe(true);
    expect(isIBANValid("CH58 0078 8000 Z321 8002 4")).toBe(false);
    expect(isIBANValid("CH5800788000Z32180024")).toBe(false);

    expect(isIBANValid("CH08 3078 8000 C330 1425 5")).toBe(true);
    expect(isIBANValid("CH0830788000C33014255")).toBe(true);
    expect(isIBANValid("CH08 3078 8000 C330 1425 4")).toBe(false);
    expect(isIBANValid("CH0830788000C33014254")).toBe(false);

  });

  test("formatIBAN", () => {
    expect(formatIBAN("CH4431999123000889012")).toBe("CH44 3199 9123 0008 8901 2");
    expect(formatIBAN("  C H  4 431999123000889012  ")).toBe("CH44 3199 9123 0008 8901 2");
  });

  test("isQRReference", () => {

    expect(isQRReference("21 00000 00003 13947 14300 09017")).toBe(true);
    expect(isQRReference("210000000003139471430009017")).toBe(true);

    expect(isQRReference("RF48 5000 0567 8901 2345")).toBe(false);
    expect(isQRReference("RF485000056789012345")).toBe(false);

  });

  test("isQRReferenceValid", () => {

    expect(isQRReferenceValid("21 00000 00003 13947 14300 09017")).toBe(true);
    expect(isQRReferenceValid("210000000003139471430009017")).toBe(true);

    expect(isQRReferenceValid("21 00000 00003 13947 14300 09018")).toBe(false);
    expect(isQRReferenceValid("210000000003139471430009018")).toBe(false);

    expect(isQRReferenceValid("21 0000 00003 13947 14300 09017")).toBe(false);
    expect(isQRReferenceValid("21000000003139471430009017")).toBe(false);

  });

  test("calculateQRReferenceChecksum", () => {
    expect(calculateQRReferenceChecksum("21 00000 00003 13947 14300 0901")).toBe("7");
    expect(calculateQRReferenceChecksum("21 00000 00003 13948 14300 0901")).toBe("4");
    expect(calculateQRReferenceChecksum("21 00000 00003 13949 14300 0901")).toBe("5");
  });

  test("formatQRReference", () => {
    expect(formatQRReference("210000000003139471430009017")).toBe("21 00000 00003 13947 14300 09017");
    expect(formatQRReference("  2  1 0000000003139471430009017  ")).toBe("21 00000 00003 13947 14300 09017");
  });

  test("isSCORReference", () => {
    expect(isSCORReference("RF48 5000 0567 8901 2345")).toBe(true);
    expect(isSCORReference("RF485000056789012345")).toBe(true);
    expect(isSCORReference("RF00000000000000000000000")).toBe(true);
    expect(isSCORReference("RF0000000000000000000000A")).toBe(true);

    expect(isSCORReference("485000056789012345")).toBe(false);
    expect(isSCORReference("RF48")).toBe(false);
    expect(isSCORReference("RF000000000000000000000000")).toBe(false);

    expect(isSCORReference("21 00000 00003 13947 14300 09017")).toBe(false);
    expect(isSCORReference("210000000003139471430009017")).toBe(false);
  });

  test("calculateSCORReferenceChecksum", () => {
    expect(calculateSCORReferenceChecksum("5000056789012345")).toBe("48");
    expect(calculateSCORReferenceChecksum("0000000000000000")).toBe("04");
    expect(calculateSCORReferenceChecksum("000000000000000A")).toBe("25");
    expect(calculateSCORReferenceChecksum("000000000000000B")).toBe("95");
    expect(calculateSCORReferenceChecksum("123456789")).toBe("18");
  });

  test("formatSCORReference", () => {
    expect(formatSCORReference("RF18539007547034")).toBe("RF18 5390 0754 7034");
    expect(formatSCORReference("  R  F 18539007547034  ")).toBe("RF18 5390 0754 7034");
  });

  test("formatReference", () => {
    expect(formatReference("RF18539007547034")).toBe("RF18 5390 0754 7034");
    expect(formatReference("  R  F 18539007547034  ")).toBe("RF18 5390 0754 7034");
    expect(formatReference("210000000003139471430009017")).toBe("21 00000 00003 13947 14300 09017");
    expect(formatReference("  2  1 0000000003139471430009017  ")).toBe("21 00000 00003 13947 14300 09017");
  });

  test("formatAmount", () => {
    expect(formatAmount(0)).toBe("0.00");
    expect(formatAmount(0.01)).toBe("0.01");
    expect(formatAmount(0.1)).toBe("0.10");
    expect(formatAmount(1)).toBe("1.00");
    expect(formatAmount(1.2)).toBe("1.20");
    expect(formatAmount(12.34)).toBe("12.34");
    expect(formatAmount(123.45)).toBe("123.45");
    expect(formatAmount(1234.56)).toBe("1 234.56");
    expect(formatAmount(1234.567)).toBe("1 234.57");
    expect(formatAmount(12345.67)).toBe("12 345.67");
    expect(formatAmount(123456.78)).toBe("123 456.78");
    expect(formatAmount(1234567.89)).toBe("1 234 567.89");
    expect(formatAmount(12345678.9)).toBe("12 345 678.90");
    expect(formatAmount(123456789)).toBe("123 456 789.00");
    expect(formatAmount(1234567890)).toBe("1 234 567 890.00");
  });

});
