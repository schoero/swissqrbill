"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmToPoints = exports.formatAmount = exports.formatSCORReference = exports.formatQRReference = exports.calculateQRReferenceChecksum = exports.isQRReferenceValid = exports.isQRReference = exports.formatIBAN = exports.isIBANValid = exports.isQRIBAN = void 0;
function isQRIBAN(iban) {
    iban = iban.replace(/ /g, "");
    const QRIID = iban.substr(4, 5);
    return (+QRIID >= 30000 && +QRIID <= 31999);
}
exports.isQRIBAN = isQRIBAN;
function isIBANValid(iban) {
    iban = iban.replace(/ /g, "");
    iban = iban.toUpperCase();
    if (iban.length !== 21) {
        return false;
    }
    //-- Move country code + checksum to end
    iban = iban.substr(4) + iban.substr(0, 4);
    //-- Convert letters to numbers, beginning with A = 10...Z = 35
    const A = "A".charCodeAt(0);
    const ibanArr = iban.split("");
    for (let i = 0; i < ibanArr.length; i++) {
        const charCode = ibanArr[i].charCodeAt(0);
        if (charCode >= A) {
            ibanArr[i] = charCode - A + 10 + "";
        }
    }
    //-- Calculate mod9710
    return mod9710(ibanArr.join("")) === 1;
}
exports.isIBANValid = isIBANValid;
function formatIBAN(iban) {
    var _a;
    iban = iban.replace(/ /g, "");
    const ibanArray = iban.replace(/ /g, "").match(/.{1,4}/g);
    return (_a = ibanArray === null || ibanArray === void 0 ? void 0 : ibanArray.join(" ")) !== null && _a !== void 0 ? _a : iban;
}
exports.formatIBAN = formatIBAN;
function isQRReference(reference) {
    reference = reference.replace(/ /g, "");
    if (reference.length === 27) {
        if (!isNaN(+reference)) {
            return true;
        }
    }
    if (reference.replace(/ /g, "").length <= 25) {
        return false;
    }
    throw new Error("Reference is not valid.");
}
exports.isQRReference = isQRReference;
function isQRReferenceValid(reference) {
    reference = reference.replace(/ /g, "");
    if (Number.isNaN(reference)) {
        return false;
    }
    if (reference.length !== 27) {
        return false;
    }
    const ref = reference.substr(0, 26);
    const checksum = reference.substr(26, 1);
    const calculatedChecksum = calculateQRReferenceChecksum(ref);
    return calculatedChecksum === checksum;
}
exports.isQRReferenceValid = isQRReferenceValid;
function calculateQRReferenceChecksum(reference) {
    return mod10(reference);
}
exports.calculateQRReferenceChecksum = calculateQRReferenceChecksum;
function formatQRReference(reference) {
    reference = reference.replace(/ /g, "");
    let referenceArray = [];
    const match = reference.substring(2).match(/.{1,5}/g);
    if (match !== null) {
        referenceArray = [reference.substring(0, 2)].concat(match);
    }
    return referenceArray.join(" ");
}
exports.formatQRReference = formatQRReference;
function formatSCORReference(reference) {
    reference = reference.replace(/ /g, "");
    let referenceArray = [];
    const match = reference.match(/.{1,4}/g);
    if (match !== null) {
        referenceArray = match;
    }
    return referenceArray.join(" ");
}
exports.formatSCORReference = formatSCORReference;
function formatAmount(amount) {
    const amountString = amount.toFixed(2) + "";
    const amountArray = amountString.split(".");
    let formattedAmountWithoutDecimals = "";
    for (let x = amountArray[0].length - 1, i = 1; x >= 0; x--, i++) {
        formattedAmountWithoutDecimals = amountArray[0][x] + formattedAmountWithoutDecimals;
        if (i === 3) {
            formattedAmountWithoutDecimals = " " + formattedAmountWithoutDecimals;
            i = 0;
        }
    }
    return formattedAmountWithoutDecimals + "." + amountArray[1];
}
exports.formatAmount = formatAmount;
function mmToPoints(mm) {
    return Math.round(mm * 2.83465);
}
exports.mmToPoints = mmToPoints;
function mod9710(iban) {
    let remainder = iban;
    let block;
    while (remainder.length > 2) {
        block = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
    }
    return parseInt(remainder, 10) % 97;
}
function mod10(code) {
    code = code.replace(/ /g, "");
    const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
    let carry = 0;
    for (let i = 0; i < code.length; i++) {
        carry = table[(carry + parseInt(code.substr(i, 1), 10)) % 10];
    }
    return ((10 - carry) % 10).toString();
}
//# sourceMappingURL=utils.js.map