/**
 * Checks whether the given iban is a QR-IBAN or not.
 *
 * @param iban - The IBAN to be checked.
 * @returns `true` if the given IBAN is a QR-IBAN and `false` otherwise.
 */
export function isQRIBAN(iban: string): boolean {
  iban = iban.replace(/ /g, "");
  const QRIID = iban.substring(4, 9);
  return +QRIID >= 30000 && +QRIID <= 31999;
}


/**
 * Validates the given IBAN.
 *
 * @param iban - The IBAN to be checked.
 * @returns `true` if the checksum of the given IBAN is valid and `false` otherwise.
 */
export function isIBANValid(iban: string): boolean {

  iban = iban
    .replace(/ /g, "")
    .toUpperCase();


  //-- Move country code + checksum to end

  iban = iban.substring(4) + iban.substring(0, 4);


  //-- Convert letters to numbers, beginning with A = 10...Z = 35

  const A = "A".charCodeAt(0);

  const ibanArr = iban.split("");

  for(let i = 0; i < ibanArr.length; i++){

    const charCode = ibanArr[i].charCodeAt(0);

    if(charCode >= A){
      ibanArr[i] = `${charCode - A + 10}`;
    }

  }


  //-- Calculate mod9710

  return mod9710(ibanArr.join("")) === 1;

}


/**
 * Formats the given IBAN according the specifications to be easily readable.
 *
 * @param iban - The IBAN to be formatted.
 * @returns The formatted IBAN.
 */
export function formatIBAN(iban: string): string {
  const ibanArray = iban
    .replace(/ /g, "")
    .match(/.{1,4}/g);
  return ibanArray?.join(" ") ?? iban;
}


/**
 * Checks whether the given reference is a QR-Reference or not.
 *
 * @param reference - The Reference to be checked.
 * @returns `true` if the given reference is a QR-Reference and `false` otherwise.
 */
export function isQRReference(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(reference.length === 27){
    if(!isNaN(+reference)){
      return true;
    }
  } else if(reference.length <= 25){
    return false;
  }

  throw new Error("Reference is not valid.");

}


/**
 * Validates the given reference.
 *
 * @param reference - The reference to be checked.
 * @returns `true` if the given reference is valid and `false` otherwise.
 */
export function isQRReferenceValid(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(Number.isNaN(reference)){
    return false;
  }

  if(reference.length !== 27){
    return false;
  }

  const ref = reference.substring(0, 26);
  const checksum = reference.substring(26, 27);

  const calculatedChecksum = calculateQRReferenceChecksum(ref);

  return calculatedChecksum === checksum;

}


/**
 * Calculates the checksum according the specifications.
 *
 * @param reference - The 26 digits long reference (without the checksum) whose checksum should be calculated.
 * @returns The calculated checksum.
 */
export function calculateQRReferenceChecksum(reference: string): string {
  return mod10(reference);
}


/**
 * Formats the given QR-Reference according the specifications to be easily readable.
 *
 * @param reference - The QR-Reference to be formatted.
 * @returns The formatted QR-Reference.
 */
export function formatQRReference(reference: string): string {

  const trimmedReference = reference.replace(/ /g, "");

  const match = trimmedReference
    .substring(2)
    .match(/.{1,5}/g);

  return match
    ? `${trimmedReference.substring(0, 2)} ${match.join(" ")}`
    : reference;

}


/**
 * Formats the given SCOR-Reference according the specifications to be easily readable.
 *
 * @param reference - The SCOR-Reference to be formatted.
 * @returns The formatted SCOR-Reference.
 */
export function formatSCORReference(reference: string): string {

  const trimmedReference = reference.replace(/ /g, "");
  const match = trimmedReference.match(/.{1,4}/g);

  return match?.join(" ") ?? reference;

}


/**
 * Detects the type of the given reference and formats it according the specifications to be easily readable.
 *
 * @param reference - The reference to be formatted.
 * @returns The formatted reference.
 */
export function formatReference(reference: string): string {

  const referenceType = getReferenceType(reference);

  if(referenceType === "QRR"){
    return formatQRReference(reference);
  } else if(referenceType === "SCOR"){
    return formatSCORReference(reference);
  }

  return reference;

}


/**
 * Formats the given amount according the specifications to be easily readable.
 *
 * @param amount - containing the amount to be formatted.
 * @returns The formatted amount.
 */
export function formatAmount(amount: number): string {

  const amountString = amount.toFixed(2);
  const amountArray = amountString.split(".");

  let formattedAmountWithoutDecimals = "";

  for(let x = amountArray[0].length - 1, i = 1; x >= 0; x--, i++){
    formattedAmountWithoutDecimals = amountArray[0][x] + formattedAmountWithoutDecimals;
    if(i === 3){
      formattedAmountWithoutDecimals = ` ${formattedAmountWithoutDecimals}`;
      i = 0;
    }
  }

  return `${formattedAmountWithoutDecimals.trim()}.${amountArray[1]}`;

}


/**
 * Converts millimeters to points.
 *
 * @param millimeters - The millimeters you want to convert to points.
 * @returns The converted millimeters in points.
 */
export function mm2pt(millimeters: number): number {
  return millimeters * 2.83465;
}


/**
 * Converts points to millimeters.
 *
 * @param points - The points you want to convert to millimeters.
 * @returns The converted points in millimeters.
 */
export function pt2mm(points: number): number {
  return points / 2.83465;
}


/**
 * Converts millimeters to pixels.
 *
 * @param millimeters - The millimeters you want to convert to pixels.
 * @returns The converted millimeters in pixels.
 */
export function mm2px(millimeters: number): number {
  return millimeters * 960 / 254;
}


/**
 * Converts pixels to millimeters.
 *
 * @param pixels - containing the pixels you want to convert to millimeters.
 * @returns The converted pixels in millimeters.
 */
export function px2mm(pixels: number): number {
  return pixels * 254 / 960;
}


export function getReferenceType(reference: string | undefined): "NON" | "QRR" | "SCOR" {
  if(typeof reference === "undefined"){
    return "NON";
  } else if(isQRReference(reference)){
    return "QRR";
  } else {
    return "SCOR";
  }
}


function mod9710(iban: string) {

  let remainder = iban;
  let block: string;

  while(remainder.length > 2){
    block = remainder.slice(0, 9);
    remainder = `${parseInt(block, 10) % 97}${remainder.slice(block.length)}`;
  }

  return parseInt(remainder, 10) % 97;

}


function mod10(code: string): string {

  const trimmedCode = code.replace(/ /g, "");

  const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
  let carry = 0;

  for(let i = 0; i < trimmedCode.length; i++){
    carry = table[(carry + parseInt(trimmedCode.substring(i, i + 1), 10)) % 10];
  }

  return ((10 - carry) % 10).toString();

}
