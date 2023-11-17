import { fillUntil } from "swissqrbill:tests:utils/fill.js";

import type { Creditor, Data, Debtor } from "swissqrbill:types";

// Default data
const creditor: Creditor = {
  account: "CH58 0079 1123 0008 8901 2",
  address: "Creditor Address",
  city: "Creditor City",
  country: "CH",
  name: "Creditor FirstName LastName",
  zip: 1234
};

const debtor: Debtor = {
  address: "Debtor Address",
  city: "Debtor City",
  country: "CH",
  name: "Debtor FirstName LastName",
  zip: 5678
};

// Minimal required
export const minimalRequired: Data = {
  creditor,
  currency: "CHF"
};

// Amount
export const minimalRequiredWithAmount: Data = {
  ...minimalRequired,
  amount: 123.45
};

// Creditor
export const creditorWithBuildingNumber: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    buildingNumber: 123
  }
};

export const creditorWithBuildingNumberString: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    buildingNumber: "A123"
  }
};

export const creditorWithZipString: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    zip: "A1234"
  }
};

export const creditorWithQRIBAN: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    account: "CH44 3199 9123 0008 8901 2"
  },
  reference: "21 00000 00003 13947 14300 09017"
};

export const creditorWithNormalIBAN: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    account: "CH58 0079 1123 0008 8901 2"
  }
};

export const creditorWithNormalIBANAndReference: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    account: "CH58 0079 1123 0008 8901 2"
  },
  reference: "RF48 5000 0567 8901 2345"
};

export const creditorWithMaxedOutFieldLengths: Data = {
  ...minimalRequired,
  creditor: {
    ...creditor,
    address: fillUntil(creditor.address, 70),
    city: fillUntil(creditor.city, 35),
    name: fillUntil(creditor.name, 70),
    zip: fillUntil(`${creditor.zip}`, 16)
  }
};

// Debtor
export const minimalRequiredWithDebtor: Data = {
  ...minimalRequired,
  debtor
};

export const debtorWithBuildingNumber: Data = {
  ...minimalRequired,
  debtor: {
    ...debtor,
    buildingNumber: 123
  }
};

export const debtorWithBuildingNumberString: Data = {
  ...minimalRequired,
  debtor: {
    ...debtor,
    buildingNumber: "A123"
  }
};

export const debtorWithZipString: Data = {
  ...minimalRequired,
  debtor: {
    ...debtor,
    zip: "A1234"
  }
};

export const debtorWithMaxedOutFieldLengths: Data = {
  ...minimalRequired,
  debtor: {
    ...debtor,
    address: fillUntil(debtor.address, 70),
    city: fillUntil(debtor.city, 35),
    name: fillUntil(debtor.name, 70),
    zip: fillUntil(`${debtor.zip}`, 16)
  }
};

// Message
export const minimalRequiredWithMessage: Data = {
  ...minimalRequired,
  message: "DO NOT USE FOR PAYMENT"
};

export const minimalRequiredWithMaxedOutMessage: Data = {
  ...minimalRequired,
  message: fillUntil("Message", 140)
};

// Currency
export const minimalRequiredWithEuro: Data = {
  ...minimalRequired,
  currency: "EUR"
};

// Additional Information
export const minimalRequiredWithAdditionalInformation: Data = {
  ...minimalRequired,
  additionalInformation: "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30",
  amount: 0.00
};

// Alternative Scheme
export const minimalRequiredWithAlternativeScheme1: Data = {
  ...minimalRequired,
  av1: "eBill/B/peter@muster.ch"
};

export const minimalRequiredWithAlternativeScheme2: Data = {
  ...minimalRequired,
  av2: "eBill/B/peter@muster.ch"
};

export const minimalRequiredWithAlternativeScheme1and2: Data = {
  ...minimalRequired,
  av1: "twint/light/02:5d5caa0c078149c694380b72d273ba7#9837183ed9f8bab7286856d786edf5721d55f82b#",
  av2: "rn/twint/a~UuoWrVwETE-AZMysjqoCtQ~s~kNAfGk8vSou0wsvzHvTiSw/rn" // cspell:disable-line
};
