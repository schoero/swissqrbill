import { creditorWithQRIBAN, minimalRequired, minimalRequiredWithDebtor } from "swissqrbill:tests:data/valid-data";

import type { Data } from "swissqrbill:types";


// Missing creditor
export const missingCreditor = {
  ...minimalRequired,
  creditor: undefined
} as unknown as Data;

// Missing creditor account
export const missingCreditorAccount = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    account: undefined
  }
} as unknown as Data;

// Invalid creditor account country
export const invalidCreditorAccountCountry = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    account: "HR17 2360 0001 1012 3456 5"
  }
} as unknown as Data;

// Creditor account length too long
export const creditorAccountTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    account: "CH58 0079 1123 0008 8901 27"
  }
} as unknown as Data;

// Creditor account length too short
export const creditorAccountTooShort = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    account: "CH58 0079 1123 0008 8901"
  }
} as unknown as Data;

// Invalid creditor account
export const invalidCreditorAccount = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    account: "CH58 0079 1123 0008 8902 2"
  }
} as unknown as Data;

// QR-IBAN with missing reference
export const qrIbanMissingReference = {
  ...creditorWithQRIBAN,
  reference: undefined
} as unknown as Data;

// QR-IBAN with invalid QR-Reference
export const qrIbanInvalidQRReference = {
  ...creditorWithQRIBAN,
  reference: "21 00000 00003 13947 14300 09018"
} as unknown as Data;

// QR-IBAN with QR-Reference too short
export const qrIbanQRReferenceTooShort = {
  ...creditorWithQRIBAN,
  reference: "21 00000 00003 13947 14300 0901"
} as unknown as Data;

// QR-IBAN with QR-Reference too long
export const qrIbanQRReferenceTooLong = {
  ...creditorWithQRIBAN,
  reference: "21 00000 00003 13947 14300 09017 12345"
} as unknown as Data;

// QR-IBAN with regular reference
export const qrIbanRegularReference = {
  ...creditorWithQRIBAN,
  reference: "RF48 5000 0567 8901 2345 1234 567"
} as unknown as Data;

// Regular IBAN with QR-Reference
export const regularIBANAndQRReference = {
  ...minimalRequired,
  reference: "21 00000 00003 13947 14300 09018"
} as unknown as Data;

// Regular IBAN with reference too long
export const regularIBANAndReferenceTooLong = {
  ...minimalRequired,
  reference: "RF48 5000 0567 8901 2345 1234 5678"
} as unknown as Data;

// Creditor with missing name
export const creditorMissingName = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    name: undefined
  }
} as unknown as Data;

// Creditor with number as name
export const creditorInvalidNameType = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    name: 123
  }
} as unknown as Data;

// Creditor name length too long
export const creditorNameTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
  }
} as unknown as Data;

// Creditor with missing address
export const creditorMissingAddress = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    address: undefined
  }
} as unknown as Data;

// Creditor address with invalid type
export const creditorInvalidAddressType = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    address: 123
  }
} as unknown as Data;

// Creditor address length too long
export const creditorAddressTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
  }
} as unknown as Data;

// Creditor with invalid building number type
export const creditorInvalidBuildingNumberType = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    buildingNumber: true
  }
} as unknown as Data;

// Creditor with building number too long
export const creditorBuildingNumberTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    buildingNumber: "0123456789ABCDEFG"
  }
} as unknown as Data;

// Creditor with missing zip
export const creditorMissingZip = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    zip: undefined
  }
} as unknown as Data;

// Creditor with invalid zip type
export const creditorInvalidZipType = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    zip: true
  }
} as unknown as Data;

// Creditor with zip too long
export const creditorZipTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    zip: "0123456789ABCDEFG"
  }
} as unknown as Data;

// Creditor with missing city
export const creditorMissingCity = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    city: undefined
  }
} as unknown as Data;

// Creditor with invalid city type
export const creditorInvalidCityType = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    city: true
  }
} as unknown as Data;

// Creditor with city too long
export const creditorCityTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    city: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
  }
} as unknown as Data;

// Creditor with missing country
export const creditorMissingCountry = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    country: undefined
  }
} as unknown as Data;

// Creditor with invalid country type
export const creditorInvalidCountryType = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    country: true
  }
} as unknown as Data;

// Creditor with country too short
export const creditorCountryTooShort = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    country: "C"
  }
} as unknown as Data;

// Creditor with country too long
export const creditorCountryTooLong = {
  ...minimalRequired,
  creditor: {
    ...minimalRequired.creditor,
    country: "CHE"
  }
} as unknown as Data;

// Amount type is invalid
export const amountInvalidType = {
  ...minimalRequired,
  amount: true
} as unknown as Data;

// Amount too long
export const amountTooLong = {
  ...minimalRequired,
  amount: 1234567890123
} as unknown as Data;

// Missing currency
export const missingCurrency = {
  ...minimalRequired,
  currency: undefined
} as unknown as Data;

// Invalid currency type
export const invalidCurrencyType = {
  ...minimalRequired,
  currency: true
} as unknown as Data;

// Currency too short
export const currencyTooShort = {
  ...minimalRequired,
  currency: "CH"
} as unknown as Data;

// Currency too long
export const currencyTooLong = {
  ...minimalRequired,
  currency: "CHFF"
} as unknown as Data;

// Invalid currency
export const invalidCurrency = {
  ...minimalRequired,
  currency: "USD"
} as unknown as Data;

// Debtor with missing name
export const debtorMissingName = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    name: undefined
  }
} as unknown as Data;

// Debtor with number as name
export const debtorInvalidNameType = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    name: 123
  }
} as unknown as Data;

// Debtor name length too long
export const debtorNameTooLong = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
  }
} as unknown as Data;

// Debtor with missing address
export const debtorMissingAddress = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    address: undefined
  }
} as unknown as Data;

// Debtor address with invalid type
export const debtorInvalidAddressType = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    address: 123
  }
} as unknown as Data;

// Debtor address length too long
export const debtorAddressTooLong = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
  }
} as unknown as Data;

// Debtor with invalid building number type
export const debtorInvalidBuildingNumberType = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    buildingNumber: true
  }
} as unknown as Data;

// Debtor with building number too long
export const debtorBuildingNumberTooLong = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    buildingNumber: "0123456789ABCDEFG"
  }
} as unknown as Data;

// Debtor with missing zip
export const debtorMissingZip = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    zip: undefined
  }
} as unknown as Data;

// Debtor with invalid zip type
export const debtorInvalidZipType = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    zip: true
  }
} as unknown as Data;

// Debtor with zip too long
export const debtorZipTooLong = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    zip: "0123456789ABCDEFG"
  }
} as unknown as Data;

// Debtor with missing city
export const debtorMissingCity = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    city: undefined
  }
} as unknown as Data;

// Debtor with invalid city type
export const debtorInvalidCityType = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    city: true
  }
} as unknown as Data;

// Debtor with city too long
export const debtorCityTooLong = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    city: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
  }
} as unknown as Data;

// Debtor with missing country
export const debtorMissingCountry = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    country: undefined
  }
} as unknown as Data;

// Debtor with invalid country type
export const debtorInvalidCountryType = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    country: true
  }
} as unknown as Data;

// Debtor with country too short
export const debtorCountryTooShort = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    country: "C"
  }
} as unknown as Data;

// Debtor with country too long
export const debtorCountryTooLong = {
  ...minimalRequiredWithDebtor,
  debtor: {
    ...minimalRequiredWithDebtor.debtor,
    country: "CHE"
  }
} as unknown as Data;

// Invalid reference type
export const referenceTypeInvalid = {
  ...minimalRequired,
  reference: true
} as unknown as Data;

// Message type invalid
export const messageInvalidType = {
  ...minimalRequired,
  message: true
} as unknown as Data;

// Message length invalid
export const messageTooLong = {
  ...minimalRequired,
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
} as unknown as Data;

// Additional information type invalid
export const additionalInformationInvalidType = {
  ...minimalRequired,
  additionalInformation: true
} as unknown as Data;

// Additional information length invalid
export const additionalInformationTooLong = {
  ...minimalRequired,
  additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
} as unknown as Data;

// Message + additional information too long
export const messageAndAdditionalInformationTooLong = {
  ...minimalRequired,
  additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod.",
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
} as unknown as Data;

// AV1 type invalid
export const av1InvalidType = {
  ...minimalRequired,
  av1: true
} as unknown as Data;

// AV1 length invalid
export const av1TooLong = {
  ...minimalRequired,
  av1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
} as unknown as Data;

// AV2 type invalid
export const av2InvalidType = {
  ...minimalRequired,
  av2: true
} as unknown as Data;

// AV2 length invalid
export const av2TooLong = {
  ...minimalRequired,
  av2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi euismod."
} as unknown as Data;
