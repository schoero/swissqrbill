import { describe, expect, test } from "vitest";

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
} from "swissqrbill:tests:data/data.js";


describe("generateQRData", () => {


  //-- Minimal required

  test("Minimal required data", () => {
    const qrString = generateQRData(minimalRequired);
    expect(qrString).toMatchSnapshot();
  });

  test("Minimal required data + amount", () => {
    const qrString = generateQRData(minimalRequiredWithAmount);
    expect(qrString).toMatchSnapshot();
  });

  test("Minimal required data + debtor", () => {
    const qrString = generateQRData(minimalRequiredWithDebtor);
    expect(qrString).toMatchSnapshot();
  });


  //-- Creditor

  test("Creditor with building number", () => {
    const qrString = generateQRData(creditorWithBuildingNumber);
    expect(qrString).toMatchSnapshot();
  });

  test("Creditor with building number as string", () => {
    const qrString = generateQRData(creditorWithBuildingNumberString);
    expect(qrString).toMatchSnapshot();
  });

  test("Creditor with maxed out field lengths", () => {
    const qrString = generateQRData(creditorWithMaxedOutFieldLengths);
    expect(qrString).toMatchSnapshot();
  });

  test("Creditor with QR IBAN", () => {
    const qrString = generateQRData(creditorWithQRIBAN);
    expect(qrString).toMatchSnapshot();
  });

  test("Creditor with normal IBAN", () => {
    const qrString = generateQRData(creditorWithNormalIBAN);
    expect(qrString).toMatchSnapshot();
  });

  test("Creditor with normal IBAN and reference", () => {
    const qrString = generateQRData(creditorWithNormalIBANAndReference);
    expect(qrString).toMatchSnapshot();
  });


  //-- Debtor

  test("Debtor with building number", () => {
    const qrString = generateQRData(debtorWithBuildingNumber);
    expect(qrString).toMatchSnapshot();
  });

  test("Debtor with building number as string", () => {
    const qrString = generateQRData(debtorWithBuildingNumberString);
    expect(qrString).toMatchSnapshot();
  });

  test("Debtor with maxed out field lengths", () => {
    const qrString = generateQRData(debtorWithMaxedOutFieldLengths);
    expect(qrString).toMatchSnapshot();
  });


  //-- Message

  test("Message", () => {
    const qrString = generateQRData(minimalRequiredWithMessage);
    expect(qrString).toMatchSnapshot();
  });

  test("Message with maxed out field length", () => {
    const qrString = generateQRData(minimalRequiredWithMaxedOutMessage);
    expect(qrString).toMatchSnapshot();
  });


  //-- Currency

  test("Currency", () => {
    const qrString = generateQRData(minimalRequiredWithEuro);
    expect(qrString).toMatchSnapshot();
  });


  //-- Additional Information

  test("Additional Information", () => {
    const qrString = generateQRData(minimalRequiredWithAdditionalInformation);
    expect(qrString).toMatchSnapshot();
  });


  //-- Alternative schemes

  test("Alternative schemes AV1", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme1);
    expect(qrString).toMatchSnapshot();
  });

  test("Alternative schemes AV2", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme2);
    expect(qrString).toMatchSnapshot();
  });

  test("Alternative schemes AV1 & AV2", () => {
    const qrString = generateQRData(minimalRequiredWithAlternativeScheme1and2);
    expect(qrString).toMatchSnapshot();
  });

});
