  
# Index
  
- Classes
  
  - [SwissQRBill](#swissqrbill)
  
    - Constructor
  
      - [new SwissQRBill(data\[, options\])](#new-swissqrbilldata-options)
  
    - Property
  
      - [instance](#swissqrbillinstance)
  
    - Method
  
      - [toString()](#swissqrbilltostring)
  
    - Getters
  
      - [outerHTML()](#swissqrbillouterhtml)
      - [element()](#swissqrbillelement)
  
  - [SwissQRCode](#swissqrcode)
  
    - Constructor
  
      - [new SwissQRCode(data, size)](#new-swissqrcodedata-size)
  
## Classes
  
---
  
### SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L13C0)  
  
#### Construct Signature
  
---
  
##### new SwissQRBill(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L24C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#data)  
- **options** [`SVGOptions`](./types.md#svgoptions) `optional`  
  
###### Return Type
  
[`SwissQRBill`](#swissqrbill)  
  
#### Property
  
---
  
##### SwissQRBill.instance
  
`protected`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L15C2)  
  
###### Type
  
`SVG`  
  
#### Method
  
---
  
##### SwissQRBill.toString()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L59C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG as a `string`  
  
###### Description
  
Outputs the SVG as a string.  
  
#### Getters
  
---
  
##### SwissQRBill.outerHTML()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L50C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
  
---
  
##### SwissQRBill.element()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L69C2)  
  
###### Return Type
  
`SVGElement` The SVG element.  
  
###### Description
  
Returns the SVG element.  
  
---
  
### SwissQRCode
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L8C0)  
  
#### Construct Signature
  
---
  
##### new SwissQRCode(data, size)
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L15C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#data) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
###### Return Type
  
[`SwissQRCode`](#swissqrcode)  
  
###### Description
  
Creates a Swiss QR Code.  
