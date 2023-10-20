  
# Swissqrbill
  
- Class
  
  - [SwissQRBill](#swissqrbill-1)
  
    - Constructor
  
      - [constructor(data\[, options\])](#constructordata-options)
  
    - Properties
  
      - [width](#width)
      - [height](#height)
  
    - Methods
  
      - [attachTo(doc, xPosition, yPosition)](#attachtodoc-xposition-yposition)
      - [isSpaceSufficient(doc, xPosition, yPosition)](#isspacesufficientdoc-xposition-yposition)
  
## Class
  
### SwissQRBill
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L14C0)  
  
#### Description
  
The SwissQRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
using the [`attachTo`](#attachtodoc-xposition-yposition) method.  
  
#### Construct Signature
  
---
  
##### constructor(data\[, options\])
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L31C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#data) The data to be used for the QR Bill.  
- **options** [`QRBillOptions`](./types.md#qrbilloptions) Options to define how the QR Bill should be rendered. `optional`  
  
##### Return Type
  
[`SwissQRBill`](#swissqrbill-1)  
  
##### Description
  
Creates a new SwissQRBill instance.  
  
### Properties
  
#### width
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L121C2)  
  
##### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Description
  
The horizontal size of the QR Bill.  
  
#### height
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L126C2)  
  
##### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Description
  
The vertical size of the QR Bill.  
  
### Methods
  
---
  
#### attachTo(doc, xPosition, yPosition)
  
`public`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L76C2)  
  
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
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L104C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance  
- **xPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position where the QR Bill will be placed.  
- **yPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position where the QR Bill will be placed.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if there is enough space, otherwise `false`  
  
##### Description
  
Checks whether there is enough space on the current page to add the QR Bill.  
