  
# Index
  
<br/>
  
- Classes
  
  - [SwissQRBill](#class-swissqrbill)
  
    - Constructor
      - [new SwissQRBill(data\[, options\])](#function-swissqrbillnew-swissqrbilldata-options)
    - Property
      - [instance](#property-swissqrbillinstance)
    - Method
      - [toString()](#function-swissqrbillswissqrbilltostring)
    - Getters
      - [outerHTML()](#function-swissqrbillswissqrbillouterhtml)
      - [element()](#function-swissqrbillswissqrbillelement)
  
  - [SwissQRCode](#class-swissqrcode)
  
    - Constructor
      - [new SwissQRCode(data, size)](#function-swissqrcodenew-swissqrcodedata-size)
  
<br/>
  
## Classes
  
### Class: SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L13C0)  
  
<br/>
  
#### Construct Signature
  
##### Function: SwissQRBill.new SwissQRBill(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L24C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#interface-data)  
- **options** [`SVGOptions`](./types.md#interface-svgoptions) `optional`  
  
###### Return Type
  
[`SwissQRBill`](#class-swissqrbill)  
  
<br/>
  
#### Property
  
##### Property: SwissQRBill.instance
  
`protected`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L15C2)  
  
###### Type
  
`SVG`  
  
<br/>
  
#### Method
  
##### Function: SwissQRBill.SwissQRBill.toString()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L59C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG as a `string`  
  
###### Description
  
Outputs the SVG as a string.  
  
<br/>
  
#### Getters
  
##### Function: SwissQRBill.SwissQRBill.outerHTML()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L50C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
  
<br/>
  
##### Function: SwissQRBill.SwissQRBill.element()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L69C2)  
  
###### Return Type
  
`SVGElement` The SVG element.  
  
###### Description
  
Returns the SVG element.  
  
<br/>
  
### Class: SwissQRCode
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L8C0)  
  
<br/>
  
#### Construct Signature
  
##### Function: SwissQRCode.new SwissQRCode(data, size)
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L15C2)  
  
###### Parameters
  
- **data** [`Data`](./types.md#interface-data) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
###### Return Type
  
[`SwissQRCode`](#class-swissqrcode)  
  
###### Description
  
Creates a Swiss QR Code.  
