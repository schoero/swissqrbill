# Utilities documentation

## Contents

- IBAN
  - [isQRIBAN(iban)](#isqribaniban)
  - [isIBANValid(iban)](#isibanvalidiban)
  - [formatIBAN(iban)](#formatibaniban)
- Reference
  - [isQRReference(reference)](#isqrreferencereference)
  - [isQRReferenceValid(reference)](#isqrreferencereference)
  - [calculateQRReferenceChecksum(reference)](#calculateqrreferencechecksumreference)
  - [formatQRReference(reference)](#formatQRReferencereference)
  - [formatSCORReference(reference)](#formatscorreferencereference)
- Amount
  - [formatAmount(amount)](#formatamountamount)
- Other
  - [mmToPoints(mm)](#mmtopointsmm)

<br/>

## IBAN
  
### isQRIBAN(iban)
 - iban - `string` containing the iban to be checked.
Checks whether the given iban is a QR-IBAN or not.
Returns a `boolean`: true if the given iban is a QR-IBAN and false otherwise.

### isIBANValid(iban)
 - iban - `string` containing the iban to be checked.
Validates the given iban.
Returns a `boolean`: true if the given iban is valid and false otherwise.

### formatIBAN(iban)
 - iban - `string` containing the iban to be formatted.
Formats the given iban according the specifications to be easily readable.
Returns a `string` containing the formatted iban.

<br/>

## Reference
  
### isQRReference(reference)
 - reference - `string` containing the reference to be checked.
Checks whether the given reference is a QR-Reference or not.
Returns a `boolean`: true if the given iban is a QR-Reference and false otherwise.

### isQRReferenceValid(reference)
 - reference - `string` containing the reference to be checked.
Validates the given reference.
Returns a `boolean`: true if the given reference is valid and false otherwise.

### calculateQRReferenceChecksum(reference)
 - reference - `string` containing the 26 digits long reference (without the checksum) whose checksum should be calculated.
Calculates the checksum according the specifications.
Returns a `string` containing the calculated checksum.

### formatQRReference(reference)
 - reference - `string` containing the QR-Reference to be formatted.
Formats the given QR-Reference according the specifications to be easily readable.
Returns a `string` containing the formatted QR-Reference.

### formatSCORReference(reference)
 - reference - `string` containing the SCOR-Reference to be formatted.
Formats the given SCOR-Reference according the specifications to be easily readable.
Returns a `string` containing the formatted SCOR-Reference.

<br/>

### Amount

### formatAmount(amount)
 - amount - `number` containing the amount to be formatted.
Formats the given amount according the specifications to be easily readable.
Returns a `string` containing the formatted amount.

<br/>

### Other

### mmToPoints(mm)
 - mm - `number` containg the millimeters you want to convert to points.  
 Converts milimeters to points. This method can be used to simplify positioning while you create your own layout using PDFKit.  
 Returns a `number` containing the converted millimeters in points.
