import { describe, expect, it } from "vitest";

import { cleanData } from "swissqrbill:shared/cleaner";
import { resolveMessageParams, ValidationErrors } from "swissqrbill:shared/errors";
import { validateData } from "swissqrbill:shared/validator";
import {
  additionalInformationInvalidType,
  additionalInformationTooLong,
  amountInvalidType,
  amountTooLong,
  av1InvalidType,
  av1TooLong,
  av2InvalidType,
  av2TooLong,
  creditorAccountTooLong,
  creditorAccountTooShort,
  creditorAddressTooLong,
  creditorBuildingNumberTooLong,
  creditorCityTooLong,
  creditorCountryTooLong,
  creditorCountryTooShort,
  creditorInvalidAddressType,
  creditorInvalidBuildingNumberType,
  creditorInvalidCityType,
  creditorInvalidCountryType,
  creditorInvalidNameType,
  creditorInvalidZipType,
  creditorMissingAddress,
  creditorMissingCity,
  creditorMissingCountry,
  creditorMissingName,
  creditorMissingZip,
  creditorNameTooLong,
  creditorZipTooLong,
  currencyTooLong,
  currencyTooShort,
  debtorAddressTooLong,
  debtorBuildingNumberTooLong,
  debtorCityTooLong,
  debtorCountryTooLong,
  debtorCountryTooShort,
  debtorInvalidAddressType,
  debtorInvalidBuildingNumberType,
  debtorInvalidCityType,
  debtorInvalidCountryType,
  debtorInvalidNameType,
  debtorInvalidZipType,
  debtorMissingAddress,
  debtorMissingCity,
  debtorMissingCountry,
  debtorMissingName,
  debtorMissingZip,
  debtorNameTooLong,
  debtorZipTooLong,
  invalidCreditorAccount,
  invalidCreditorAccountCountry,
  invalidCurrency,
  invalidCurrencyType,
  messageAndAdditionalInformationTooLong,
  messageInvalidType,
  messageTooLong,
  missingCreditor,
  missingCreditorAccount,
  missingCurrency,
  qrIbanInvalidQRReference,
  qrIbanMissingReference,
  qrIbanQRReferenceTooLong,
  qrIbanQRReferenceTooShort,
  qrIbanRegularReference,
  referenceTypeInvalid,
  regularIBANAndQRReference,
  regularIBANAndReferenceTooLong
} from "swissqrbill:tests:data/invalid-data";
import {
  creditorWithBuildingNumber,
  creditorWithBuildingNumberString,
  creditorWithMaxedOutFieldLengths,
  creditorWithNormalIBAN,
  creditorWithNormalIBANAndReference,
  creditorWithQRIBAN,
  creditorWithZipString,
  debtorWithBuildingNumber,
  debtorWithBuildingNumberString,
  debtorWithMaxedOutFieldLengths,
  debtorWithZipString,
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


describe("validator", async () => {

  it("should not throw an error for valid data", async () => {
    expect(() => validateData(cleanData(minimalRequired))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithAmount))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithBuildingNumber))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithBuildingNumberString))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithZipString))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithQRIBAN))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithNormalIBAN))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithNormalIBANAndReference))).not.toThrow();
    expect(() => validateData(cleanData(creditorWithMaxedOutFieldLengths))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithDebtor))).not.toThrow();
    expect(() => validateData(cleanData(debtorWithBuildingNumber))).not.toThrow();
    expect(() => validateData(cleanData(debtorWithBuildingNumberString))).not.toThrow();
    expect(() => validateData(cleanData(debtorWithZipString))).not.toThrow();
    expect(() => validateData(cleanData(debtorWithMaxedOutFieldLengths))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithMessage))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithMaxedOutMessage))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithEuro))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithAdditionalInformation))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithAlternativeScheme1))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithAlternativeScheme2))).not.toThrow();
    expect(() => validateData(cleanData(minimalRequiredWithAlternativeScheme1and2))).not.toThrow();
  });

  it("should throw a ValidationError if the creditor is missing", async () => {
    expect(() => validateData(cleanData(missingCreditor)))
      .toThrow(ValidationErrors.CREDITOR_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor account is missing", async () => {
    expect(() => validateData(cleanData(missingCreditorAccount)))
      .toThrow(ValidationErrors.CREDITOR_ACCOUNT_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor account country is invalid", async () => {
    expect(() => validateData(cleanData(invalidCreditorAccountCountry)))
      .toThrow(ValidationErrors.CREDITOR_ACCOUNT_COUNTRY_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor account is too short or too long", async () => {
    const cleanedCreditorAccountTooShort = cleanData(creditorAccountTooShort);
    expect(() => validateData(cleanedCreditorAccountTooShort))
      .toThrow(resolveMessageParams(ValidationErrors.ACCOUNT_LENGTH_IS_INVALID, { iban: cleanedCreditorAccountTooShort.creditor.account }));

    const cleanedCreditorAccountTooLong = cleanData(creditorAccountTooLong);
    expect(() => validateData(cleanedCreditorAccountTooLong))
      .toThrow(resolveMessageParams(ValidationErrors.ACCOUNT_LENGTH_IS_INVALID, { iban: cleanedCreditorAccountTooLong.creditor.account }));
  });

  it("should throw a ValidationError if the creditor account is invalid", async () => {
    const cleanedInvalidCreditorAccount = cleanData(invalidCreditorAccount);
    expect(() => validateData(cleanData(cleanedInvalidCreditorAccount)))
      .toThrow(resolveMessageParams(ValidationErrors.CREDITOR_ACCOUNT_IS_INVALID, { iban: cleanedInvalidCreditorAccount.creditor.account }));
  });

  it("should throw a ValidationError if the creditor account is a QR-IBAN and the reference is missing", async () => {
    expect(() => validateData(cleanData(qrIbanMissingReference)))
      .toThrow(ValidationErrors.ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING);
  });

  it("should throw a ValidationError if the creditor account is a QR-IBAN and the reference is invalid", async () => {
    const cleanedQrIbanWithInvalidQRReference = cleanData(qrIbanInvalidQRReference);
    expect(() => validateData(cleanedQrIbanWithInvalidQRReference))
      .toThrow(resolveMessageParams(ValidationErrors.QR_REFERENCE_IS_INVALID, { reference: cleanedQrIbanWithInvalidQRReference.reference! }));
  });

  it("should throw a ValidationError if the creditor account is a QR-IBAN and the reference is too short or too long", async () => {
    expect(() => validateData(cleanData(qrIbanQRReferenceTooShort)))
      .toThrow(ValidationErrors.QR_REFERENCE_LENGTH_IS_INVALID);

    expect(() => validateData(cleanData(qrIbanQRReferenceTooLong)))
      .toThrow(ValidationErrors.QR_REFERENCE_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor account is a QR-IBAN and the reference is not a QR-Reference", async () => {
    expect(() => validateData(cleanData(qrIbanRegularReference)))
      .toThrow(ValidationErrors.ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR);
  });

  it("should throw a ValidationError if the creditor account is a regular IBAN and the reference is a QR-Reference", async () => {
    expect(() => validateData(cleanData(regularIBANAndQRReference)))
      .toThrow(ValidationErrors.ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR);
  });

  it("should throw a ValidationError if the reference is too long", async () => {
    expect(() => validateData(cleanData(regularIBANAndReferenceTooLong)))
      .toThrow(ValidationErrors.REGULAR_REFERENCE_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor name is missing", async () => {
    expect(() => validateData(cleanData(creditorMissingName)))
      .toThrow(ValidationErrors.CREDITOR_NAME_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor name is not a string", async () => {
    expect(() => validateData(cleanData(creditorInvalidNameType)))
      .toThrow(ValidationErrors.CREDITOR_NAME_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor name is too long", async () => {
    expect(() => validateData(cleanData(creditorNameTooLong)))
      .toThrow(ValidationErrors.CREDITOR_NAME_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor address is missing", async () => {
    expect(() => validateData(cleanData(creditorMissingAddress)))
      .toThrow(ValidationErrors.CREDITOR_ADDRESS_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor address is not a string", async () => {
    expect(() => validateData(cleanData(creditorInvalidAddressType)))
      .toThrow(ValidationErrors.CREDITOR_ADDRESS_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor address is too long", async () => {
    expect(() => validateData(cleanData(creditorAddressTooLong)))
      .toThrow(ValidationErrors.CREDITOR_ADDRESS_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor buildingNumber is not a string or a number", async () => {
    expect(() => validateData(cleanData(creditorInvalidBuildingNumberType)))
      .toThrow(ValidationErrors.CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor buildingNumber is too long", async () => {
    expect(() => validateData(cleanData(creditorBuildingNumberTooLong)))
      .toThrow(ValidationErrors.CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor zip is missing", async () => {
    expect(() => validateData(cleanData(creditorMissingZip)))
      .toThrow(ValidationErrors.CREDITOR_ZIP_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor zip is not a string or a number", async () => {
    expect(() => validateData(cleanData(creditorInvalidZipType)))
      .toThrow(ValidationErrors.CREDITOR_ZIP_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor zip is too long", async () => {
    expect(() => validateData(cleanData(creditorZipTooLong)))
      .toThrow(ValidationErrors.CREDITOR_ZIP_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor city is missing", async () => {
    expect(() => validateData(cleanData(creditorMissingCity)))
      .toThrow(ValidationErrors.CREDITOR_CITY_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor city is not a string", async () => {
    expect(() => validateData(cleanData(creditorInvalidCityType)))
      .toThrow(ValidationErrors.CREDITOR_CITY_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor city is too long", async () => {
    expect(() => validateData(cleanData(creditorCityTooLong)))
      .toThrow(ValidationErrors.CREDITOR_CITY_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor country is missing", async () => {
    expect(() => validateData(cleanData(creditorMissingCountry)))
      .toThrow(ValidationErrors.CREDITOR_COUNTRY_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the creditor country is not a string", async () => {
    expect(() => validateData(cleanData(creditorInvalidCountryType)))
      .toThrow(ValidationErrors.CREDITOR_COUNTRY_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the creditor country is too short or too long", async () => {
    expect(() => validateData(cleanData(creditorCountryTooShort)))
      .toThrow(ValidationErrors.CREDITOR_COUNTRY_LENGTH_IS_INVALID);

    expect(() => validateData(cleanData(creditorCountryTooLong)))
      .toThrow(ValidationErrors.CREDITOR_COUNTRY_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the amount is not a number", async () => {
    expect(() => validateData(cleanData(amountInvalidType)))
      .toThrow(ValidationErrors.AMOUNT_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the amount is too long", async () => {
    expect(() => validateData(cleanData(amountTooLong)))
      .toThrow(ValidationErrors.AMOUNT_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the currency is missing", async () => {
    expect(() => validateData(cleanData(missingCurrency)))
      .toThrow(ValidationErrors.CURRENCY_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the currency is not a string", async () => {
    expect(() => validateData(cleanData(invalidCurrencyType)))
      .toThrow(ValidationErrors.CURRENCY_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the currency is too short or too long", async () => {
    expect(() => validateData(cleanData(currencyTooShort)))
      .toThrow(ValidationErrors.CURRENCY_LENGTH_IS_INVALID);

    expect(() => validateData(cleanData(currencyTooLong)))
      .toThrow(ValidationErrors.CURRENCY_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the currency is not CHF or EUR", async () => {
    expect(() => validateData(cleanData(invalidCurrency)))
      .toThrow(ValidationErrors.CURRENCY_STRING_IS_INVALID);
  });


  // Debtor
  it("should throw a ValidationError if the debtor account is a QR-IBAN and the reference is missing", async () => {
    expect(() => validateData(cleanData(qrIbanMissingReference)))
      .toThrow(ValidationErrors.ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING);
  });

  it("should throw a ValidationError if the debtor account is a QR-IBAN and the reference is invalid", async () => {
    const cleanedQrIbanWithInvalidQRReference = cleanData(qrIbanInvalidQRReference);
    expect(() => validateData(cleanedQrIbanWithInvalidQRReference))
      .toThrow(resolveMessageParams(ValidationErrors.QR_REFERENCE_IS_INVALID, { reference: cleanedQrIbanWithInvalidQRReference.reference! }));
  });

  it("should throw a ValidationError if the debtor account is a QR-IBAN and the reference is not a QR-Reference", async () => {
    expect(() => validateData(cleanData(qrIbanRegularReference)))
      .toThrow(ValidationErrors.ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR);
  });

  it("should throw a ValidationError if the debtor name is missing", async () => {
    expect(() => validateData(cleanData(debtorMissingName)))
      .toThrow(ValidationErrors.DEBTOR_NAME_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the debtor name is not a string", async () => {
    expect(() => validateData(cleanData(debtorInvalidNameType)))
      .toThrow(ValidationErrors.DEBTOR_NAME_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor name is too long", async () => {
    expect(() => validateData(cleanData(debtorNameTooLong)))
      .toThrow(ValidationErrors.DEBTOR_NAME_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor address is missing", async () => {
    expect(() => validateData(cleanData(debtorMissingAddress)))
      .toThrow(ValidationErrors.DEBTOR_ADDRESS_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the debtor address is not a string", async () => {
    expect(() => validateData(cleanData(debtorInvalidAddressType)))
      .toThrow(ValidationErrors.DEBTOR_ADDRESS_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor address is too long", async () => {
    expect(() => validateData(cleanData(debtorAddressTooLong)))
      .toThrow(ValidationErrors.DEBTOR_ADDRESS_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor buildingNumber is not a string or a number", async () => {
    expect(() => validateData(cleanData(debtorInvalidBuildingNumberType)))
      .toThrow(ValidationErrors.DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor buildingNumber is too long", async () => {
    expect(() => validateData(cleanData(debtorBuildingNumberTooLong)))
      .toThrow(ValidationErrors.DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor zip is missing", async () => {
    expect(() => validateData(cleanData(debtorMissingZip)))
      .toThrow(ValidationErrors.DEBTOR_ZIP_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the debtor zip is not a string or a number", async () => {
    expect(() => validateData(cleanData(debtorInvalidZipType)))
      .toThrow(ValidationErrors.DEBTOR_ZIP_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor zip is too long", async () => {
    expect(() => validateData(cleanData(debtorZipTooLong)))
      .toThrow(ValidationErrors.DEBTOR_ZIP_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor city is missing", async () => {
    expect(() => validateData(cleanData(debtorMissingCity)))
      .toThrow(ValidationErrors.DEBTOR_CITY_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the debtor city is not a string", async () => {
    expect(() => validateData(cleanData(debtorInvalidCityType)))
      .toThrow(ValidationErrors.DEBTOR_CITY_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor city is too long", async () => {
    expect(() => validateData(cleanData(debtorCityTooLong)))
      .toThrow(ValidationErrors.DEBTOR_CITY_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor country is missing", async () => {
    expect(() => validateData(cleanData(debtorMissingCountry)))
      .toThrow(ValidationErrors.DEBTOR_COUNTRY_IS_UNDEFINED);
  });

  it("should throw a ValidationError if the debtor country is not a string", async () => {
    expect(() => validateData(cleanData(debtorInvalidCountryType)))
      .toThrow(ValidationErrors.DEBTOR_COUNTRY_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the debtor country is too short or too long", async () => {
    expect(() => validateData(cleanData(debtorCountryTooShort)))
      .toThrow(ValidationErrors.DEBTOR_COUNTRY_LENGTH_IS_INVALID);

    expect(() => validateData(cleanData(debtorCountryTooLong)))
      .toThrow(ValidationErrors.DEBTOR_COUNTRY_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the reference is not a string", async () => {
    expect(() => validateData(cleanData(referenceTypeInvalid)))
      .toThrow(ValidationErrors.REFERENCE_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the message is not a string", async () => {
    expect(() => validateData(cleanData(messageInvalidType)))
      .toThrow(ValidationErrors.MESSAGE_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the message is too long", async () => {
    expect(() => validateData(cleanData(messageTooLong)))
      .toThrow(ValidationErrors.MESSAGE_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the additional information is not a string", async () => {
    expect(() => validateData(cleanData(additionalInformationInvalidType)))
      .toThrow(ValidationErrors.ADDITIONAL_INFORMATION_TYPE_IS_INVALID);
  });

  it("should throw a ValidationError if the additional information is too long", async () => {
    expect(() => validateData(cleanData(additionalInformationTooLong)))
      .toThrow(ValidationErrors.ADDITIONAL_INFORMATION_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the message and additional information combined are too long", async () => {
    expect(() => validateData(cleanData(messageAndAdditionalInformationTooLong)))
      .toThrow(ValidationErrors.MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID);
  });

  it("should throw a ValidationError if the alternative scheme 1 is not a string", async () => {
    expect(() => validateData(cleanData(av1InvalidType)))
      .toThrow(resolveMessageParams(ValidationErrors.ALTERNATIVE_SCHEME_TYPE_IS_INVALID, { scheme: "AV1" }));
  });

  it("should throw a ValidationError if the alternative scheme 1 is too long", async () => {
    expect(() => validateData(cleanData(av1TooLong)))
      .toThrow(resolveMessageParams(ValidationErrors.ALTERNATIVE_SCHEME_LENGTH_IS_INVALID, { scheme: "AV1" }));
  });

  it("should throw a ValidationError if the alternative scheme 2 is not a string", async () => {
    expect(() => validateData(cleanData(av2InvalidType)))
      .toThrow(resolveMessageParams(ValidationErrors.ALTERNATIVE_SCHEME_TYPE_IS_INVALID, { scheme: "AV2" }));
  });

  it("should throw a ValidationError if the alternative scheme 2 is too long", async () => {
    expect(() => validateData(cleanData(av2TooLong)))
      .toThrow(resolveMessageParams(ValidationErrors.ALTERNATIVE_SCHEME_LENGTH_IS_INVALID, { scheme: "AV2" }));
  });

});
