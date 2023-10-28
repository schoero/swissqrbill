  
# Index
  
- Classes
  
  - [SwissQRBill](#swissqrbill)
  
    - Constructor
  
      - [constructor(data\[, options\])](#constructordata-options)
  
    - Property
  
      - [instance](#instance)
  
    - Method
  
      - [toString()](#tostring)
  
    - Getters
  
      - [outerHTML()](#outerhtml)
      - [element()](#element)
  
  - [SwissQRCode](#swissqrcode)
  
    - Constructor
  
      - [constructor(data, size)](#constructordata-size)
  
## Classes
  
### SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L13C0)  
  
#### Construct Signature
  
---
  
##### constructor(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L24C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#data)  
- **options** [`SVGOptions`](./types.md#svgoptions) `optional`  
  
##### Return Type
  
[`SwissQRBill`](#swissqrbill)  
  
### Property
  
---
  
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
  
- **data** [`Data`](./types.md#data) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
##### Return Type
  
[`SwissQRCode`](#swissqrcode)  
  
##### Description
  
Creates a Swiss QR Code.  
