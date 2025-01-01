  
# Index
  
- Classes
  
  - [SwissQRBill](#class-swissqrbill)
  
    - Constructor
      - [new SwissQRBill(data\[, options\])](#constructor-new-swissqrbilldata-options)
    - Property
      - [instance](#property-swissqrbillinstance)
    - Method
      - [toString()](#method-swissqrbilltostring)
    - Getter
      - [element()](#getter-swissqrbillelement)
  
  - [SwissQRCode](#class-swissqrcode)
  
    - Constructor
      - [new SwissQRCode(data\[, size\])](#constructor-new-swissqrcodedata-size)
    - Property
      - [instance](#property-swissqrcodeinstance)
    - Method
      - [toString()](#method-swissqrcodetostring)
    - Getter
      - [element()](#getter-swissqrcodeelement)
  
<br/>
  
## Classes
  
### Class: SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L44C0)  
  
#### Description
  
The SwissQRBill class creates the Payment Part with the QR Code as an SVG.  
  
#### Example
  
```ts
const data = {
  amount: 1994.75,
  creditor: {
    account: "CH44 3199 9123 0008 8901 2",
    address: "Musterstrasse",
    buildingNumber: 7,
    city: "Musterstadt",
    country: "CH",
    name: "SwissQRBill",
    zip: 1234
  },
  currency: "CHF",
  debtor: {
    address: "Musterstrasse",
    buildingNumber: 1,
    city: "Musterstadt",
    country: "CH",
    name: "Peter Muster",
    zip: 1234
  },
  reference: "21 00000 00003 13947 14300 09017"
};

const svg = new SwissQRBill(data);
writeFileSync("qr-bill.svg", svg.toString());
```
  
<br/>
  
#### Constructor: new SwissQRBill(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L55C2)  
  
##### Parameters
  
- **data** [`Data`](./types.md#interface-data)  
- **options** [`SVGOptions`](./types.md#interface-svgoptions) `optional`  
  
##### Return Type
  
[`SwissQRBill`](#class-swissqrbill)  
  
<br/>
  
#### Property: SwissQRBill.instance
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L46C2)  
  
##### Type
  
`SVG`  
  
<br/>
  
#### Method: SwissQRBill.toString()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L86C2)  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG.  
  
##### Description
  
Outputs the SVG as a string.  
  
<br/>
  
#### Getter: SwissQRBill.element()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L96C2)  
  
##### Return Type
  
`SVGElement` The SVG element.  
  
##### Description
  
Returns the SVG element.  
  
<br/>
  
### Class: SwissQRCode
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L9C0)  
  
<br/>
  
#### Constructor: new SwissQRCode(data\[, size\])
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L20C2)  
  
##### Parameters
  
- **data** [`Data`](./types.md#interface-data) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. `optional` Default: `46`  
  
##### Return Type
  
[`SwissQRCode`](#class-swissqrcode)  
  
##### Throws
  
- `ValidationError` Throws an error if the data is invalid.
  
##### Description
  
Creates a Swiss QR Code.  
  
<br/>
  
#### Property: SwissQRCode.instance
  
`public`  
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L11C2)  
  
##### Type
  
`SVG`  
  
<br/>
  
#### Method: SwissQRCode.toString()
  
`public`  
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L57C2)  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG element.  
  
##### Description
  
Outputs the SVG as a string.  
  
<br/>
  
#### Getter: SwissQRCode.element()
  
`public`  
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L67C2)  
  
##### Return Type
  
`SVGElement` The SVG element.  
  
##### Description
  
Returns the SVG element.  
