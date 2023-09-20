import { describe, expect, test } from "vitest";

import { cleanData } from "swissqrbill:shared/cleaner.js";
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
    const qrString = generateQRData(cleanData(minimalRequired));
    expect(qrString).toMatchSnapshot();
  });

  test("minimal required data + amount", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithAmount));
    expect(qrString).toMatchSnapshot();
  });

  test("minimal required data + debtor", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithDebtor));
    expect(qrString).toMatchSnapshot();
  });

  // Creditor
  test("creditor with building number", () => {
    const qrString = generateQRData(cleanData(creditorWithBuildingNumber));
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with building number as string", () => {
    const qrString = generateQRData(cleanData(creditorWithBuildingNumberString));
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with maxed out field lengths", () => {
    const qrString = generateQRData(cleanData(creditorWithMaxedOutFieldLengths));
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with QR IBAN", () => {
    const qrString = generateQRData(cleanData(creditorWithQRIBAN));
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with normal IBAN", () => {
    const qrString = generateQRData(cleanData(creditorWithNormalIBAN));
    expect(qrString).toMatchSnapshot();
  });

  test("creditor with normal IBAN and reference", () => {
    const qrString = generateQRData(cleanData(creditorWithNormalIBANAndReference));
    expect(qrString).toMatchSnapshot();
  });

  // Debtor
  test("debtor with building number", () => {
    const qrString = generateQRData(cleanData(debtorWithBuildingNumber));
    expect(qrString).toMatchSnapshot();
  });

  test("debtor with building number as string", () => {
    const qrString = generateQRData(cleanData(debtorWithBuildingNumberString));
    expect(qrString).toMatchSnapshot();
  });

  test("debtor with maxed out field lengths", () => {
    const qrString = generateQRData(cleanData(debtorWithMaxedOutFieldLengths));
    expect(qrString).toMatchSnapshot();
  });

  // Message
  test("message", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithMessage));
    expect(qrString).toMatchSnapshot();
  });

  test("message with maxed out field length", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithMaxedOutMessage));
    expect(qrString).toMatchSnapshot();
  });

  // Currency
  test("currency", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithEuro));
    expect(qrString).toMatchSnapshot();
  });

  // Additional Information
  test("additional Information", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithAdditionalInformation));
    expect(qrString).toMatchSnapshot();
  });

  // Alternative schemes
  test("alternative schemes AV1", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithAlternativeScheme1));
    expect(qrString).toMatchSnapshot();
  });

  test("alternative schemes AV2", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithAlternativeScheme2));
    expect(qrString).toMatchSnapshot();
  });

  test("alternative schemes AV1 & AV2", () => {
    const qrString = generateQRData(cleanData(minimalRequiredWithAlternativeScheme1and2));
    expect(qrString).toMatchSnapshot();
  });

});
