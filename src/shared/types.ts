
export type Currency = "CHF" | "EUR";
export type Size = "A4" | "A6/5";
export type Languages = "DE" | "EN" | "IT" | "FR";

export interface Data {
  currency: Currency,
  creditor: Creditor,
  debtor?: Debtor,
  debitor?: Debtor,
  amount?: number,
  reference?: string,
  message?: string,
  additionalInformation?: string,
  av1?: string,
  av2?: string
}

export interface Debtor {
  name: string,
  address: string,
  zip: string | number,
  city: string,
  country: string
  houseNumber?: string | number
}

export interface Creditor extends Debtor {
  account: string,
}

export interface PDFOptions {
  language?: Languages,
  size?: Size,
  scissors?: boolean,
  separate?: boolean,
  outlines?: boolean
  autoGenerate?: boolean,
}