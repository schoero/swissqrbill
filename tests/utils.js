const SwissQRBill = require("../");


const invalidIBANChecksum = "CH05 3000 5230 5042 2318 T";
const validIBANChecksum = "CH06 3000 5230 5042 2318 T";
const normalIBAN = "CH80 0078 8000 0506 6413 3";
const qrIBAN = "CH75 3078 8000 0506 6413 4";
const invalidQRReference = "21 00000 00003 13947 14300 09012";
const validQRReference = "21 00000 00003 13947 14300 09017";
const scorReference = "RF48 5000 0567 8901 2345";


//-- Invalid iban checksum

if(SwissQRBill.utils.isIBANValid(invalidIBANChecksum)){
  throw new Error("Error in SwissQRBill.utils.isIBANValid: IBAN " + invalidIBANChecksum + " should be invalid");
}


//-- Valid iban checksum

if(!SwissQRBill.utils.isIBANValid(validIBANChecksum)){
  throw new Error("Error in SwissQRBill.utils.isIBANValid: IBAN " + validIBANChecksum + " should be valid");
}


//-- normal iban

if(SwissQRBill.utils.isQRIBAN(normalIBAN)){
  throw new Error("Error in SwissQRBill.utils.isQRIBAN: IBAN " + normalIBAN + " should be a normal iban");
}


//-- qr iban

if(!SwissQRBill.utils.isQRIBAN(qrIBAN)){
  throw new Error("Error in SwissQRBill.utils.isQRIBAN: IBAN " + qrIBAN + " should be a qr-iban");
}


//-- invalid qr reference

if(SwissQRBill.utils.isQRReference(scorReference)){
  throw new Error("Error in SwissQRBill.utils.isQRReference: IBAN " + scorReference + " should be a invalid");
}


//-- qr iban

if(!SwissQRBill.utils.isQRReference(validQRReference)){
  throw new Error("Error in SwissQRBill.utils.isQRReference: IBAN " + validQRReference + " should valid");
}


//-- invalid qr reference

if(SwissQRBill.utils.isQRReferenceValid(invalidQRReference)){
  throw new Error("Error in SwissQRBill.utils.isQRReferenceValid: IBAN " + invalidQRReference + " should be a invalid");
}


//-- valid qr reference

if(!SwissQRBill.utils.isQRReferenceValid(validQRReference)){
  throw new Error("Error in SwissQRBill.utils.isQRReferenceValid: IBAN " + validQRReference + " should valid");
}