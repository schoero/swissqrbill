  
# Utils
  
- Functions
  
  - [isQRIBAN(iban)](#isqribaniban)
  - [isIBANValid(iban)](#isibanvalidiban)
  - [formatIBAN(iban)](#formatibaniban)
  - [isQRReference(reference)](#isqrreferencereference)
  - [isQRReferenceValid(reference)](#isqrreferencevalidreference)
  - [isSCORReference(reference)](#isscorreferencereference)
  - [isSCORReferenceValid(reference)](#isscorreferencevalidreference)
  - [calculateSCORReferenceChecksum(reference)](#calculatescorreferencechecksumreference)
  - [calculateQRReferenceChecksum(reference)](#calculateqrreferencechecksumreference)
  - [formatQRReference(reference)](#formatqrreferencereference)
  - [formatSCORReference(reference)](#formatscorreferencereference)
  - [formatReference(reference)](#formatreferencereference)
  - [formatAmount(amount)](#formatamountamount)
  - [mm2pt(millimeters)](#mm2ptmillimeters)
  - [pt2mm(points)](#pt2mmpoints)
  - [mm2px(millimeters)](#mm2pxmillimeters)
  - [px2mm(pixels)](#px2mmpixels)
  - [getReferenceType(reference)](#getreferencetypereference)
  
## Functions
  
---
  
### isQRIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L6C0)  
  
#### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given IBAN is a QR-IBAN and `false`  
  
#### Description
  
Checks whether the given iban is a QR-IBAN or not.  
  
---
  
### isIBANValid(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L18C0)  
  
#### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the checksum of the given IBAN is valid and `false`  
  
#### Description
  
Validates the given IBAN.  
  
---
  
### formatIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L38C0)  
  
#### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted IBAN.  
  
#### Description
  
Formats the given IBAN according the specifications to be easily readable.  
  
---
  
### isQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L52C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a QR-Reference and `false`  
  
#### Description
  
Checks whether the given reference is a QR-Reference or not.  
  
#### Remark
  
The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.  
  
---
  
### isQRReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L74C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
#### Description
  
Validates the given QR-Reference.  
  
---
  
### isSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L98C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a SCOR-Reference and `false`  
  
#### Description
  
Checks whether the given reference is a SCOR-Reference or not.  
  
#### Remark
  
The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.  
  
---
  
### isSCORReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L124C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
#### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
#### Description
  
Validates the given SCOR-Reference.  
  
---
  
### calculateSCORReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L154C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum as 2 digit string.  
  
#### Description
  
Calculates the checksum according to the ISO 11649 standard.  
  
---
  
### calculateQRReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L166C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The 26 digits long reference (without the checksum) whose checksum should be calculated.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum.  
  
#### Description
  
Calculates the checksum according the specifications.  
  
---
  
### formatQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L175C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The QR-Reference to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted QR-Reference.  
  
#### Description
  
Formats the given QR-Reference according the specifications to be easily readable.  
  
---
  
### formatSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L195C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The SCOR-Reference to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted SCOR-Reference.  
  
#### Description
  
Formats the given SCOR-Reference according the specifications to be easily readable.  
  
---
  
### formatReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L210C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted reference.  
  
#### Description
  
Detects the type of the given reference and formats it according the specifications to be easily readable.  
  
---
  
### formatAmount(amount)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L230C0)  
  
#### Parameter
  
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) containing the amount to be formatted.  
  
#### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted amount.  
  
#### Description
  
Formats the given amount according the specifications to be easily readable.  
  
---
  
### mm2pt(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L255C0)  
  
#### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to points.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in points.  
  
#### Description
  
Converts millimeters to points.  
  
---
  
### pt2mm(points)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L265C0)  
  
#### Parameter
  
- **points** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The points you want to convert to millimeters.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted points in millimeters.  
  
#### Description
  
Converts points to millimeters.  
  
---
  
### mm2px(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L275C0)  
  
#### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to pixels.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in pixels.  
  
#### Description
  
Converts millimeters to pixels.  
  
---
  
### px2mm(pixels)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L285C0)  
  
#### Parameter
  
- **pixels** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) containing the pixels you want to convert to millimeters.  
  
#### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted pixels in millimeters.  
  
#### Description
  
Converts pixels to millimeters.  
  
---
  
### getReferenceType(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L295C0)  
  
#### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) The reference to get the type of.  
  
#### Return Type
  
`"NON"` | `"QRR"` | `"SCOR"` The type of the given reference.  
  
#### Description
  
Detects the type of the given reference.  
