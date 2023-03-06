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


  //-- Calculate mod97

  return mod97(iban) === 1;

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
 * @remarks The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.
 * @param reference - The Reference to be checked.
 * @returns `true` if the given reference is a QR-Reference and `false` otherwise.
 */
export function isQRReference(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(reference.length !== 27){
    return false;
  }

  if(!/^\d+$/.test(reference)){
    return false;
  }

  return true;

}


/**
 * Validates the given QR-Reference.
 *
 * @param reference - The reference to be checked.
 * @returns `true` if the given reference is valid and `false` otherwise.
 */
export function isQRReferenceValid(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(!isQRReference(reference)){
    return false;
  }

  const ref = reference.substring(0, 26);
  const checksum = reference.substring(26, 27);

  const calculatedChecksum = calculateQRReferenceChecksum(ref);

  return calculatedChecksum === checksum;

}


/**
 * Checks whether the given reference is a SCOR-Reference or not.
 *
 * @remarks The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.
 * @param reference - The Reference to be checked.
 * @returns `true` if the given reference is a SCOR-Reference and `false` otherwise.
 */
export function isSCORReference(reference: string): boolean {

  reference = reference.replace(/ /g, "").toUpperCase();

  if(!reference.startsWith("RF")){
    return false;
  }

  if(reference.length < 5 || reference.length > 25){
    return false;
  }

  if(!/^[\dA-Z]+$/.test(reference)){
    return false;
  }

  return true;

}


/**
 * Validates the given SCOR-Reference.
 *
 * @param reference - The reference to be checked.
 * @returns `true` if the given reference is valid and `false` otherwise.
 */
export function isSCORReferenceValid(reference: string): boolean {

  reference = reference.replace(/ /g, "");

  if(!isSCORReference(reference)){
    return false;
  }

  const ref = reference.substring(4);
  if(Number.isNaN(reference)){
    return false;
  }

  const checksum = reference.substring(2, 4);
  if(Number.isNaN(checksum)){
    return false;
  }

  const calculatedChecksum = calculateSCORReferenceChecksum(ref);

  return calculatedChecksum === checksum;

}


/**
 * Calculates the checksum according to the ISO 11649 standard.
 *
 * @param reference - The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.
 * @returns The calculated checksum as 2 digit string.
 */
export function calculateSCORReferenceChecksum(reference: string): string {
  reference = reference.replace(/ /g, "");
  const checksum = 98 - mod97(`${reference}RF00`);
  return `${checksum}`.padStart(2, "0");
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


/**
 * Detects the type of the given reference.
 * @param reference - The reference to get the type of.
 * @returns The type of the given reference.
 */
export function getReferenceType(reference: string | undefined): "NON" | "QRR" | "SCOR" {
  if(typeof reference === "undefined"){
    return "NON";
  } else if(isQRReference(reference)){
    return "QRR";
  } else {
    return "SCOR";
  }
}

/**
 * Calculates the checksum according to the ISO 7064 standard.
 * @param input - The input whose checksum should be calculated.
 * @returns The calculated checksum.
 */
function mod97(input: string): number {


  //-- Convert letters to numbers (A = 10, B = 11, ..., Z = 35)

  const charCodeOfLetterA = "A".charCodeAt(0);

  const inputArr = input.split("");

  for(let i = 0; i < inputArr.length; i++){
    const charCode = inputArr[i].charCodeAt(0);
    if(charCode >= charCodeOfLetterA){
      inputArr[i] = `${charCode - charCodeOfLetterA + 10}`;
    }
  }

  input = inputArr.join("");


  //-- Apply the mod97 algorithm

  let remainder = 0;
  for(let i = 0; i < input.length; i++){
    const digit = +input[i];
    remainder = (10 * remainder + digit) % 97;
  }

  return remainder;

}


/**
 * Calculates the checksum according to the ISO 7812-1 standard.
 * @param input - The input whose checksum should be calculated.
 * @returns The calculated checksum.
 */
function mod10(input: string): string {

  const trimmedInput = input.replace(/ /g, "");

  const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
  let carry = 0;

  for(let i = 0; i < trimmedInput.length; i++){
    carry = table[(carry + parseInt(trimmedInput.substring(i, i + 1), 10)) % 10];
  }

  return ((10 - carry) % 10).toString();

}
