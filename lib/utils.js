"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmToPoints = exports.formatAmount = exports.formatSCORReference = exports.formatQRReference = exports.calculateQRReferenceChecksum = exports.isQRReferenceValid = exports.isQRReference = exports.formatIBAN = exports.isIBANValid = exports.isQRIBAN = void 0;
const iban_1 = __importDefault(require("iban"));
function isQRIBAN(iban) {
    iban = iban.replace(/ /g, "");
    const QRIID = iban.substr(4, 5);
    return (+QRIID >= 30000 && +QRIID <= 31999);
}
exports.isQRIBAN = isQRIBAN;
function isIBANValid(iban) {
    return iban_1.default.isValid(iban);
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
function calculateQRReferenceChecksum(code) {
    code = code.replace(/ /g, "");
    const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
    let carry = 0;
    for (let i = 0; i < code.length; i++) {
        carry = table[(carry + parseInt(code.substr(i, 1), 10)) % 10];
    }
    return ((10 - carry) % 10).toString();
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
    let formatedAmountWithoutDecimals = "";
    for (let x = amountArray[0].length - 1, i = 1; x >= 0; x--, i++) {
        formatedAmountWithoutDecimals = amountArray[0][x] + formatedAmountWithoutDecimals;
        if (i === 3) {
            formatedAmountWithoutDecimals = " " + formatedAmountWithoutDecimals;
            i = 0;
        }
    }
    return formatedAmountWithoutDecimals + "." + amountArray[1];
}
exports.formatAmount = formatAmount;
function mmToPoints(mm) {
    return Math.round(mm * 2.83465);
}
exports.mmToPoints = mmToPoints;
//# sourceMappingURL=utils.js.map