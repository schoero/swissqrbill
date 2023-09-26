function isQRIBAN(iban) {
  iban = iban.replace(/ /g, "");
  const QRIID = iban.substring(4, 9);
  return +QRIID >= 3e4 && +QRIID <= 31999;
}
function isIBANValid(iban) {
  iban = iban.replace(/ /g, "").toUpperCase();
  iban = iban.substring(4) + iban.substring(0, 4);
  return mod97(iban) === 1;
}
function formatIBAN(iban) {
  var _a;
  const ibanArray = iban.replace(/ /g, "").match(/.{1,4}/g);
  return (_a = ibanArray == null ? void 0 : ibanArray.join(" ")) != null ? _a : iban;
}
function isQRReference(reference) {
  reference = reference.replace(/ /g, "");
  if (reference.length !== 27) {
    return false;
  }
  if (!/^\d+$/.test(reference)) {
    return false;
  }
  return true;
}
function isQRReferenceValid(reference) {
  reference = reference.replace(/ /g, "");
  if (!isQRReference(reference)) {
    return false;
  }
  const ref = reference.substring(0, 26);
  const checksum = reference.substring(26, 27);
  const calculatedChecksum = calculateQRReferenceChecksum(ref);
  return calculatedChecksum === checksum;
}
function isSCORReference(reference) {
  reference = reference.replace(/ /g, "").toUpperCase();
  if (!reference.startsWith("RF")) {
    return false;
  }
  if (reference.length < 5 || reference.length > 25) {
    return false;
  }
  if (!/^[\dA-Z]+$/.test(reference)) {
    return false;
  }
  return true;
}
function isSCORReferenceValid(reference) {
  reference = reference.replace(/ /g, "");
  if (!isSCORReference(reference)) {
    return false;
  }
  const ref = reference.substring(4);
  if (Number.isNaN(reference)) {
    return false;
  }
  const checksum = reference.substring(2, 4);
  if (Number.isNaN(checksum)) {
    return false;
  }
  const calculatedChecksum = calculateSCORReferenceChecksum(ref);
  return calculatedChecksum === checksum;
}
function calculateSCORReferenceChecksum(reference) {
  reference = reference.replace(/ /g, "");
  const checksum = 98 - mod97(`${reference}RF00`);
  return `${checksum}`.padStart(2, "0");
}
function calculateQRReferenceChecksum(reference) {
  return mod10(reference);
}
function formatQRReference(reference) {
  const trimmedReference = reference.replace(/ /g, "");
  const match = trimmedReference.substring(2).match(/.{1,5}/g);
  return match ? `${trimmedReference.substring(0, 2)} ${match.join(" ")}` : reference;
}
function formatSCORReference(reference) {
  var _a;
  const trimmedReference = reference.replace(/ /g, "");
  const match = trimmedReference.match(/.{1,4}/g);
  return (_a = match == null ? void 0 : match.join(" ")) != null ? _a : reference;
}
function formatReference(reference) {
  const referenceType = getReferenceType(reference);
  if (referenceType === "QRR") {
    return formatQRReference(reference);
  } else if (referenceType === "SCOR") {
    return formatSCORReference(reference);
  }
  return reference;
}
function formatAmount(amount) {
  const amountString = amount.toFixed(2);
  const amountArray = amountString.split(".");
  let formattedAmountWithoutDecimals = "";
  for (let x = amountArray[0].length - 1, i = 1; x >= 0; x--, i++) {
    formattedAmountWithoutDecimals = amountArray[0][x] + formattedAmountWithoutDecimals;
    if (i === 3) {
      formattedAmountWithoutDecimals = ` ${formattedAmountWithoutDecimals}`;
      i = 0;
    }
  }
  return `${formattedAmountWithoutDecimals.trim()}.${amountArray[1]}`;
}
function mm2pt(millimeters) {
  return millimeters * 2.83465;
}
function pt2mm(points) {
  return points / 2.83465;
}
function mm2px(millimeters) {
  return millimeters * 960 / 254;
}
function px2mm(pixels) {
  return pixels * 254 / 960;
}
function getReferenceType(reference) {
  if (typeof reference === "undefined") {
    return "NON";
  } else if (isQRReference(reference)) {
    return "QRR";
  } else {
    return "SCOR";
  }
}
function mod97(input) {
  const charCodeOfLetterA = "A".charCodeAt(0);
  const inputArr = input.split("");
  for (let i = 0; i < inputArr.length; i++) {
    const charCode = inputArr[i].charCodeAt(0);
    if (charCode >= charCodeOfLetterA) {
      inputArr[i] = `${charCode - charCodeOfLetterA + 10}`;
    }
  }
  input = inputArr.join("");
  let remainder = 0;
  for (let i = 0; i < input.length; i++) {
    const digit = +input[i];
    remainder = (10 * remainder + digit) % 97;
  }
  return remainder;
}
function mod10(input) {
  const trimmedInput = input.replace(/ /g, "");
  const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
  let carry = 0;
  for (let i = 0; i < trimmedInput.length; i++) {
    carry = table[(carry + parseInt(trimmedInput.substring(i, i + 1), 10)) % 10];
  }
  return ((10 - carry) % 10).toString();
}
export {
  calculateQRReferenceChecksum,
  calculateSCORReferenceChecksum,
  formatAmount,
  formatIBAN,
  formatQRReference,
  formatReference,
  formatSCORReference,
  getReferenceType,
  isIBANValid,
  isQRIBAN,
  isQRReference,
  isQRReferenceValid,
  isSCORReference,
  isSCORReferenceValid,
  mm2pt,
  mm2px,
  pt2mm,
  px2mm
};
