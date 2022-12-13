import { mkdirSync } from "node:fs";

import { beforeAll, describe, expect, test } from "vitest";

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


const OUT_DIR = "tests/output/pdf";
const VISUAL = process.env.VISUAL === "true";

describe("PDF", async () => {

  beforeAll(async () => {
    if(VISUAL){
      mkdirSync(OUT_DIR, { recursive: true });
    }
  });


  //-- Minimal required

  test("Minimal required data", async () => {
    const path = VISUAL ? `${OUT_DIR}/minimal-required.pdf` : undefined;
    const images = await pdf(minimalRequired, path);
    expect(images).toMatchSnapshot();
  });

  test("Minimal required data + amount", async () => {
    const path = VISUAL ? `${OUT_DIR}/minimal-required-with-amount.pdf` : undefined;
    const images = await pdf(minimalRequiredWithAmount, path);
    expect(images).toMatchSnapshot();
  });

  test("Minimal required data + debtor", async () => {
    const path = VISUAL ? `${OUT_DIR}/minimal-required-with-debtor.pdf` : undefined;
    const images = await pdf(minimalRequiredWithDebtor, path);
    expect(images).toMatchSnapshot();
  });


  //-- Creditor

  test("Creditor with building number", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-building-number.pdf` : undefined;
    const images = await pdf(creditorWithBuildingNumber, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with building number as string", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-building-number-string.pdf` : undefined;
    const images = await pdf(creditorWithBuildingNumberString, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with maxed out field lengths", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-maxed-out-field-lengths.pdf` : undefined;
    const images = await pdf(creditorWithMaxedOutFieldLengths, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with QR IBAN", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-qr-iban.pdf` : undefined;
    const images = await pdf(creditorWithQRIBAN, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with normal IBAN", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-normal-iban.pdf` : undefined;
    const images = await pdf(creditorWithNormalIBAN, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with normal IBAN and reference", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-normal-iban-and-reference.pdf` : undefined;
    const images = await pdf(creditorWithNormalIBANAndReference, path);
    expect(images).toMatchSnapshot();
  });


  //-- Debtor

  test("Debtor with building number", async () => {
    const path = VISUAL ? `${OUT_DIR}/debtor-with-building-number.pdf` : undefined;
    const images = await pdf(debtorWithBuildingNumber, path);
    expect(images).toMatchSnapshot();
  });

  test("Debtor with building number as string", async () => {
    const path = VISUAL ? `${OUT_DIR}/debtor-with-building-number-string.pdf` : undefined;
    const images = await pdf(debtorWithBuildingNumberString, path);
    expect(images).toMatchSnapshot();
  });

  test("Debtor with maxed out field lengths", async () => {
    const path = VISUAL ? `${OUT_DIR}/debtor-with-maxed-out-field-lengths.pdf` : undefined;
    const images = await pdf(debtorWithMaxedOutFieldLengths, path);
    expect(images).toMatchSnapshot();
  });


  //-- Message

  test("Message", async () => {
    const path = VISUAL ? `${OUT_DIR}/message.pdf` : undefined;
    const images = await pdf(minimalRequiredWithMessage, path);
    expect(images).toMatchSnapshot();
  });

  test("Message with maxed out field length", async () => {
    const path = VISUAL ? `${OUT_DIR}/message-with-maxed-out-field-length.pdf` : undefined;
    const images = await pdf(minimalRequiredWithMaxedOutMessage, path);
    expect(images).toMatchSnapshot();
  });


  //-- Currency

  test("Currency", async () => {
    const path = VISUAL ? `${OUT_DIR}/currency.pdf` : undefined;
    const images = await pdf(minimalRequiredWithEuro, path);
    expect(images).toMatchSnapshot();
  });


  //-- Additional Information

  test("Additional Information", async () => {
    const path = VISUAL ? `${OUT_DIR}/additional-information.pdf` : undefined;
    const images = await pdf(minimalRequiredWithAdditionalInformation, path);
    expect(images).toMatchSnapshot();
  });


  //-- Alternative schemes

  test("Alternative schemes AV1", async () => {
    const path = VISUAL ? `${OUT_DIR}/alternative-schemes-av1.pdf` : undefined;
    const images = await pdf(minimalRequiredWithAlternativeScheme1, path);
    expect(images).toMatchSnapshot();
  });

  test("Alternative schemes AV2", async () => {
    const path = VISUAL ? `${OUT_DIR}/alternative-schemes-av2.pdf` : undefined;
    const images = await pdf(minimalRequiredWithAlternativeScheme2, path);
    expect(images).toMatchSnapshot();
  });

  test("Alternative schemes AV1 & AV2", async () => {
    const path = VISUAL ? `${OUT_DIR}/alternative-schemes-av1-av2.pdf` : undefined;
    const images = await pdf(minimalRequiredWithAlternativeScheme1and2, path);
    expect(images).toMatchSnapshot();
  });

});
