  
# Utils
  
- Functions
  
  - [isQRIBAN(iban)](#function-isqribaniban)
  - [isIBANValid(iban)](#function-isibanvalidiban)
  - [formatIBAN(iban)](#function-formatibaniban)
  - [isQRReference(reference)](#function-isqrreferencereference)
  - [isQRReferenceValid(reference)](#function-isqrreferencevalidreference)
  - [isSCORReference(reference)](#function-isscorreferencereference)
  - [isSCORReferenceValid(reference)](#function-isscorreferencevalidreference)
  - [calculateSCORReferenceChecksum(reference)](#function-calculatescorreferencechecksumreference)
  - [calculateQRReferenceChecksum(reference)](#function-calculateqrreferencechecksumreference)
  - [formatQRReference(reference)](#function-formatqrreferencereference)
  - [formatSCORReference(reference)](#function-formatscorreferencereference)
  - [formatReference(reference)](#function-formatreferencereference)
  - [formatAmount(amount)](#function-formatamountamount)
  - [mm2pt(millimeters)](#function-mm2ptmillimeters)
  - [pt2mm(points)](#function-pt2mmpoints)
  - [mm2px(millimeters)](#function-mm2pxmillimeters)
  - [px2mm(pixels)](#function-px2mmpixels)
  - [getReferenceType(reference)](#function-getreferencetypereference)
  
<br/>
  
## Functions
  
<br/>
  
### Function: isQRIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L7C0)  
  
#### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given IBAN is a QR-IBAN and `false`  
  
#### Description
  
Checks whether the given iban is a QR-IBAN or not.  
  
<br/>
  
### Function: isIBANValid(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L20C0)  
  
#### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the checksum of the given IBAN is valid and `false`  
  
#### Description
  
Validates the given IBAN.  
  
<br/>
  
### Function: formatIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L41C0)  
  
#### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted IBAN.  
  
#### Description
  
Formats the given IBAN according the specifications to be easily readable.  
  
<br/>
  
### Function: isQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L56C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a QR-Reference and `false`  
  
#### Description
  
Checks whether the given reference is a QR-Reference or not.  
  
#### Remark
  
The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.  
  
<br/>
  
### Function: isQRReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L79C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
#### Description
  
Validates the given QR-Reference.  
  
<br/>
  
### Function: isSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L104C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a SCOR-Reference and `false`  
  
#### Description
  
Checks whether the given reference is a SCOR-Reference or not.  
  
#### Remark
  
The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.  
  
<br/>
  
### Function: isSCORReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L131C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
#### Description
  
Validates the given SCOR-Reference.  
  
<br/>
  
### Function: calculateSCORReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L162C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum as 2 digit string.  
  
#### Description
  
Calculates the checksum according to the ISO 11649 standard.  
  
<br/>
  
### Function: calculateQRReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L175C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The 26 digits long reference (without the checksum) whose checksum should be calculated.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum.  
  
#### Description
  
Calculates the checksum according the specifications.  
  
<br/>
  
### Function: formatQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L185C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The QR-Reference to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted QR-Reference.  
  
#### Description
  
Formats the given QR-Reference according the specifications to be easily readable.  
  
<br/>
  
### Function: formatSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L206C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The SCOR-Reference to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted SCOR-Reference.  
  
#### Description
  
Formats the given SCOR-Reference according the specifications to be easily readable.  
  
<br/>
  
### Function: formatReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L222C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted reference.  
  
#### Description
  
Detects the type of the given reference and formats it according the specifications to be easily readable.  
  
<br/>
  
### Function: formatAmount(amount)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L243C0)  
  
#### Parameter
  
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Containing the amount to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted amount.  
  
#### Description
  
Formats the given amount according the specifications to be easily readable.  
  
<br/>
  
### Function: mm2pt(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L269C0)  
  
#### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to points.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in points.  
  
#### Description
  
Converts millimeters to points.  
  
<br/>
  
### Function: pt2mm(points)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L280C0)  
  
#### Parameter
  
- **points** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The points you want to convert to millimeters.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted points in millimeters.  
  
#### Description
  
Converts points to millimeters.  
  
<br/>
  
### Function: mm2px(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L291C0)  
  
#### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to pixels.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in pixels.  
  
#### Description
  
Converts millimeters to pixels.  
  
<br/>
  
### Function: px2mm(pixels)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L302C0)  
  
#### Parameter
  
- **pixels** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Containing the pixels you want to convert to millimeters.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted pixels in millimeters.  
  
#### Description
  
Converts pixels to millimeters.  
  
<br/>
  
### Function: getReferenceType(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L313C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) The reference to get the type of.  
  
#### Return Type
  
`"NON"` | `"QRR"` | `"SCOR"` The type of the given reference.  
  
#### Description
  
Detects the type of the given reference.  
