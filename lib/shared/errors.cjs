"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class ValidationError extends Error {
  constructor(message, params) {
    const messageWithParams = params ? resolveMessageParams(message, params) : message;
    super(messageWithParams);
    this.name = "ValidationError";
  }
}
function resolveMessageParams(message, params) {
  return Object.entries(params).reduce((message2, [key, value]) => {
    return message2.replace(`{${key}}`, value);
  }, message);
}
var ValidationErrors = /* @__PURE__ */ ((ValidationErrors2) => {
  ValidationErrors2["ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING"] = "If there is no reference, a conventional IBAN must be used.";
  ValidationErrors2["ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR"] = "QR-IBAN requires the use of a QR-Reference.";
  ValidationErrors2["ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR"] = "QR-Reference requires the use of a QR-IBAN.";
  ValidationErrors2["ACCOUNT_LENGTH_IS_INVALID"] = "The provided IBAN number '{iban}' is either too long or too short.";
  ValidationErrors2["ADDITIONAL_INFORMATION_LENGTH_IS_INVALID"] = "Additional information must be a maximum of 140 characters.";
  ValidationErrors2["ADDITIONAL_INFORMATION_TYPE_IS_INVALID"] = "Additional information must be a string.";
  ValidationErrors2["ALTERNATIVE_SCHEME_LENGTH_IS_INVALID"] = "{scheme} must be a maximum of 100 characters.";
  ValidationErrors2["ALTERNATIVE_SCHEME_TYPE_IS_INVALID"] = "{scheme} must be a string.";
  ValidationErrors2["AMOUNT_LENGTH_IS_INVALID"] = "Amount must be a maximum of 12 digits.";
  ValidationErrors2["AMOUNT_TYPE_IS_INVALID"] = "Amount must be a number.";
  ValidationErrors2["CREDITOR_ACCOUNT_COUNTRY_IS_INVALID"] = "Only CH and LI IBAN numbers are allowed.";
  ValidationErrors2["CREDITOR_ACCOUNT_IS_INVALID"] = "The provided IBAN number '{iban}' is not valid.";
  ValidationErrors2["CREDITOR_ACCOUNT_IS_UNDEFINED"] = "Creditor account cannot be undefined.";
  ValidationErrors2["CREDITOR_ADDRESS_IS_UNDEFINED"] = "Creditor address cannot be undefined.";
  ValidationErrors2["CREDITOR_ADDRESS_LENGTH_IS_INVALID"] = "Creditor address must be a maximum of 70 characters.";
  ValidationErrors2["CREDITOR_ADDRESS_TYPE_IS_INVALID"] = "Creditor address TYPE must be a string.";
  ValidationErrors2["CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID"] = "Creditor buildingNumber must be a maximum of 16 characters.";
  ValidationErrors2["CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID"] = "Creditor buildingNumber must be either a string or a number.";
  ValidationErrors2["CREDITOR_CITY_IS_UNDEFINED"] = "Creditor city cannot be undefined.";
  ValidationErrors2["CREDITOR_CITY_LENGTH_IS_INVALID"] = "Creditor city must be a maximum of 35 characters.";
  ValidationErrors2["CREDITOR_CITY_TYPE_IS_INVALID"] = "Creditor city must be a string.";
  ValidationErrors2["CREDITOR_COUNTRY_IS_UNDEFINED"] = "Creditor country cannot be undefined.";
  ValidationErrors2["CREDITOR_COUNTRY_LENGTH_IS_INVALID"] = "Creditor country must be 2 characters.";
  ValidationErrors2["CREDITOR_COUNTRY_TYPE_IS_INVALID"] = "Creditor country must be a string.";
  ValidationErrors2["CREDITOR_IS_UNDEFINED"] = "Creditor cannot be undefined.";
  ValidationErrors2["CREDITOR_NAME_IS_UNDEFINED"] = "Creditor name cannot be undefined.";
  ValidationErrors2["CREDITOR_NAME_LENGTH_IS_INVALID"] = "Creditor name must be a maximum of 70 characters.";
  ValidationErrors2["CREDITOR_NAME_TYPE_IS_INVALID"] = "Creditor name must be a string.";
  ValidationErrors2["CREDITOR_ZIP_IS_UNDEFINED"] = "Creditor zip cannot be undefined.";
  ValidationErrors2["CREDITOR_ZIP_LENGTH_IS_INVALID"] = "Creditor zip must be a maximum of 16 characters.";
  ValidationErrors2["CREDITOR_ZIP_TYPE_IS_INVALID"] = "Creditor zip must be either a string or a number.";
  ValidationErrors2["CURRENCY_IS_UNDEFINED"] = "Currency cannot be undefined.";
  ValidationErrors2["CURRENCY_LENGTH_IS_INVALID"] = "Currency must be a length of 3 characters.";
  ValidationErrors2["CURRENCY_STRING_IS_INVALID"] = "Currency must be either 'CHF' or 'EUR'";
  ValidationErrors2["CURRENCY_TYPE_IS_INVALID"] = "Currency must be a string.";
  ValidationErrors2["DEBTOR_ADDRESS_IS_UNDEFINED"] = "Debtor address cannot be undefined.";
  ValidationErrors2["DEBTOR_ADDRESS_LENGTH_IS_INVALID"] = "Debtor address must be a maximum of 70 characters.";
  ValidationErrors2["DEBTOR_ADDRESS_TYPE_IS_INVALID"] = "Debtor address TYPE must be a string.";
  ValidationErrors2["DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID"] = "Debtor buildingNumber must be a maximum of 16 characters.";
  ValidationErrors2["DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID"] = "Debtor buildingNumber must be either a string or a number.";
  ValidationErrors2["DEBTOR_CITY_IS_UNDEFINED"] = "Debtor city cannot be undefined.";
  ValidationErrors2["DEBTOR_CITY_LENGTH_IS_INVALID"] = "Debtor city must be a maximum of 35 characters.";
  ValidationErrors2["DEBTOR_CITY_TYPE_IS_INVALID"] = "Debtor city must be a string.";
  ValidationErrors2["DEBTOR_COUNTRY_IS_UNDEFINED"] = "Debtor country cannot be undefined.";
  ValidationErrors2["DEBTOR_COUNTRY_LENGTH_IS_INVALID"] = "Debtor country must be 2 characters.";
  ValidationErrors2["DEBTOR_COUNTRY_TYPE_IS_INVALID"] = "Debtor country must be a string.";
  ValidationErrors2["DEBTOR_IS_UNDEFINED"] = "Debtor cannot be undefined.";
  ValidationErrors2["DEBTOR_NAME_IS_UNDEFINED"] = "Debtor name cannot be undefined.";
  ValidationErrors2["DEBTOR_NAME_LENGTH_IS_INVALID"] = "Debtor name must be a maximum of 70 characters.";
  ValidationErrors2["DEBTOR_NAME_TYPE_IS_INVALID"] = "Debtor name must be a string.";
  ValidationErrors2["DEBTOR_ZIP_IS_UNDEFINED"] = "Debtor zip cannot be undefined.";
  ValidationErrors2["DEBTOR_ZIP_LENGTH_IS_INVALID"] = "Debtor zip must be a maximum of 16 characters.";
  ValidationErrors2["DEBTOR_ZIP_TYPE_IS_INVALID"] = "Debtor zip must be either a string or a number.";
  ValidationErrors2["MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID"] = "Message and additionalInformation combined must be a maximum of 140 characters.";
  ValidationErrors2["MESSAGE_LENGTH_IS_INVALID"] = "Message must be a maximum of 140 characters.";
  ValidationErrors2["MESSAGE_TYPE_IS_INVALID"] = "Message must be a string.";
  ValidationErrors2["QR_REFERENCE_IS_INVALID"] = "The provided QR-Reference '{reference}' is not valid.";
  ValidationErrors2["QR_REFERENCE_LENGTH_IS_INVALID"] = "QR-Reference must be a must be exactly 27 characters.";
  ValidationErrors2["REFERENCE_TYPE_IS_INVALID"] = "Reference must be a string.";
  ValidationErrors2["REGULAR_REFERENCE_LENGTH_IS_INVALID"] = "Creditor reference must be a maximum of 25 characters.";
  return ValidationErrors2;
})(ValidationErrors || {});
exports.ValidationError = ValidationError;
exports.ValidationErrors = ValidationErrors;
exports.resolveMessageParams = resolveMessageParams;
