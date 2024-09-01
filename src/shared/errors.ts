/** A {@link ValidationError} is thrown when the data provided to swissqrbill is invalid. */
export class ValidationError extends Error {

  /** A stable error code that can be used to identify the error programmatically. */
  public code: keyof typeof ValidationErrors;

  /** @internal */
  constructor(message: ValidationErrors, params?: { [name: string]: string; }) {

    const messageWithParams = params
      ? resolveMessageParams(message, params)
      : message;

    super(messageWithParams);

    this.name = "ValidationError";
    this.code = getErrorCodeByMessage(message);

  }
}

/** @internal */
export function getErrorCodeByMessage(message: string): keyof typeof ValidationErrors {
  const errorCodes = Object.keys(ValidationErrors);
  const errorCode = errorCodes.find(key => ValidationErrors[key] === message);

  return errorCode as keyof typeof ValidationErrors;
}

/** @internal */
export function resolveMessageParams(message: string, params: { [name: string]: string; }): string {
  return Object.entries(params).reduce((message, [key, value]) => {
    return message.replace(`{${key}}`, value);
  }, message);
}

export enum ValidationErrors {
  ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING = "If there is no reference, a conventional IBAN must be used.",
  ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR = "QR-IBAN requires the use of a QR-Reference.",
  ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR = "QR-Reference requires the use of a QR-IBAN.",
  ACCOUNT_LENGTH_IS_INVALID = "The provided IBAN number '{iban}' is either too long or too short.",
  ADDITIONAL_INFORMATION_LENGTH_IS_INVALID = "Additional information must be a maximum of 140 characters.",
  ADDITIONAL_INFORMATION_TYPE_IS_INVALID = "Additional information must be a string.",
  ALTERNATIVE_SCHEME_LENGTH_IS_INVALID = "{scheme} must be a maximum of 100 characters.",
  ALTERNATIVE_SCHEME_TYPE_IS_INVALID = "{scheme} must be a string.",
  AMOUNT_LENGTH_IS_INVALID = "Amount must be a maximum of 12 digits.",
  AMOUNT_TYPE_IS_INVALID = "Amount must be a number.",
  CREDITOR_ACCOUNT_COUNTRY_IS_INVALID = "Only CH and LI IBAN numbers are allowed.",
  CREDITOR_ACCOUNT_IS_INVALID = "The provided IBAN number '{iban}' is not valid.",
  CREDITOR_ACCOUNT_IS_UNDEFINED = "Creditor account cannot be undefined.",
  CREDITOR_ADDRESS_IS_UNDEFINED = "Creditor address cannot be undefined.",
  CREDITOR_ADDRESS_LENGTH_IS_INVALID = "Creditor address must be a maximum of 70 characters.",
  CREDITOR_ADDRESS_TYPE_IS_INVALID = "Creditor address TYPE must be a string.",
  CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID = "Creditor buildingNumber must be a maximum of 16 characters.",
  CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID = "Creditor buildingNumber must be either a string or a number.",
  CREDITOR_CITY_IS_UNDEFINED = "Creditor city cannot be undefined.",
  CREDITOR_CITY_LENGTH_IS_INVALID = "Creditor city must be a maximum of 35 characters.",
  CREDITOR_CITY_TYPE_IS_INVALID = "Creditor city must be a string.",
  CREDITOR_COUNTRY_IS_UNDEFINED = "Creditor country cannot be undefined.",
  CREDITOR_COUNTRY_LENGTH_IS_INVALID = "Creditor country must be 2 characters.",
  CREDITOR_COUNTRY_TYPE_IS_INVALID = "Creditor country must be a string.",
  CREDITOR_IS_UNDEFINED = "Creditor cannot be undefined.",
  CREDITOR_NAME_IS_UNDEFINED = "Creditor name cannot be undefined.",
  CREDITOR_NAME_LENGTH_IS_INVALID = "Creditor name must be a maximum of 70 characters.",
  CREDITOR_NAME_TYPE_IS_INVALID = "Creditor name must be a string.",
  CREDITOR_ZIP_IS_UNDEFINED = "Creditor zip cannot be undefined.",
  CREDITOR_ZIP_LENGTH_IS_INVALID = "Creditor zip must be a maximum of 16 characters.",
  CREDITOR_ZIP_TYPE_IS_INVALID = "Creditor zip must be either a string or a number.",
  CURRENCY_IS_UNDEFINED = "Currency cannot be undefined.",
  CURRENCY_LENGTH_IS_INVALID = "Currency must be a length of 3 characters.",
  CURRENCY_STRING_IS_INVALID = "Currency must be either 'CHF' or 'EUR'",
  CURRENCY_TYPE_IS_INVALID = "Currency must be a string.",
  DEBTOR_ADDRESS_IS_UNDEFINED = "Debtor address cannot be undefined.",
  DEBTOR_ADDRESS_LENGTH_IS_INVALID = "Debtor address must be a maximum of 70 characters.",
  DEBTOR_ADDRESS_TYPE_IS_INVALID = "Debtor address TYPE must be a string.",
  DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID = "Debtor buildingNumber must be a maximum of 16 characters.",
  DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID = "Debtor buildingNumber must be either a string or a number.",
  DEBTOR_CITY_IS_UNDEFINED = "Debtor city cannot be undefined.",
  DEBTOR_CITY_LENGTH_IS_INVALID = "Debtor city must be a maximum of 35 characters.",
  DEBTOR_CITY_TYPE_IS_INVALID = "Debtor city must be a string.",
  DEBTOR_COUNTRY_IS_UNDEFINED = "Debtor country cannot be undefined.",
  DEBTOR_COUNTRY_LENGTH_IS_INVALID = "Debtor country must be 2 characters.",
  DEBTOR_COUNTRY_TYPE_IS_INVALID = "Debtor country must be a string.",
  DEBTOR_IS_UNDEFINED = "Debtor cannot be undefined.",
  DEBTOR_NAME_IS_UNDEFINED = "Debtor name cannot be undefined.",
  DEBTOR_NAME_LENGTH_IS_INVALID = "Debtor name must be a maximum of 70 characters.",
  DEBTOR_NAME_TYPE_IS_INVALID = "Debtor name must be a string.",
  DEBTOR_ZIP_IS_UNDEFINED = "Debtor zip cannot be undefined.",
  DEBTOR_ZIP_LENGTH_IS_INVALID = "Debtor zip must be a maximum of 16 characters.",
  DEBTOR_ZIP_TYPE_IS_INVALID = "Debtor zip must be either a string or a number.",
  MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID = "Message and additionalInformation combined must be a maximum of 140 characters.",
  MESSAGE_LENGTH_IS_INVALID = "Message must be a maximum of 140 characters.",
  MESSAGE_TYPE_IS_INVALID = "Message must be a string.",
  QR_REFERENCE_IS_INVALID = "The provided QR-Reference '{reference}' is not valid.",
  QR_REFERENCE_LENGTH_IS_INVALID = "QR-Reference must be a must be exactly 27 characters.",
  REFERENCE_TYPE_IS_INVALID = "Reference must be a string.",
  REGULAR_REFERENCE_LENGTH_IS_INVALID = "Creditor reference must be a maximum of 25 characters."
}
