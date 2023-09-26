"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const errors = require("./errors.cjs");
const utils = require("./utils.cjs");
function validateData(data) {
  if (data.reference !== void 0) {
    if (typeof data.reference !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.REFERENCE_TYPE_IS_INVALID);
    }
  }
  if (data.message !== void 0) {
    if (typeof data.message !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.MESSAGE_TYPE_IS_INVALID);
    }
    if (data.message.length > 140) {
      throw new errors.ValidationError(errors.ValidationErrors.MESSAGE_LENGTH_IS_INVALID);
    }
  }
  if (data.additionalInformation !== void 0) {
    if (typeof data.additionalInformation !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.ADDITIONAL_INFORMATION_TYPE_IS_INVALID);
    }
    if (data.additionalInformation.length > 140) {
      throw new errors.ValidationError(errors.ValidationErrors.ADDITIONAL_INFORMATION_LENGTH_IS_INVALID);
    }
  }
  if (data.message !== void 0 && data.additionalInformation !== void 0) {
    if (data.additionalInformation.length + data.message.length > 140) {
      throw new errors.ValidationError(errors.ValidationErrors.MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID);
    }
  }
  if (data.av1 !== void 0) {
    if (typeof data.av1 !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.ALTERNATIVE_SCHEME_TYPE_IS_INVALID, { scheme: "AV1" });
    }
    if (data.av1.length > 100) {
      throw new errors.ValidationError(errors.ValidationErrors.ALTERNATIVE_SCHEME_LENGTH_IS_INVALID, { scheme: "AV1" });
    }
  }
  if (data.av2 !== void 0) {
    if (typeof data.av2 !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.ALTERNATIVE_SCHEME_TYPE_IS_INVALID, { scheme: "AV2" });
    }
    if (data.av2.length > 100) {
      throw new errors.ValidationError(errors.ValidationErrors.ALTERNATIVE_SCHEME_LENGTH_IS_INVALID, { scheme: "AV2" });
    }
  }
  if (data.creditor === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_IS_UNDEFINED);
  }
  if (data.creditor.account === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ACCOUNT_IS_UNDEFINED);
  }
  if (!data.creditor.account.startsWith("CH") && !data.creditor.account.startsWith("LI")) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ACCOUNT_COUNTRY_IS_INVALID);
  }
  if (data.creditor.account.length !== 21) {
    throw new errors.ValidationError(errors.ValidationErrors.ACCOUNT_LENGTH_IS_INVALID, { iban: data.creditor.account });
  }
  if (data.creditor.name === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_NAME_IS_UNDEFINED);
  }
  if (typeof data.creditor.name !== "string") {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_NAME_TYPE_IS_INVALID);
  }
  if (data.creditor.name.length > 70) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_NAME_LENGTH_IS_INVALID);
  }
  if (data.creditor.address === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ADDRESS_IS_UNDEFINED);
  }
  if (typeof data.creditor.address !== "string") {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ADDRESS_TYPE_IS_INVALID);
  }
  if (data.creditor.address.length > 70) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ADDRESS_LENGTH_IS_INVALID);
  }
  if (data.creditor.buildingNumber !== void 0) {
    if (typeof data.creditor.buildingNumber !== "string" && typeof data.creditor.buildingNumber !== "number") {
      throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID);
    }
    if (data.creditor.buildingNumber.toString().length > 16) {
      throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID);
    }
  }
  if (data.creditor.zip === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ZIP_IS_UNDEFINED);
  }
  if (typeof data.creditor.zip !== "string" && typeof data.creditor.zip !== "number") {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ZIP_TYPE_IS_INVALID);
  }
  if (data.creditor.zip.toString().length > 16) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ZIP_LENGTH_IS_INVALID);
  }
  if (data.creditor.city === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_CITY_IS_UNDEFINED);
  }
  if (typeof data.creditor.city !== "string") {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_CITY_TYPE_IS_INVALID);
  }
  if (data.creditor.city.length > 35) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_CITY_LENGTH_IS_INVALID);
  }
  if (data.creditor.country === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_COUNTRY_IS_UNDEFINED);
  }
  if (typeof data.creditor.country !== "string") {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_COUNTRY_TYPE_IS_INVALID);
  }
  if (data.creditor.country.length !== 2) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_COUNTRY_LENGTH_IS_INVALID);
  }
  if (data.amount !== void 0) {
    if (typeof data.amount !== "number") {
      throw new errors.ValidationError(errors.ValidationErrors.AMOUNT_TYPE_IS_INVALID);
    }
    if (data.amount.toFixed(2).toString().length > 12) {
      throw new errors.ValidationError(errors.ValidationErrors.AMOUNT_LENGTH_IS_INVALID);
    }
  }
  if (data.currency === void 0) {
    throw new errors.ValidationError(errors.ValidationErrors.CURRENCY_IS_UNDEFINED);
  }
  if (typeof data.currency !== "string") {
    throw new errors.ValidationError(errors.ValidationErrors.CURRENCY_TYPE_IS_INVALID);
  }
  if (data.currency.length !== 3) {
    throw new errors.ValidationError(errors.ValidationErrors.CURRENCY_LENGTH_IS_INVALID);
  }
  if (data.currency !== "CHF" && data.currency !== "EUR") {
    throw new errors.ValidationError(errors.ValidationErrors.CURRENCY_STRING_IS_INVALID);
  }
  if (data.debtor !== void 0) {
    if (data.debtor.name === void 0) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_NAME_IS_UNDEFINED);
    }
    if (typeof data.debtor.name !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_NAME_TYPE_IS_INVALID);
    }
    if (data.debtor.name.length > 70) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_NAME_LENGTH_IS_INVALID);
    }
    if (data.debtor.address === void 0) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_ADDRESS_IS_UNDEFINED);
    }
    if (typeof data.debtor.address !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_ADDRESS_TYPE_IS_INVALID);
    }
    if (data.debtor.address.length > 70) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_ADDRESS_LENGTH_IS_INVALID);
    }
    if (data.debtor.buildingNumber !== void 0) {
      if (typeof data.debtor.buildingNumber !== "string" && typeof data.debtor.buildingNumber !== "number") {
        throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID);
      }
      if (data.debtor.buildingNumber.toString().length > 16) {
        throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID);
      }
    }
    if (data.debtor.zip === void 0) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_ZIP_IS_UNDEFINED);
    }
    if (typeof data.debtor.zip !== "string" && typeof data.debtor.zip !== "number") {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_ZIP_TYPE_IS_INVALID);
    }
    if (data.debtor.zip.toString().length > 16) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_ZIP_LENGTH_IS_INVALID);
    }
    if (data.debtor.city === void 0) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_CITY_IS_UNDEFINED);
    }
    if (typeof data.debtor.city !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_CITY_TYPE_IS_INVALID);
    }
    if (data.debtor.city.length > 35) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_CITY_LENGTH_IS_INVALID);
    }
    if (data.debtor.country === void 0) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_COUNTRY_IS_UNDEFINED);
    }
    if (typeof data.debtor.country !== "string") {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_COUNTRY_TYPE_IS_INVALID);
    }
    if (data.debtor.country.length !== 2) {
      throw new errors.ValidationError(errors.ValidationErrors.DEBTOR_COUNTRY_LENGTH_IS_INVALID);
    }
  }
  if (utils.isIBANValid(data.creditor.account) === false) {
    throw new errors.ValidationError(errors.ValidationErrors.CREDITOR_ACCOUNT_IS_INVALID, { iban: data.creditor.account });
  }
  if (utils.isQRIBAN(data.creditor.account)) {
    if (data.reference === void 0) {
      throw new errors.ValidationError(errors.ValidationErrors.ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING);
    }
    if (data.reference.length !== 27) {
      throw new errors.ValidationError(errors.ValidationErrors.QR_REFERENCE_LENGTH_IS_INVALID);
    }
    if (utils.isQRReference(data.reference)) {
      if (!utils.isQRReferenceValid(data.reference)) {
        throw new errors.ValidationError(errors.ValidationErrors.QR_REFERENCE_IS_INVALID, { reference: data.reference });
      }
    } else {
      throw new errors.ValidationError(errors.ValidationErrors.ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR);
    }
  } else {
    if (data.reference !== void 0) {
      if (utils.isQRReference(data.reference)) {
        throw new errors.ValidationError(errors.ValidationErrors.ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR);
      }
      if (data.reference.length > 25) {
        throw new errors.ValidationError(errors.ValidationErrors.REGULAR_REFERENCE_LENGTH_IS_INVALID);
      }
    }
  }
}
exports.validateData = validateData;
