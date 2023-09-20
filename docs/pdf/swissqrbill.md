  
# Swissqrbill
  
- Class
  
  - [SwissQRBill](#swissqrbill)
  
    - Constructor
  
      - [constructor(data\[, options\])](#constructordata-options)
  
    - Property
  
      - [data](#data)
  
    - Method
  
      - [attachTo(doc, xPosition, yPosition)](#attachtodoc-xposition-yposition)
  
## Class
  
### SwissQRBill
  
Defined in: [pdf/swissqrbill.ts](../pdf/swissqrbill.ts#L14C0)  
  
#### Construct Signature
  
---
  
##### constructor(data\[, options\])
  
Defined in: [pdf/swissqrbill.ts](../pdf/swissqrbill.ts#L28C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#data)  
- **options** [`QRBillOptions`](./types.md#qrbilloptions) `optional`  
  
##### Return Type
  
[SwissQRBill](#swissqrbill)  
  
### Property
  
#### data
  
`protected`  
  
Defined in: [pdf/swissqrbill.ts](../pdf/swissqrbill.ts#L16C2)  
  
##### Type
  
[`Data`](./types.md#data)  
  
### Method
  
---
  
#### attachTo(doc, xPosition, yPosition)
  
`public`  
  
Defined in: [pdf/swissqrbill.ts](../pdf/swissqrbill.ts#L72C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit instance  
- **xPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The x position where the QR Bill will be placed. Default: `0`  
- **yPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The y position where the QR Bill will be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Return Type
  
`void`  
  
##### Description
  
Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.  
