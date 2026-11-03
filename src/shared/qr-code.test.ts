import { describe, expect, test } from "vitest";

import { } from "swissqrbill:shared:cleaner.js";
import { generateQRData } from "swissqrbill:shared:qr-code.js";
import {
  creditorWithBuildingNumber,
  creditorWithBuildingNumberString,
  creditorWithMaxedOutFieldLengths,
  creditorWithNormalIBAN,
  creditorWithNormalIBANAndReference,
  creditorWithQRIBAN,
  debtorWithBuildingNumber,
  debtorWithBuildingNumberString,
  debtorWithMaxedOutFieldLengths,
  minimalRequired,
  minimalRequiredWithAdditionalInformation,
  minimalRequiredWithAdditionalInformationAndAlternativeScheme1,
  minimalRequiredWithAdditionalInformationAndAlternativeScheme2,
  minimalRequiredWithAlternativeScheme1,
  minimalRequiredWithAlternativeScheme1and2,
  minimalRequiredWithAlternativeScheme2,
  minimalRequiredWithAmount,
  minimalRequiredWithDebtor,
  minimalRequiredWithEuro,
  minimalRequiredWithMaxedOutMessage,
  minimalRequiredWithMessage
} from "swissqrbill:tests:data/valid-data.js";


describe("generateQRData", () => {

  // Minimal required
  test("minimal required data", () => {
    const qrString = generateQRData(minimalRequired);
    expect(qrString).toMatchSnapshot();
  });

  test("minimal required data + amount", () => {
    const qrString = generateQRData(minimalRequiredWithAmount);
    expect(qrString).toMatchSnapshot();
  });

  test("minimal required data + debtor", () => {
    const qrString = generateQRData(minimalRequiredWithDebtor);
    expect(qrString).toMatchSnapshot();
  });

  // Creditor
  test("creditor with building number", () => {
    const qrString = generateQRData(creditorWithBuildingNumber);
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with building number as string", () => {
    const qrString = generateQRData(creditorWithBuildingNumberString);
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with maxed out field lengths", () => {
    const qrString = generateQRData(creditorWithMaxedOutFieldLengths);
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with QR IBAN", () => {
    const qrString = generateQRData(creditorWithQRIBAN);
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with normal IBAN", () => {
    const qrString = generateQRData(creditorWithNormalIBAN);
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with normal IBAN and reference", () => {
    const qrString = generateQRData(creditorWithNormalIBANAndReference);
    expect(qrString).toMatchSnapshot();
  });

  // Debtor
  test("debtor with building number", () => {
    const qrString = generateQRData(debtorWithBuildingNumber);
    expect(qrString).toMatchSnapshot();
  });

  test("debtor with building number as string", () => {
    const qrString = generateQRData(debtorWithBuildingNumberString);
    expect(qrString).toMatchSnapshot();
  });

  test("debtor with maxed out field lengths", () => {
    const qrString = generateQRData(debtorWithMaxedOutFieldLengths);
    expect(qrString).toMatchSnapshot();
  });

  // Message
  test("message", () => {
    const qrString = generateQRData(minimalRequiredWithMessage);
    expect(qrString).toMatchSnapshot();
  });

  test("message with maxed out field length", () => {
    const qrString = generateQRData(minimalRequiredWithMaxedOutMessage);
    expect(qrString).toMatchSnapshot();
  });

  // Currency
  test("currency", () => {
    const qrString = generateQRData(minimalRequiredWithEuro);
    expect(qrString).toMatchSnapshot();
  });

  // Additional Information
  test("additional Information", () => {
    const qrString = generateQRData(minimalRequiredWithAdditionalInformation);
    expect(qrString).toMatchSnapshot();
  });

  // Alternative schemes
  test("alternative schemes AV1", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme1);
    expect(qrString).toMatchSnapshot();
  });

  test("alternative schemes AV2", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme2);
    expect(qrString).toMatchSnapshot();
  });

  test("alternative schemes AV1 & AV2", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme1and2);
    expect(qrString).toMatchSnapshot();
  });

  test("additional information & alternative scheme AV1", () => {
    const qrString = generateQRData(minimalRequiredWithAdditionalInformationAndAlternativeScheme1);
    expect(qrString).toMatchSnapshot();
  });

  test("additional information & alternative scheme AV2", () => {
    const qrString = generateQRData(minimalRequiredWithAdditionalInformationAndAlternativeScheme2);
    expect(qrString).toMatchSnapshot();
  });

  // Omission
  test("omits additional information and alternative schemes if not used", () => {
    const qrString = generateQRData(minimalRequired);
    expect(qrString.split("\n").at(-1)).toBe("EPD");
  });

  test("omits alternative schemes if not used", () => {
    const qrString = generateQRData(minimalRequiredWithAdditionalInformation);
    expect(qrString.split("\n").slice(-2)).toStrictEqual([
      "EPD",
      minimalRequiredWithAdditionalInformation.additionalInformation
    ]);
  });

  test("omits alternative scheme AV2 if not used", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme1);
    expect(qrString.split("\n").slice(-3)).toStrictEqual([
      "EPD",
      "",
      minimalRequiredWithAlternativeScheme1.av1
    ]);
  });

  // Empty strings
  test("treats empty additional information as not used", () => {
    const qrString = generateQRData({ ...minimalRequired, additionalInformation: "" });
    expect(qrString).toBe(generateQRData(minimalRequired));
  });

  test("treats additional information containing only line breaks as not used", () => {
    const qrString = generateQRData({ ...minimalRequired, additionalInformation: "\r\n" });
    expect(qrString).toBe(generateQRData(minimalRequired));
  });

  test("treats empty alternative schemes as not used", () => {
    const qrString = generateQRData({ ...minimalRequired, av1: "", av2: "" });
    expect(qrString).toBe(generateQRData(minimalRequired));
  });

  test("treats empty alternative scheme AV2 after additional information as not used", () => {
    const qrString = generateQRData({ ...minimalRequiredWithAdditionalInformation, av2: "" });
    expect(qrString).toBe(generateQRData(minimalRequiredWithAdditionalInformation));
  });

  test("treats empty additional information before alternative scheme AV1 as not used", () => {
    const qrString = generateQRData({ ...minimalRequiredWithAlternativeScheme1, additionalInformation: "" });
    expect(qrString).toBe(generateQRData(minimalRequiredWithAlternativeScheme1));
  });

  test("treats empty additional information and alternative scheme AV1 before AV2 as not used", () => {
    const qrString = generateQRData({ ...minimalRequiredWithAlternativeScheme2, additionalInformation: "", av1: "" });
    expect(qrString).toBe(generateQRData(minimalRequiredWithAlternativeScheme2));
  });

});
