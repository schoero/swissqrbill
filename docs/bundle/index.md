  
# Index
  
- Namespaces
  
  - [errors](#errors)
  
    - Functions
  
      - [resolveMessageParams(message, params)](#resolvemessageparamsmessage-params)
  
    - Classes
  
      - [ValidationError](#validationerror)
  
        - Constructor
  
          - [constructor(message\[, params\])](#constructormessage-params)
  
    - Enums
  
      - [ValidationErrors](#validationerrors)
  
  - [pdf](#pdf)
  
    - Classes
  
      - [SwissQRBill](#swissqrbill)
  
        - Constructor
  
          - [constructor(data\[, options\])](#constructordata-options)
  
        - Properties
  
          - [width](#width)
          - [height](#height)
  
        - Methods
  
          - [attachTo(doc, xPosition, yPosition)](#attachtodoc-xposition-yposition)
          - [isSpaceSufficient(doc, xPosition, yPosition)](#isspacesufficientdoc-xposition-yposition)
  
      - [SwissQRCode](#swissqrcode)
  
        - Constructor
  
          - [constructor(data, size)](#constructordata-size)
  
        - Method
  
          - [attachTo(doc)](#attachtodoc)
  
      - [Table](#table)
  
        - Constructor
  
          - [constructor(data)](#constructordata)
  
        - Method
  
          - [attachTo(doc)](#attachtodoc-1)
  
    - Interfaces
  
      - [PDFTable](#pdftable)
      - [PDFRow](#pdfrow)
      - [PDFColumn](#pdfcolumn)
  
  - [table](#table-1)
  
    - Interfaces
  
      - [PDFTable](#pdftable)
      - [PDFRow](#pdfrow)
      - [PDFColumn](#pdfcolumn)
  
    - Classes
  
      - [Table](#table)
  
        - Constructor
  
          - [constructor(data)](#constructordata)
  
        - Method
  
          - [attachTo(doc)](#attachtodoc-1)
  
  - [svg](#svg)
  
    - Classes
  
      - [SwissQRBill](#swissqrbill-1)
  
        - Constructor
  
          - [constructor(data\[, options\])](#constructordata-options-1)
  
        - Property
  
          - [instance](#instance)
  
        - Method
  
          - [toString()](#tostring)
  
        - Getters
  
          - [outerHTML()](#outerhtml)
          - [element()](#element)
  
      - [SwissQRCode](#swissqrcode-1)
  
        - Constructor
  
          - [constructor(data, size)](#constructordata-size-1)
  
  - [types](#types)
  
    - Type aliases
  
      - [Currency](#currency)
      - [Size](#size)
      - [Language](#language)
      - [FontName](#fontname)
  
    - Interfaces
  
      - [Data](#data)
      - [Debtor](#debtor)
      - [Creditor](#creditor)
      - [QRBillOptions](#qrbilloptions)
      - [PDFOptions](#pdfoptions)
      - [SVGOptions](#svgoptions)
  
  - [utils](#utils)
  
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
  
## Namespaces
  
### errors
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L1C7)  
  
---
  
#### resolveMessageParams(message, params)
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L13C0)  
  
##### Parameters
  
- **message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
- **params** [`type literal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
  
#### ValidationError
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L1C0)  
  
##### Construct Signature
  
---
  
###### constructor(message\[, params\])
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L2C2)  
  
###### Parameters
  
- **message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
- **params** [`type literal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) `optional`  
  
##### Return Type
  
[`ValidationError`](#validationerror)  
  
## ValidationErrors
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L19C0)  
  
- ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING`"If there is no reference, a conventional IBAN must be used."`
- ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR`"QR-IBAN requires the use of a QR-Reference."`
- ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR`"QR-Reference requires the use of a QR-IBAN."`
- ACCOUNT_LENGTH_IS_INVALID`"The provided IBAN number '{iban}' is either too long or too short."`
- ADDITIONAL_INFORMATION_LENGTH_IS_INVALID`"Additional information must be a maximum of 140 characters."`
- ADDITIONAL_INFORMATION_TYPE_IS_INVALID`"Additional information must be a string."`
- ALTERNATIVE_SCHEME_LENGTH_IS_INVALID`"{scheme} must be a maximum of 100 characters."`
- ALTERNATIVE_SCHEME_TYPE_IS_INVALID`"{scheme} must be a string."`
- AMOUNT_LENGTH_IS_INVALID`"Amount must be a maximum of 12 digits."`
- AMOUNT_TYPE_IS_INVALID`"Amount must be a number."`
- CREDITOR_ACCOUNT_COUNTRY_IS_INVALID`"Only CH and LI IBAN numbers are allowed."`
- CREDITOR_ACCOUNT_IS_INVALID`"The provided IBAN number '{iban}' is not valid."`
- CREDITOR_ACCOUNT_IS_UNDEFINED`"Creditor account cannot be undefined."`
- CREDITOR_ADDRESS_IS_UNDEFINED`"Creditor address cannot be undefined."`
- CREDITOR_ADDRESS_LENGTH_IS_INVALID`"Creditor address must be a maximum of 70 characters."`
- CREDITOR_ADDRESS_TYPE_IS_INVALID`"Creditor address TYPE must be a string."`
- CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID`"Creditor buildingNumber must be a maximum of 16 characters."`
- CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID`"Creditor buildingNumber must be either a string or a number."`
- CREDITOR_CITY_IS_UNDEFINED`"Creditor city cannot be undefined."`
- CREDITOR_CITY_LENGTH_IS_INVALID`"Creditor city must be a maximum of 35 characters."`
- CREDITOR_CITY_TYPE_IS_INVALID`"Creditor city must be a string."`
- CREDITOR_COUNTRY_IS_UNDEFINED`"Creditor country cannot be undefined."`
- CREDITOR_COUNTRY_LENGTH_IS_INVALID`"Creditor country must be 2 characters."`
- CREDITOR_COUNTRY_TYPE_IS_INVALID`"Creditor country must be a string."`
- CREDITOR_IS_UNDEFINED`"Creditor cannot be undefined."`
- CREDITOR_NAME_IS_UNDEFINED`"Creditor name cannot be undefined."`
- CREDITOR_NAME_LENGTH_IS_INVALID`"Creditor name must be a maximum of 70 characters."`
- CREDITOR_NAME_TYPE_IS_INVALID`"Creditor name must be a string."`
- CREDITOR_ZIP_IS_UNDEFINED`"Creditor zip cannot be undefined."`
- CREDITOR_ZIP_LENGTH_IS_INVALID`"Creditor zip must be a maximum of 16 characters."`
- CREDITOR_ZIP_TYPE_IS_INVALID`"Creditor zip must be either a string or a number."`
- CURRENCY_IS_UNDEFINED`"Currency cannot be undefined."`
- CURRENCY_LENGTH_IS_INVALID`"Currency must be a length of 3 characters."`
- CURRENCY_STRING_IS_INVALID`"Currency must be either 'CHF' or 'EUR'"`
- CURRENCY_TYPE_IS_INVALID`"Currency must be a string."`
- DEBTOR_ADDRESS_IS_UNDEFINED`"Debtor address cannot be undefined."`
- DEBTOR_ADDRESS_LENGTH_IS_INVALID`"Debtor address must be a maximum of 70 characters."`
- DEBTOR_ADDRESS_TYPE_IS_INVALID`"Debtor address TYPE must be a string."`
- DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID`"Debtor buildingNumber must be a maximum of 16 characters."`
- DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID`"Debtor buildingNumber must be either a string or a number."`
- DEBTOR_CITY_IS_UNDEFINED`"Debtor city cannot be undefined."`
- DEBTOR_CITY_LENGTH_IS_INVALID`"Debtor city must be a maximum of 35 characters."`
- DEBTOR_CITY_TYPE_IS_INVALID`"Debtor city must be a string."`
- DEBTOR_COUNTRY_IS_UNDEFINED`"Debtor country cannot be undefined."`
- DEBTOR_COUNTRY_LENGTH_IS_INVALID`"Debtor country must be 2 characters."`
- DEBTOR_COUNTRY_TYPE_IS_INVALID`"Debtor country must be a string."`
- DEBTOR_IS_UNDEFINED`"Debtor cannot be undefined."`
- DEBTOR_NAME_IS_UNDEFINED`"Debtor name cannot be undefined."`
- DEBTOR_NAME_LENGTH_IS_INVALID`"Debtor name must be a maximum of 70 characters."`
- DEBTOR_NAME_TYPE_IS_INVALID`"Debtor name must be a string."`
- DEBTOR_ZIP_IS_UNDEFINED`"Debtor zip cannot be undefined."`
- DEBTOR_ZIP_LENGTH_IS_INVALID`"Debtor zip must be a maximum of 16 characters."`
- DEBTOR_ZIP_TYPE_IS_INVALID`"Debtor zip must be either a string or a number."`
- MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID`"Message and additionalInformation combined must be a maximum of 140 characters."`
- MESSAGE_LENGTH_IS_INVALID`"Message must be a maximum of 140 characters."`
- MESSAGE_TYPE_IS_INVALID`"Message must be a string."`
- QR_REFERENCE_IS_INVALID`"The provided QR-Reference '{reference}' is not valid."`
- QR_REFERENCE_LENGTH_IS_INVALID`"QR-Reference must be a must be exactly 27 characters."`
- REFERENCE_TYPE_IS_INVALID`"Reference must be a string."`
- REGULAR_REFERENCE_LENGTH_IS_INVALID`"Creditor reference must be a maximum of 25 characters."`
  
# pdf
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L2C7)  
  
## SwissQRBill
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L14C0)  
  
### Description
  
The SwissQRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
using the [`attachTo`](#attachtodoc-xposition-yposition) method.  
  
### Construct Signature
  
---
  
#### constructor(data\[, options\])
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L31C2)  
  
##### Parameters
  
- **data** [`Data`](#data) The data to be used for the QR Bill.  
- **options** [`PDFOptions`](#pdfoptions) Options to define how the QR Bill should be rendered. `optional`  
  
##### Return Type
  
[`SwissQRBill`](#swissqrbill)  
  
##### Description
  
Creates a new SwissQRBill instance.  
  
### Properties
  
#### width
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L114C2)  
  
##### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Description
  
The horizontal size of the QR Bill.  
  
#### height
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L119C2)  
  
##### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Description
  
The vertical size of the QR Bill.  
  
### Methods
  
---
  
#### attachTo(doc, xPosition, yPosition)
  
`public`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L69C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit instance  
- **xPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position where the QR Bill will be placed. Default: `0`  
- **yPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position where the QR Bill will be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Return Type
  
`void`  
  
##### Description
  
Adds the QR Bill to the bottom of the current page if there is enough space,
otherwise it will create a new page for the QR Bill.  
  
---
  
#### isSpaceSufficient(doc, xPosition, yPosition)
  
`public` `static`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L97C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance  
- **xPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position where the QR Bill will be placed.  
- **yPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position where the QR Bill will be placed.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if there is enough space, otherwise `false`  
  
##### Description
  
Checks whether there is enough space on the current page to add the QR Bill.  
  
## SwissQRCode
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L7C0)  
  
### Construct Signature
  
---
  
#### constructor(data, size)
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L17C2)  
  
##### Parameters
  
- **data** [`Data`](#data) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
##### Return Type
  
[`SwissQRCode`](#swissqrcode)  
  
##### Description
  
Creates a Swiss QR Code.  
  
### Method
  
---
  
#### attachTo(doc)
  
`public`  
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L27C2)  
  
##### Parameter
  
- **doc** `PDFDocument` The PDF document to attach the Swiss QR Code to.  
  
##### Return Type
  
`void`  
  
##### Description
  
Attaches the Swiss QR Code to a PDF document.  
  
## PDFTable
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L1C0)  
  
- **rows** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table rows.
  
  - [`PDFRow`](#pdfrow)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the table `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the table. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the table. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the table. `optional`
- **padding** `union` Cell padding of the table cells. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside table. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the table `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of whole table. `optional`
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Horizontal start position of the table. `optional`
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Vertical start position of the table. `optional`
  
## PDFRow
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L32C0)  
  
- **columns** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table columns.
  
  - [`PDFColumn`](#pdfcolumn)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the row `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the row. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the row. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the row. `optional`
- **header** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) A header row gets inserted automatically on new pages. Only one header row is allowed. `optional`
- **height** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Height of the row. Overrides minHeight and maxHeight `optional`
- **maxHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Maximum height of the row `optional`
- **minHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Minimum height of the row `optional`
- **padding** `union` Cell padding of the table cells inside the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the row. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the row `optional`
  
## PDFColumn
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L65C0)  
  
- **text** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Cell text.
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of the text inside the cell `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the cell. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the cell. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the cell. `optional`
- **padding** `union` Cell padding of the table cell. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the cell. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of the text inside the cell `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of the cell. `optional`
  
## Table
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L100C0)  
  
### Construct Signature
  
---
  
#### constructor(data)
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L136C2)  
  
##### Parameter
  
- **data** [`PDFTable`](#pdftable) An Object which contains the table information.  
  
##### Return Type
  
[`Table`](#table) The Table instance.  
  
##### Description
  
Inserts a table to the document.  
  
##### Example
  
```ts
const table = {
  rows: [
    {
      backgroundColor: "#ECF0F1",
      columns: [
        {
          text: "Row 1 cell 1"
        }, {
          text: "Row 1 cell 2"
        }, {
          text: "Row 1 cell 3"
        }
      ]
    }, {
      columns: [
        {
          text: "Row 2 cell 1"
        }, {
          text: "Row 2 cell 2"
        }, {
          text: "Row 2 cell 3"
        }
      ]
    }
  ]
};
```  
  
### Method
  
---
  
#### attachTo(doc)
  
`public`  
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L158C2)  
  
##### Parameter
  
- **doc** `PDFDocument` The PDFKit document instance  
  
##### Return Type
  
[`Table`](#table) The Table instance.  
  
##### Throws
  
- `Error` Throws an error if no table rows are provided.
  
##### Description
  
Attaches the table to a PDFKit document instance.  
  
# table
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L3C7)  
  
## PDFTable
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L1C0)  
  
- **rows** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table rows.
  
  - [`PDFRow`](#pdfrow)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the table `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the table. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the table. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the table. `optional`
- **padding** `union` Cell padding of the table cells. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside table. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the table `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of whole table. `optional`
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Horizontal start position of the table. `optional`
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Vertical start position of the table. `optional`
  
## PDFRow
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L32C0)  
  
- **columns** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table columns.
  
  - [`PDFColumn`](#pdfcolumn)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the row `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the row. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the row. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the row. `optional`
- **header** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) A header row gets inserted automatically on new pages. Only one header row is allowed. `optional`
- **height** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Height of the row. Overrides minHeight and maxHeight `optional`
- **maxHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Maximum height of the row `optional`
- **minHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Minimum height of the row `optional`
- **padding** `union` Cell padding of the table cells inside the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the row. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the row `optional`
  
## PDFColumn
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L65C0)  
  
- **text** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Cell text.
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of the text inside the cell `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the cell. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the cell. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the cell. `optional`
- **padding** `union` Cell padding of the table cell. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the cell. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of the text inside the cell `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of the cell. `optional`
  
## Table
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L100C0)  
  
### Construct Signature
  
---
  
#### constructor(data)
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L136C2)  
  
##### Parameter
  
- **data** [`PDFTable`](#pdftable) An Object which contains the table information.  
  
##### Return Type
  
[`Table`](#table) The Table instance.  
  
##### Description
  
Inserts a table to the document.  
  
##### Example
  
```ts
const table = {
  rows: [
    {
      backgroundColor: "#ECF0F1",
      columns: [
        {
          text: "Row 1 cell 1"
        }, {
          text: "Row 1 cell 2"
        }, {
          text: "Row 1 cell 3"
        }
      ]
    }, {
      columns: [
        {
          text: "Row 2 cell 1"
        }, {
          text: "Row 2 cell 2"
        }, {
          text: "Row 2 cell 3"
        }
      ]
    }
  ]
};
```  
  
### Method
  
---
  
#### attachTo(doc)
  
`public`  
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L158C2)  
  
##### Parameter
  
- **doc** `PDFDocument` The PDFKit document instance  
  
##### Return Type
  
[`Table`](#table) The Table instance.  
  
##### Throws
  
- `Error` Throws an error if no table rows are provided.
  
##### Description
  
Attaches the table to a PDFKit document instance.  
  
# svg
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L4C7)  
  
## SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L13C0)  
  
### Construct Signature
  
---
  
#### constructor(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L24C2)  
  
##### Parameters
  
- **data** [`Data`](#data)  
- **options** [`SVGOptions`](#svgoptions) `optional`  
  
##### Return Type
  
[`SwissQRBill`](#swissqrbill-1)  
  
### Property
  
#### instance
  
`protected`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L15C2)  
  
##### Type
  
`SVG`  
  
### Method
  
---
  
#### toString()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L59C2)  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG as a `string`  
  
##### Description
  
Outputs the SVG as a string.  
  
### Getters
  
---
  
#### outerHTML()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L50C2)  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
  
---
  
#### element()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L69C2)  
  
##### Return Type
  
`SVGElement` The SVG element.  
  
##### Description
  
Returns the SVG element.  
  
## SwissQRCode
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L8C0)  
  
### Construct Signature
  
---
  
#### constructor(data, size)
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L15C2)  
  
##### Parameters
  
- **data** [`Data`](#data) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
##### Return Type
  
[`SwissQRCode`](#swissqrcode-1)  
  
##### Description
  
Creates a Swiss QR Code.  
  
# types
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L5C7)  
  
## Currency
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L2C0)  
  
### Type
  
`"CHF"` | `"EUR"`  
  
## Size
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L3C0)  
  
### Type
  
`"A4"` | `"A6"` | `"A6/5"`  
  
## Language
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L4C0)  
  
### Type
  
`"DE"` | `"EN"` | `"FR"` | `"IT"`  
  
## FontName
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L5C0)  
  
### Type
  
`"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"`  
  
## Data
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L7C0)  
  
- **creditor** [`Creditor`](#creditor) Creditor related data.
- **currency** [`Currency`](#currency) The currency to be used. **3 characters.**
- **additionalInformation** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Additional information. **Max 140 characters.**
  Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment. `optional`
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The amount. **Max. 12 digits.** `optional`
- **av1** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf) `optional`
- **av2** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf) `optional`
- **debtor** [`Debtor`](#debtor) Debtor related data. `optional`
- **message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A message. **Max. 140 characters.**
  message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference. `optional`
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A reference number. **Max 27 characters.**
  QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
  Creditor Reference (ISO 11649): Maximum 25 characters. `optional`
  
## Debtor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L66C0)  
  
- **address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
  
## Creditor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L99C0)  
  
- **address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
- **account** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN. **21 characters.**
  
## QRBillOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L107C0)  
  
- **font** [`FontName`](#fontname) Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **language** [`Language`](#language) The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
  
## PDFOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L137C0)  
  
- **font** [`FontName`](#fontname) Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **language** [`Language`](#language) The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
- **separate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the text `Separate before paying in` `optional`
  
## SVGOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L148C0)  
  
- **font** [`FontName`](#fontname) Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **language** [`Language`](#language) The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
  
# utils
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L6C7)  
  
## isQRIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L6C0)  
  
### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given IBAN is a QR-IBAN and `false`  
  
### Description
  
Checks whether the given iban is a QR-IBAN or not.  
  
## isIBANValid(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L18C0)  
  
### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the checksum of the given IBAN is valid and `false`  
  
### Description
  
Validates the given IBAN.  
  
## formatIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L38C0)  
  
### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be formatted.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted IBAN.  
  
### Description
  
Formats the given IBAN according the specifications to be easily readable.  
  
## isQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L52C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a QR-Reference and `false`  
  
### Description
  
Checks whether the given reference is a QR-Reference or not.  
  
### Remark
  
The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.  
  
## isQRReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L74C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
### Description
  
Validates the given QR-Reference.  
  
## isSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L98C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a SCOR-Reference and `false`  
  
### Description
  
Checks whether the given reference is a SCOR-Reference or not.  
  
### Remark
  
The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.  
  
## isSCORReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L124C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
### Description
  
Validates the given SCOR-Reference.  
  
## calculateSCORReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L154C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum as 2 digit string.  
  
### Description
  
Calculates the checksum according to the ISO 11649 standard.  
  
## calculateQRReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L166C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The 26 digits long reference (without the checksum) whose checksum should be calculated.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum.  
  
### Description
  
Calculates the checksum according the specifications.  
  
## formatQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L175C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The QR-Reference to be formatted.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted QR-Reference.  
  
### Description
  
Formats the given QR-Reference according the specifications to be easily readable.  
  
## formatSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L195C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The SCOR-Reference to be formatted.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted SCOR-Reference.  
  
### Description
  
Formats the given SCOR-Reference according the specifications to be easily readable.  
  
## formatReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L210C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be formatted.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted reference.  
  
### Description
  
Detects the type of the given reference and formats it according the specifications to be easily readable.  
  
## formatAmount(amount)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L230C0)  
  
### Parameter
  
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) containing the amount to be formatted.  
  
### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted amount.  
  
### Description
  
Formats the given amount according the specifications to be easily readable.  
  
## mm2pt(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L255C0)  
  
### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to points.  
  
### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in points.  
  
### Description
  
Converts millimeters to points.  
  
## pt2mm(points)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L265C0)  
  
### Parameter
  
- **points** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The points you want to convert to millimeters.  
  
### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted points in millimeters.  
  
### Description
  
Converts points to millimeters.  
  
## mm2px(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L275C0)  
  
### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to pixels.  
  
### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in pixels.  
  
### Description
  
Converts millimeters to pixels.  
  
## px2mm(pixels)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L285C0)  
  
### Parameter
  
- **pixels** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) containing the pixels you want to convert to millimeters.  
  
### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted pixels in millimeters.  
  
### Description
  
Converts pixels to millimeters.  
  
## getReferenceType(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L295C0)  
  
### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) The reference to get the type of.  
  
### Return Type
  
`"NON"` | `"QRR"` | `"SCOR"` The type of the given reference.  
  
### Description
  
Detects the type of the given reference.  
