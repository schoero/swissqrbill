export function isQRIBAN(iban: string): boolean {
  iban = iban.replace(/ /g, "");
  const QRIID = iban.substr(4, 5);
  return (+QRIID >= 30000 && +QRIID <= 31999);
}


export function isIBANValid(iban: string): boolean {

  iban = iban.replace(/ /g, "");
  iban = iban.toUpperCase();


  //-- Move country code + checksum to end

  iban = iban.substr(4) + iban.substr(0, 4);


  //-- Convert letters to numbers, beginning with A = 10...Z = 35

  const A = "A".charCodeAt(0);

  const ibanArr = iban.split("");

  for(let i = 0; i < ibanArr.length; i++){

    const charCode = ibanArr[i].charCodeAt(0);

    if(charCode >= A){
      ibanArr[i] = charCode - A + 10 + "";
    }

  }


  //-- Calculate mod9710

  return mod9710(ibanArr.join("")) === 1;

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


export function calculateQRReferenceChecksum(reference: string): string {
  return mod10(reference);
}


export function formatQRReference(reference: string): string {

  reference = reference.replace(/ /g, "");

  let referenceArray: RegExpMatchArray = [];

  const match = reference.substring(2).match(/.{1,5}/g);
  if(match !== null){
    referenceArray = [reference.substring(0, 2)].concat(match);
  }

  return referenceArray.join(" ");

}


export function formatSCORReference(reference: string): string {

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

  let formattedAmountWithoutDecimals = "";

  for(let x = amountArray[0].length - 1, i = 1; x >= 0; x--, i++){
    formattedAmountWithoutDecimals = amountArray[0][x] + formattedAmountWithoutDecimals;
    if(i === 3){
      formattedAmountWithoutDecimals = " " + formattedAmountWithoutDecimals;
      i = 0;
    }
  }

  return formattedAmountWithoutDecimals + "." + amountArray[1];

}


export function mmToPoints(mm: number): number {
  return Math.round(mm * 2.83465);
}


function mod9710(iban: string) {

  let remainder = iban;
  let block: string;

  while(remainder.length > 2){
    block = remainder.slice(0, 9);
    remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
  }

  return parseInt(remainder, 10) % 97;

}


function mod10(code: string): string {

  code = code.replace(/ /g, "");

  const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
  let carry = 0;

  for(let i = 0; i < code.length; i++){
    carry = table[(carry + parseInt(code.substr(i, 1), 10)) % 10];
  }

  return ((10 - carry) % 10).toString();

}