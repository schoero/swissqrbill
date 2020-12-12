import IBAN from "iban";


export function isQRIBAN(iban: string): boolean {
  iban = iban.replace(/ /g, "");
  const QRIID = iban.substr(4, 5);
  return (+QRIID >= 30000 && +QRIID <= 31999);
}


export function isIBANValid(iban: string): boolean {
  return IBAN.isValid(iban);
}


export function formatIBAN(iban: string): string {
  iban = iban.replace(/ /g, "");
  const ibanArray = iban.replace(/ /g, "").match(/.{1,4}/g);
  return ibanArray?.join(" ") ?? iban;
}


export function isQRReference(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(reference.length === 27){
    if(!isNaN(+reference)){
      return true;
    }
  }

  if(reference.replace(/ /g, "").length <= 25){
    return false;
  }

  throw new Error("Reference is not valid.");

}


export function isQRReferenceValid(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(Number.isNaN(reference)){
    return false;
  }

  if(reference.length !== 27){
    return false;
  }

  const ref = reference.substr(0, 26);
  const checksum = reference.substr(26, 1);

  const calculatedChecksum = calculateQRReferenceChecksum(ref);

  return calculatedChecksum === checksum;

}


export function calculateQRReferenceChecksum(code: string): string {

  code = code.replace(/ /g, "");

  const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
  let carry = 0;

  for(let i = 0; i < code.length; i++){
    carry = table[(carry + parseInt(code.substr(i, 1), 10)) % 10];
  }

  return ((10 - carry) % 10).toString();

}


export function formatQRReference(reference: string): string{

  reference = reference.replace(/ /g, "");

  let referenceArray: RegExpMatchArray = [];

  const match = reference.substring(2).match(/.{1,5}/g);
  if(match !== null){
    referenceArray = [reference.substring(0, 2)].concat(match);
  }

  return referenceArray.join(" ");

}


export function formatSCORReference(reference: string): string{

  reference = reference.replace(/ /g, "");

  let referenceArray: RegExpMatchArray = [];

  const match = reference.match(/.{1,4}/g);
  if(match !== null){
    referenceArray = match;
  }

  return referenceArray.join(" ");

}


export function formatAmount(amount: number): string {

  const amountString = amount.toFixed(2) + "";
  const amountArray = amountString.split(".");

  let formatedAmountWithoutDecimals = "";

  for(let x = amountArray[0].length -1, i= 1; x >= 0; x--, i++){
    formatedAmountWithoutDecimals = amountArray[0][x] + formatedAmountWithoutDecimals;
    if(i === 3){
      formatedAmountWithoutDecimals = " " + formatedAmountWithoutDecimals;
      i = 0;
    }
  }

  return formatedAmountWithoutDecimals + "." + amountArray[1];

}


export function mmToPoints(mm: number): number {
  return Math.round(mm * 2.83465);
}