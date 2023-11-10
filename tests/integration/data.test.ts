import { describe, expect, test } from "vitest";

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
} from "swissqrbill:tests:data/valid-data";
import { pdf } from "swissqrbill:tests:utils/pdf";
import { svg } from "swissqrbill:tests:utils/svg";


describe("data", async () => {

  // Minimal required
  test("minimal required data", async () => {
    const name = "minimal-required";
    const pdfSnapshot = await pdf(minimalRequired, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequired, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("minimal required data + amount", async () => {
    const name = "minimal-required-with-amount";
    const pdfSnapshot = await pdf(minimalRequiredWithAmount, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAmount, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("minimal required data + debtor", async () => {
    const name = "minimal-required-with-debtor";
    const pdfSnapshot = await pdf(minimalRequiredWithDebtor, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithDebtor, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  // Creditor
  test("creditor with building number", async () => {
    const name = "creditor-with-building-number";
    const pdfSnapshot = await pdf(creditorWithBuildingNumber, `data/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithBuildingNumber, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("creditor with building number as string", async () => {
    const name = "creditor-with-building-number-string";
    const pdfSnapshot = await pdf(creditorWithBuildingNumberString, `data/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithBuildingNumberString, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("creditor with maxed out field lengths", async () => {
    const name = "creditor-with-maxed-out-field-lengths";
    const pdfSnapshot = await pdf(creditorWithMaxedOutFieldLengths, `data/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithMaxedOutFieldLengths, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("creditor with QR IBAN", async () => {
    const name = "creditor-with-qr-iban";
    const pdfSnapshot = await pdf(creditorWithQRIBAN, `data/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithQRIBAN, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("creditor with normal IBAN", async () => {
    const name = "creditor-with-normal-iban";
    const pdfSnapshot = await pdf(creditorWithNormalIBAN, `data/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithNormalIBAN, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("creditor with normal IBAN and reference", async () => {
    const name = "creditor-with-normal-iban-and-reference";
    const pdfSnapshot = await pdf(creditorWithNormalIBANAndReference, `data/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithNormalIBANAndReference, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  // Debtor
  test("debtor with building number", async () => {
    const name = "debtor-with-building-number";
    const pdfSnapshot = await pdf(debtorWithBuildingNumber, `data/${name}.pdf`);
    const svgSnapshot = await svg(debtorWithBuildingNumber, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("debtor with building number as string", async () => {
    const name = "debtor-with-building-number-string";
    const pdfSnapshot = await pdf(debtorWithBuildingNumberString, `data/${name}.pdf`);
    const svgSnapshot = await svg(debtorWithBuildingNumberString, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("debtor with maxed out field lengths", async () => {
    const name = "debtor-with-maxed-out-field-lengths";
    const pdfSnapshot = await pdf(debtorWithMaxedOutFieldLengths, `data/${name}.pdf`);
    const svgSnapshot = await svg(debtorWithMaxedOutFieldLengths, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  // Message
  test("message", async () => {
    const name = "message";
    const pdfSnapshot = await pdf(minimalRequiredWithMessage, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithMessage, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("message with maxed out field length", async () => {
    const name = "message-with-maxed-out-field-length";
    const pdfSnapshot = await pdf(minimalRequiredWithMaxedOutMessage, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithMaxedOutMessage, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  // Currency
  test("currency", async () => {
    const name = "currency";
    const pdfSnapshot = await pdf(minimalRequiredWithEuro, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithEuro, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  // Additional Information
  test("additional Information", async () => {
    const name = "additional-information";
    const pdfSnapshot = await pdf(minimalRequiredWithAdditionalInformation, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAdditionalInformation, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  // Alternative schemes
  test("alternative schemes AV1", async () => {
    const name = "alternative-schemes-av1";
    const pdfSnapshot = await pdf(minimalRequiredWithAlternativeScheme1, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAlternativeScheme1, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("alternative schemes AV2", async () => {
    const name = "alternative-schemes-av2";
    const pdfSnapshot = await pdf(minimalRequiredWithAlternativeScheme2, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAlternativeScheme2, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("alternative schemes AV1 & AV2", async () => {
    const name = "alternative-schemes-av1-av2";
    const pdfSnapshot = await pdf(minimalRequiredWithAlternativeScheme1and2, `data/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAlternativeScheme1and2, `data/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

});
