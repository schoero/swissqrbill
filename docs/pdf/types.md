  
# Types
  
- Type aliases
  
  - [Currency](#currency)
  - [Size](#size)
  - [Languages](#languages)
  
- Interfaces
  
  - [Data](#data)
  - [Debtor](#debtor)
  - [Creditor](#creditor)
  - [QRBillOptions](#qrbilloptions)
  - [PDFOptions](#pdfoptions)
  - [SVGOptions](#svgoptions)
  
## Type aliases
  
---
  
### Currency
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L2C0)  
  
#### Type
  
`"CHF"` | `"EUR"`  
  
---
  
### Size
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L3C0)  
  
#### Type
  
`"A4"` | `"A6"` | `"A6/5"`  
  
---
  
### Languages
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L4C0)  
  
#### Type
  
`"DE"` | `"EN"` | `"FR"` | `"IT"`  
  
## Interfaces
  
---
  
### Data
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L6C0)  
  
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
  
---
  
### Debtor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L65C0)  
  
- **address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
  
---
  
### Creditor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L98C0)  
  
- **address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
- **account** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN. **21 characters.**
  
---
  
### QRBillOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L106C0)  
  
- **font** `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"` Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **language** [`Languages`](#languages) The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
- **separate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the text `Separate before paying in` `optional`
  
---
  
### PDFOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L144C0)  
  
- **font** `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"` Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **language** [`Languages`](#languages) The language with which the bill is rendered. `optional`
- **outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
- **separate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the text `Separate before paying in` `optional`
- **autoGenerate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit. `optional`
  
---
  
### SVGOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L153C0)  
  
- **language** [`Languages`](#languages) The language with which the bill is rendered. `optional`
