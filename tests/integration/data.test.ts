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
} from "swissqrbill:tests:data/data.js";
import { pdf } from "swissqrbill:tests:utils/pdf.js";
import { svg } from "swissqrbill:tests:utils/svg.js";


const OUT_DIR_PDF = "tests/output/pdf/data";
const OUT_DIR_SVG = "tests/output/svg/data";

describe("Data", async () => {


  //-- Minimal required

  test("Minimal required data", async () => {
    const name = "minimal-required";
    const pdfSnapshot = await pdf(minimalRequired, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequired, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Minimal required data + amount", async () => {
    const name = "minimal-required-with-amount";
    const pdfSnapshot = await pdf(minimalRequiredWithAmount, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAmount, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Minimal required data + debtor", async () => {
    const name = "minimal-required-with-debtor";
    const pdfSnapshot = await pdf(minimalRequiredWithDebtor, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithDebtor, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });


  //-- Creditor

  test("Creditor with building number", async () => {
    const name = "creditor-with-building-number";
    const pdfSnapshot = await pdf(creditorWithBuildingNumber, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithBuildingNumber, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Creditor with building number as string", async () => {
    const name = "creditor-with-building-number-string";
    const pdfSnapshot = await pdf(creditorWithBuildingNumberString, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithBuildingNumberString, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Creditor with maxed out field lengths", async () => {
    const name = "creditor-with-maxed-out-field-lengths";
    const pdfSnapshot = await pdf(creditorWithMaxedOutFieldLengths, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithMaxedOutFieldLengths, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Creditor with QR IBAN", async () => {
    const name = "creditor-with-qr-iban";
    const pdfSnapshot = await pdf(creditorWithQRIBAN, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithQRIBAN, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Creditor with normal IBAN", async () => {
    const name = "creditor-with-normal-iban";
    const pdfSnapshot = await pdf(creditorWithNormalIBAN, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithNormalIBAN, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Creditor with normal IBAN and reference", async () => {
    const name = "creditor-with-normal-iban-and-reference";
    const pdfSnapshot = await pdf(creditorWithNormalIBANAndReference, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(creditorWithNormalIBANAndReference, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });


  //-- Debtor

  test("Debtor with building number", async () => {
    const name = "debtor-with-building-number";
    const pdfSnapshot = await pdf(debtorWithBuildingNumber, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(debtorWithBuildingNumber, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Debtor with building number as string", async () => {
    const name = "debtor-with-building-number-string";
    const pdfSnapshot = await pdf(debtorWithBuildingNumberString, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(debtorWithBuildingNumberString, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Debtor with maxed out field lengths", async () => {
    const name = "debtor-with-maxed-out-field-lengths";
    const pdfSnapshot = await pdf(debtorWithMaxedOutFieldLengths, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(debtorWithMaxedOutFieldLengths, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });


  //-- Message

  test("Message", async () => {
    const name = "message";
    const pdfSnapshot = await pdf(minimalRequiredWithMessage, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithMessage, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Message with maxed out field length", async () => {
    const name = "message-with-maxed-out-field-length";
    const pdfSnapshot = await pdf(minimalRequiredWithMaxedOutMessage, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithMaxedOutMessage, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });


  //-- Currency

  test("Currency", async () => {
    const name = "currency";
    const pdfSnapshot = await pdf(minimalRequiredWithEuro, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithEuro, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });


  //-- Additional Information

  test("Additional Information", async () => {
    const name = "additional-information";
    const pdfSnapshot = await pdf(minimalRequiredWithAdditionalInformation, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAdditionalInformation, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });


  //-- Alternative schemes

  test("Alternative schemes AV1", async () => {
    const name = "alternative-schemes-av1";
    const pdfSnapshot = await pdf(minimalRequiredWithAlternativeScheme1, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAlternativeScheme1, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Alternative schemes AV2", async () => {
    const name = "alternative-schemes-av2";
    const pdfSnapshot = await pdf(minimalRequiredWithAlternativeScheme2, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAlternativeScheme2, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

  test("Alternative schemes AV1 & AV2", async () => {
    const name = "alternative-schemes-av1-av2";
    const pdfSnapshot = await pdf(minimalRequiredWithAlternativeScheme1and2, `${OUT_DIR_PDF}/${name}.pdf`);
    const svgSnapshot = await svg(minimalRequiredWithAlternativeScheme1and2, `${OUT_DIR_SVG}/${name}.svg`);
    expect(pdfSnapshot).toMatchSnapshot();
    expect(svgSnapshot).toMatchSnapshot();
  });

});
