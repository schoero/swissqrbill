  
# Types
  
- Type aliases
  
  - [Language](#type-alias-language)
  - [FontName](#type-alias-fontname)
  - [Currency](#type-alias-currency)
  - [Data](#interface-data)
  - [Debtor](#interface-debtor)
  - [Creditor](#interface-creditor)
  - [PDFOptions](#interface-pdfoptions)
  - [SVGOptions](#interface-svgoptions)
  
<br/>
  
## Type aliases
  
### Type alias: Language
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L154C0)  
  
#### Type
  
`"DE"` | `"EN"` | `"FR"` | `"IT"`  
  
<br/>
  
### Type alias: FontName
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L155C0)  
  
#### Type
  
`"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"`  
  
<br/>
  
### Type alias: Currency
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L156C0)  
  
#### Type
  
`"CHF"` | `"EUR"`  
  
<br/>
  
### Interface: Data
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L1C0)  
  
- **creditor** [`Creditor`](#interface-creditor) Creditor related data.
- **currency** `"CHF"` | `"EUR"` The currency to be used. **3 characters.**
- **additionalInformation** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Additional information. **Max 140 characters.**
  
  Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment. `optional`
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The amount. **Max. 12 digits.** `optional`
- **av1** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**
  
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf) `optional`
- **av2** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**
  
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf) `optional`
- **debtor** [`Debtor`](#interface-debtor) Debtor related data. `optional`
- **message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A message. **Max. 140 characters.**
  
  message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference. `optional`
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A reference number. **Max 27 characters.**
  
  QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
  Creditor Reference (ISO 11649): Maximum 25 characters. `optional`
  
<br/>
  
### Interface: Debtor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L60C0)  
  
- **address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
  
<br/>
  
### Interface: Creditor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L93C0)  
  
- **address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
- **account** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN. **21 characters.**
  
<br/>
  
### Interface: PDFOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L139C0)  
  
- **fontName** `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"` Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
  
  *Example:*
  
  ```ts
  // Register the font
  pdf.registerFont("Liberation-Sans", "path/to/LiberationSans-Regular.ttf");
  pdf.registerFont("Liberation-Sans-Bold", "path/to/LiberationSans-Bold.ttf");
  const qrBill = new SwissQRBill(data, { fontName: "Liberation-Sans" });
  ```
  
- **language** `"DE"` | `"EN"` | `"FR"` | `"IT"` The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
- **separate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the text `Separate before paying in` `optional`
  
<br/>
  
### Interface: SVGOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L150C0)  
  
- **fontName** `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"` Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
  
  *Example:*
  
  ```ts
  // Register the font
  pdf.registerFont("Liberation-Sans", "path/to/LiberationSans-Regular.ttf");
  pdf.registerFont("Liberation-Sans-Bold", "path/to/LiberationSans-Bold.ttf");
  const qrBill = new SwissQRBill(data, { fontName: "Liberation-Sans" });
  ```
  
- **language** `"DE"` | `"EN"` | `"FR"` | `"IT"` The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
