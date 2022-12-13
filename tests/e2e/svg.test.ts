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
import { svg } from "swissqrbill:tests:utils/svg.js";


const OUT_DIR = "tests/output/svg";
const VISUAL = process.env.VISUAL === "true";

describe("PDF", async () => {

  beforeAll(async () => {
    if(VISUAL){
      mkdirSync(OUT_DIR, { recursive: true });
    }
  });


  //-- Minimal required

  test("Minimal required data", async () => {
    const path = VISUAL ? `${OUT_DIR}/minimal-required.svg` : undefined;
    const content = await svg(minimalRequired, path);
    expect(content).toMatchSnapshot();
  });

  test("Minimal required data + amount", async () => {
    const path = VISUAL ? `${OUT_DIR}/minimal-required-with-amount.svg` : undefined;
    const images = await svg(minimalRequiredWithAmount, path);
    expect(images).toMatchSnapshot();
  });

  test("Minimal required data + debtor", async () => {
    const path = VISUAL ? `${OUT_DIR}/minimal-required-with-debtor.svg` : undefined;
    const images = await svg(minimalRequiredWithDebtor, path);
    expect(images).toMatchSnapshot();
  });


  //-- Creditor

  test("Creditor with building number", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-building-number.svg` : undefined;
    const images = await svg(creditorWithBuildingNumber, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with building number as string", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-building-number-string.svg` : undefined;
    const images = await svg(creditorWithBuildingNumberString, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with maxed out field lengths", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-maxed-out-field-lengths.svg` : undefined;
    const images = await svg(creditorWithMaxedOutFieldLengths, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with QR IBAN", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-qr-iban.svg` : undefined;
    const images = await svg(creditorWithQRIBAN, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with normal IBAN", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-normal-iban.svg` : undefined;
    const images = await svg(creditorWithNormalIBAN, path);
    expect(images).toMatchSnapshot();
  });

  test("Creditor with normal IBAN and reference", async () => {
    const path = VISUAL ? `${OUT_DIR}/creditor-with-normal-iban-and-reference.svg` : undefined;
    const images = await svg(creditorWithNormalIBANAndReference, path);
    expect(images).toMatchSnapshot();
  });


  //-- Debtor

  test("Debtor with building number", async () => {
    const path = VISUAL ? `${OUT_DIR}/debtor-with-building-number.svg` : undefined;
    const images = await svg(debtorWithBuildingNumber, path);
    expect(images).toMatchSnapshot();
  });

  test("Debtor with building number as string", async () => {
    const path = VISUAL ? `${OUT_DIR}/debtor-with-building-number-string.svg` : undefined;
    const images = await svg(debtorWithBuildingNumberString, path);
    expect(images).toMatchSnapshot();
  });

  test("Debtor with maxed out field lengths", async () => {
    const path = VISUAL ? `${OUT_DIR}/debtor-with-maxed-out-field-lengths.svg` : undefined;
    const images = await svg(debtorWithMaxedOutFieldLengths, path);
    expect(images).toMatchSnapshot();
  });


  //-- Message

  test("Message", async () => {
    const path = VISUAL ? `${OUT_DIR}/message.svg` : undefined;
    const images = await svg(minimalRequiredWithMessage, path);
    expect(images).toMatchSnapshot();
  });

  test("Message with maxed out field length", async () => {
    const path = VISUAL ? `${OUT_DIR}/message-with-maxed-out-field-length.svg` : undefined;
    const images = await svg(minimalRequiredWithMaxedOutMessage, path);
    expect(images).toMatchSnapshot();
  });


  //-- Currency

  test("Currency", async () => {
    const path = VISUAL ? `${OUT_DIR}/currency.svg` : undefined;
    const images = await svg(minimalRequiredWithEuro, path);
    expect(images).toMatchSnapshot();
  });


  //-- Additional Information

  test("Additional Information", async () => {
    const path = VISUAL ? `${OUT_DIR}/additional-information.svg` : undefined;
    const images = await svg(minimalRequiredWithAdditionalInformation, path);
    expect(images).toMatchSnapshot();
  });


  //-- Alternative schemes

  test("Alternative schemes AV1", async () => {
    const path = VISUAL ? `${OUT_DIR}/alternative-schemes-av1.svg` : undefined;
    const images = await svg(minimalRequiredWithAlternativeScheme1, path);
    expect(images).toMatchSnapshot();
  });

  test("Alternative schemes AV2", async () => {
    const path = VISUAL ? `${OUT_DIR}/alternative-schemes-av2.svg` : undefined;
    const images = await svg(minimalRequiredWithAlternativeScheme2, path);
    expect(images).toMatchSnapshot();
  });

  test("Alternative schemes AV1 & AV2", async () => {
    const path = VISUAL ? `${OUT_DIR}/alternative-schemes-av1-av2.svg` : undefined;
    const images = await svg(minimalRequiredWithAlternativeScheme1and2, path);
    expect(images).toMatchSnapshot();
  });

});
