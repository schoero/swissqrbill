

/**
 * Checks whether the given iban is a QR-IBAN or not.
 *
 * @param {string} iban `string` containing the iban to be checked.
 * @returns {boolean} `boolean` `true` if the given iban is a QR-IBAN and `false` otherwise.
 */
export function isQRIBAN(iban: string): boolean {
  iban = iban.replace(/ /g, "");
  const QRIID = iban.substr(4, 5);
  return (+QRIID >= 30000 && +QRIID <= 31999);
}


/**
 * Validates the given iban.
 *
 * @param {string} iban `string` containing the iban to be checked.
 * @returns {boolean} `boolean` `true` if the checksum of the given iban is valid and `false` otherwise.
 */
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


/**
 * Formats the given iban according the specifications to be easily readable.
 *
 * @param {string} iban `string` containing the iban to be formatted.
 * @returns {string} `string` containing the formatted iban.
 */
export function formatIBAN(iban: string): string {
  iban = iban.replace(/ /g, "");
  const ibanArray = iban.replace(/ /g, "").match(/.{1,4}/g);
  return ibanArray?.join(" ") ?? iban;
}


/**
 * Checks whether the given reference is a QR-Reference or not.
 *
 * @param {string} reference `string` containing the reference to be checked.
 * @returns {boolean} `boolean` `true` if the given iban is a QR-Reference and `false` otherwise.
 */
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


/**
 * Validates the given reference.
 *
 * @param {string} reference `string` containing the reference to be checked.
 * @returns {boolean} `boolean` `true` if the given reference is valid and `false` otherwise.
 */
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


/**
 * Calculates the checksum according the specifications.
 *
 * @param {string} reference `string` containing the 26 digits long reference (without the checksum) whose checksum should be calculated.
 * @returns {string} `string` containing the calculated checksum.
 */
export function calculateQRReferenceChecksum(reference: string): string {
  return mod10(reference);
}


/**
 * Formats the given QR-Reference according the specifications to be easily readable.
 *
 * @param {string} reference `string` containing the QR-Reference to be formatted.
 * @returns {string} `string` containing the formatted QR-Reference.
 */
export function formatQRReference(reference: string): string {

  reference = reference.replace(/ /g, "");

  let referenceArray: RegExpMatchArray = [];

  const match = reference.substring(2).match(/.{1,5}/g);
  if(match !== null){
    referenceArray = [reference.substring(0, 2)].concat(match);
  }

  return referenceArray.join(" ");

}


/**
 * Formats the given SCOR-Reference according the specifications to be easily readable.
 *
 * @param {string} reference `string` containing the SCOR-Reference to be formatted.
 * @returns {string} `string` containing the formatted SCOR-Reference.
 */
export function formatSCORReference(reference: string): string {

  reference = reference.replace(/ /g, "");

  let referenceArray: RegExpMatchArray = [];

  const match = reference.match(/.{1,4}/g);
  if(match !== null){
    referenceArray = match;
  }

  return referenceArray.join(" ");

}


/**
 * Formats the given amount according the specifications to be easily readable.
 *
 * @param {number} amount `number` containing the amount to be formatted.
 * @returns {string} `string` containing the formatted amount.
 */
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


/**
 * Converts milimeters to points.
 *
 * @param {number} millimeters `number` containg the millimeters you want to convert to points.
 * @returns {number} `number` containing the converted millimeters in points.
 */
export function mm2pt(millimeters: number): number {
  return millimeters * 2.83465;
}


/**
 * Converts points to millimeters.
 *
 * @param {number} points `number` containg the points you want to convert to millimeters.
 * @returns {number} `number` containing the converted points in millimeters.
 */
export function pt2mm(points: number): number {
  return points / 2.83465;
}


/**
 * Converts milimeters to pixels.
 *
 * @param {number} millimeters `number` containg the millimeters you want to convert to pixels.
 * @returns {number} `number` containing the converted millimeters in pixels.
 */
export function mm2px(millimeters: number): number {
  return millimeters * 960 / 254;
}


/**
 * Converts pixels to millimeters.
 *
 * @param {number} pixels `number` containg the pixels you want to convert to millimeters.
 * @returns {number} `number` containing the converted pixels in millimeters.
 */
export function px2mm(pixels: number): number {
  return pixels * 254 / 960;
}


export function getReferenceType(reference: string | undefined): "QRR" | "SCOR" | "NON" {
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