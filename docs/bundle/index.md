  
# Index
  
<br/>
  
- Namespaces
  
  - [pdf](#namespace-pdf)
  
    - Classes
  
      - [SwissQRBill](#class-pdfswissqrbill)
  
        - Constructor
          - [new SwissQRBill(data\[, options\])](#function-pdfswissqrbillnew-pdfswissqrbilldata-options)
        - Properties
          - [width](#property-pdfswissqrbillwidth)
          - [height](#property-pdfswissqrbillheight)
        - Methods
          - [attachTo(doc, x, y)](#function-pdfswissqrbillpdfswissqrbillattachtodoc-x-y)
          - [isSpaceSufficient(doc, xPosition, yPosition)](#function-pdfswissqrbillpdfswissqrbillisspacesufficientdoc-xposition-yposition)
  
      - [SwissQRCode](#class-pdfswissqrcode)
  
        - Constructor
          - [new SwissQRCode(data, size)](#function-pdfswissqrcodenew-pdfswissqrcodedata-size)
        - Method
          - [attachTo(doc, x, y)](#function-pdfswissqrcodepdfswissqrcodeattachtodoc-x-y)
  
      - [PDFTable](#interface-pdfpdftable)
      - [PDFRow](#interface-pdfpdfrow)
      - [PDFColumn](#interface-pdfpdfcolumn)
      - [Table](#class-pdftable)
  
        - Constructor
          - [new Table(data)](#function-pdftablenew-pdftabledata)
        - Method
          - [attachTo(doc, x, y)](#function-pdftablepdftableattachtodoc-x-y)
  
  - [svg](#namespace-svg)
  
    - Classes
  
      - [SwissQRBill](#class-svgswissqrbill)
  
        - Constructor
          - [new SwissQRBill(data\[, options\])](#function-svgswissqrbillnew-svgswissqrbilldata-options)
        - Property
          - [instance](#property-svgswissqrbillinstance)
        - Method
          - [toString()](#function-svgswissqrbillsvgswissqrbilltostring)
        - Getters
          - [outerHTML()](#function-svgswissqrbillsvgswissqrbillouterhtml)
          - [element()](#function-svgswissqrbillsvgswissqrbillelement)
  
      - [SwissQRCode](#class-svgswissqrcode)
  
        - Constructor
          - [new SwissQRCode(data, size)](#function-svgswissqrcodenew-svgswissqrcodedata-size)
  
  - [types](#namespace-types)
  
    - Type aliases
  
      - [Currency](#type-alias-typescurrency)
      - [Size](#type-alias-typessize)
      - [Language](#type-alias-typeslanguage)
      - [FontName](#type-alias-typesfontname)
      - [Data](#interface-typesdata)
      - [Debtor](#interface-typesdebtor)
      - [Creditor](#interface-typescreditor)
      - [QRBillOptions](#interface-typesqrbilloptions)
      - [PDFOptions](#interface-typespdfoptions)
      - [SVGOptions](#interface-typessvgoptions)
  
  - [utils](#namespace-utils)
  
    - Functions
  
      - [isQRIBAN(iban)](#function-utilsutilsisqribaniban)
      - [isIBANValid(iban)](#function-utilsutilsisibanvalidiban)
      - [formatIBAN(iban)](#function-utilsutilsformatibaniban)
      - [isQRReference(reference)](#function-utilsutilsisqrreferencereference)
      - [isQRReferenceValid(reference)](#function-utilsutilsisqrreferencevalidreference)
      - [isSCORReference(reference)](#function-utilsutilsisscorreferencereference)
      - [isSCORReferenceValid(reference)](#function-utilsutilsisscorreferencevalidreference)
      - [calculateSCORReferenceChecksum(reference)](#function-utilsutilscalculatescorreferencechecksumreference)
      - [calculateQRReferenceChecksum(reference)](#function-utilsutilscalculateqrreferencechecksumreference)
      - [formatQRReference(reference)](#function-utilsutilsformatqrreferencereference)
      - [formatSCORReference(reference)](#function-utilsutilsformatscorreferencereference)
      - [formatReference(reference)](#function-utilsutilsformatreferencereference)
      - [formatAmount(amount)](#function-utilsutilsformatamountamount)
      - [mm2pt(millimeters)](#function-utilsutilsmm2ptmillimeters)
      - [pt2mm(points)](#function-utilsutilspt2mmpoints)
      - [mm2px(millimeters)](#function-utilsutilsmm2pxmillimeters)
      - [px2mm(pixels)](#function-utilsutilspx2mmpixels)
      - [getReferenceType(reference)](#function-utilsutilsgetreferencetypereference)
  
  - [errors](#namespace-errors)
  
    - Functions
  
      - [resolveMessageParams(message, params)](#function-errorserrorsresolvemessageparamsmessage-params)
      - [ValidationError](#class-errorsvalidationerror)
  
        - Constructor
          - [new ValidationError(message\[, params\])](#function-errorsvalidationerrornew-errorsvalidationerrormessage-params)
  
      - [ValidationErrors](#enum-errorsvalidationerrors)
  
<br/>
  
## Namespaces
  
### Namespace: pdf
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L2C7)  
  
<br/>
  
#### Class: pdf.SwissQRBill
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L14C0)  
  
##### Description
  
The SwissQRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
using the [`attachTo`](#function-pdfswissqrbillpdfswissqrbillattachtodoc-x-y) method.  
  
<br/>
  
##### Construct Signature
  
###### Function: pdf.SwissQRBill.new pdf.SwissQRBill(data\[, options\])
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L31C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata) The data to be used for the QR Bill.  
- **options** [`PDFOptions`](#interface-typespdfoptions) Options to define how the QR Bill should be rendered. `optional`  
  
###### Return Type
  
[`SwissQRBill`](#class-pdfswissqrbill)  
  
###### Description
  
Creates a new SwissQRBill instance.  
  
<br/>
  
##### Properties
  
###### Property: pdf.SwissQRBill.width
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L114C2)  
  
###### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Description
  
The horizontal size of the QR Bill.  
  
<br/>
  
###### Property: pdf.SwissQRBill.height
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L119C2)  
  
###### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Description
  
The vertical size of the QR Bill.  
  
<br/>
  
##### Methods
  
###### Function: pdf.SwissQRBill.pdf.SwissQRBill.attachTo(doc, x, y)
  
`public`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L69C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDFKit instance  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the QR Bill will be placed. Default: `0`  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the QR Bill will be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
`void`  
  
###### Description
  
Adds the QR Bill to the bottom of the current page if there is enough space,
otherwise it will create a new page for the QR Bill.  
  
<br/>
  
###### Function: pdf.SwissQRBill.pdf.SwissQRBill.isSpaceSufficient(doc, xPosition, yPosition)
  
`public` `static`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L97C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance  
- **xPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position where the QR Bill will be placed.  
- **yPosition** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position where the QR Bill will be placed.  
  
###### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if there is enough space, otherwise `false`  
  
###### Description
  
Checks whether there is enough space on the current page to add the QR Bill.  
  
<br/>
  
#### Class: pdf.SwissQRCode
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L7C0)  
  
<br/>
  
##### Construct Signature
  
###### Function: pdf.SwissQRCode.new pdf.SwissQRCode(data, size)
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L17C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
###### Return Type
  
[`SwissQRCode`](#class-pdfswissqrcode)  
  
###### Description
  
Creates a Swiss QR Code.  
  
<br/>
  
##### Method
  
###### Function: pdf.SwissQRCode.pdf.SwissQRCode.attachTo(doc, x, y)
  
`public`  
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L29C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDF document to attach the Swiss QR Code to.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the Swiss QR Code will be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the Swiss QR Code will be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
`void`  
  
###### Description
  
Attaches the Swiss QR Code to a PDF document.  
  
<br/>
  
#### Interface: pdf.PDFTable
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L1C0)  
  
- **pdf.rows** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table rows.
  
  - [`PDFRow`](#interface-pdfpdfrow)
  
- **pdf.align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the table `optional`
- **pdf.backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the table. `optional`
- **pdf.borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **pdf.borderWidth** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **pdf.fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the table. `optional`
- **pdf.fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the table. `optional`
- **pdf.padding** `union` Cell padding of the table cells. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **pdf.textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside table. `optional`
- **pdf.textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **pdf.verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the table `optional`
- **pdf.width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of whole table. `optional`
  
<br/>
  
#### Interface: pdf.PDFRow
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L29C0)  
  
- **pdf.columns** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table columns.
  
  - [`PDFColumn`](#interface-pdfpdfcolumn)
  
- **pdf.align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the row `optional`
- **pdf.backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the row. `optional`
- **pdf.borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **pdf.borderWidth** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **pdf.fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the row. `optional`
- **pdf.fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the row. `optional`
- **pdf.header** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) A header row gets inserted automatically on new pages. Only one header row is allowed. `optional`
- **pdf.height** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Height of the row. Overrides minHeight and maxHeight `optional`
- **pdf.maxHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Maximum height of the row `optional`
- **pdf.minHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Minimum height of the row `optional`
- **pdf.padding** `union` Cell padding of the table cells inside the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **pdf.textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the row. `optional`
- **pdf.textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **pdf.verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the row `optional`
  
<br/>
  
#### Interface: pdf.PDFColumn
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L62C0)  
  
- **pdf.text** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Cell text.
- **pdf.align** `"center"` | `"left"` | `"right"` Horizontal alignment of the text inside the cell `optional`
- **pdf.backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the cell. `optional`
- **pdf.borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **pdf.borderWidth** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **pdf.fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the cell. `optional`
- **pdf.fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the cell. `optional`
- **pdf.padding** `union` Cell padding of the table cell. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **pdf.textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the cell. `optional`
- **pdf.textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **pdf.verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of the text inside the cell `optional`
- **pdf.width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of the cell. `optional`
  
<br/>
  
#### Class: pdf.Table
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L97C0)  
  
<br/>
  
##### Construct Signature
  
###### Function: pdf.Table.new pdf.Table(data)
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L133C2)  
  
###### Parameter
  
- **data** [`PDFTable`](#interface-pdfpdftable) An Object which contains the table information.  
  
###### Return Type
  
[`Table`](#class-pdftable) The Table instance.  
  
###### Description
  
Inserts a table to the document.  
  
###### Example
  
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
  
<br/>
  
##### Method
  
###### Function: pdf.Table.pdf.Table.attachTo(doc, x, y)
  
`public`  
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L156C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the table be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the table will be placed. Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
`void`  
  
###### Throws
  
- `Error` Throws an error if no table rows are provided.
  
###### Description
  
Attaches the table to a PDFKit document instance.  
  
<br/>
  
### Namespace: svg
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L3C7)  
  
<br/>
  
#### Class: svg.SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L13C0)  
  
<br/>
  
##### Construct Signature
  
###### Function: svg.SwissQRBill.new svg.SwissQRBill(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L24C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata)  
- **options** [`SVGOptions`](#interface-typessvgoptions) `optional`  
  
###### Return Type
  
[`SwissQRBill`](#class-svgswissqrbill)  
  
<br/>
  
##### Property
  
###### Property: svg.SwissQRBill.instance
  
`protected`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L15C2)  
  
###### Type
  
`SVG`  
  
<br/>
  
##### Method
  
###### Function: svg.SwissQRBill.svg.SwissQRBill.toString()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L59C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG as a `string`  
  
###### Description
  
Outputs the SVG as a string.  
  
<br/>
  
##### Getters
  
###### Function: svg.SwissQRBill.svg.SwissQRBill.outerHTML()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L50C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
  
<br/>
  
###### Function: svg.SwissQRBill.svg.SwissQRBill.element()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L69C2)  
  
###### Return Type
  
`SVGElement` The SVG element.  
  
###### Description
  
Returns the SVG element.  
  
<br/>
  
#### Class: svg.SwissQRCode
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L8C0)  
  
<br/>
  
##### Construct Signature
  
###### Function: svg.SwissQRCode.new svg.SwissQRCode(data, size)
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L15C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. Default: `46`  
  
###### Return Type
  
[`SwissQRCode`](#class-svgswissqrcode)  
  
###### Description
  
Creates a Swiss QR Code.  
  
<br/>
  
### Namespace: types
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L4C7)  
  
<br/>
  
#### Type alias: types.Currency
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L2C0)  
  
##### Type
  
`"CHF"` | `"EUR"`  
  
<br/>
  
#### Type alias: types.Size
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L3C0)  
  
##### Type
  
`"A4"` | `"A6"` | `"A6/5"`  
  
<br/>
  
#### Type alias: types.Language
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L4C0)  
  
##### Type
  
`"DE"` | `"EN"` | `"FR"` | `"IT"`  
  
<br/>
  
#### Type alias: types.FontName
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L5C0)  
  
##### Type
  
`"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"`  
  
<br/>
  
#### Interface: types.Data
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L7C0)  
  
- **types.creditor** [`Creditor`](#interface-typescreditor) Creditor related data.
- **types.currency** [`Currency`](#type-alias-typescurrency) The currency to be used. **3 characters.**
- **types.additionalInformation** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Additional information. **Max 140 characters.**
  Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment. `optional`
- **types.amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The amount. **Max. 12 digits.** `optional`
- **types.av1** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf) `optional`
- **types.av2** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf) `optional`
- **types.debtor** [`Debtor`](#interface-typesdebtor) Debtor related data. `optional`
- **types.message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A message. **Max. 140 characters.**
  message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference. `optional`
- **types.reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A reference number. **Max 27 characters.**
  QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
  Creditor Reference (ISO 11649): Maximum 25 characters. `optional`
  
<br/>
  
#### Interface: types.Debtor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L66C0)  
  
- **types.address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **types.city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **types.country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **types.name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **types.zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **types.buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
  
<br/>
  
#### Interface: types.Creditor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L99C0)  
  
- **types.address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**
- **types.city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**
- **types.country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**
- **types.name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**
- **types.zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**
- **types.buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.** `optional`
- **types.account** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN. **21 characters.**
  
<br/>
  
#### Interface: types.QRBillOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L107C0)  
  
- **types.fontName** [`FontName`](#type-alias-typesfontname) Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **types.language** [`Language`](#type-alias-typeslanguage) The language with which the bill is rendered. `optional`
- **types.outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **types.scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
  
<br/>
  
#### Interface: types.PDFOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L137C0)  
  
- **types.fontName** [`FontName`](#type-alias-typesfontname) Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **types.language** [`Language`](#type-alias-typeslanguage) The language with which the bill is rendered. `optional`
- **types.outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **types.scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
- **types.separate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the text `Separate before paying in` `optional`
  
<br/>
  
#### Interface: types.SVGOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L148C0)  
  
- **types.fontName** [`FontName`](#type-alias-typesfontname) Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) `optional`
- **types.language** [`Language`](#type-alias-typeslanguage) The language with which the bill is rendered. `optional`
- **types.outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **types.scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
  
<br/>
  
### Namespace: utils
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L5C7)  
  
<br/>
  
#### Function: utils.utils.isQRIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L6C0)  
  
##### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given IBAN is a QR-IBAN and `false`  
  
##### Description
  
Checks whether the given iban is a QR-IBAN or not.  
  
<br/>
  
#### Function: utils.utils.isIBANValid(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L18C0)  
  
##### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the checksum of the given IBAN is valid and `false`  
  
##### Description
  
Validates the given IBAN.  
  
<br/>
  
#### Function: utils.utils.formatIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L38C0)  
  
##### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted IBAN.  
  
##### Description
  
Formats the given IBAN according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.utils.isQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L52C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a QR-Reference and `false`  
  
##### Description
  
Checks whether the given reference is a QR-Reference or not.  
  
##### Remark
  
The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.  
  
<br/>
  
#### Function: utils.utils.isQRReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L74C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
##### Description
  
Validates the given QR-Reference.  
  
<br/>
  
#### Function: utils.utils.isSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L98C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a SCOR-Reference and `false`  
  
##### Description
  
Checks whether the given reference is a SCOR-Reference or not.  
  
##### Remark
  
The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.  
  
<br/>
  
#### Function: utils.utils.isSCORReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L124C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
##### Description
  
Validates the given SCOR-Reference.  
  
<br/>
  
#### Function: utils.utils.calculateSCORReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L154C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum as 2 digit string.  
  
##### Description
  
Calculates the checksum according to the ISO 11649 standard.  
  
<br/>
  
#### Function: utils.utils.calculateQRReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L166C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The 26 digits long reference (without the checksum) whose checksum should be calculated.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum.  
  
##### Description
  
Calculates the checksum according the specifications.  
  
<br/>
  
#### Function: utils.utils.formatQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L175C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The QR-Reference to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted QR-Reference.  
  
##### Description
  
Formats the given QR-Reference according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.utils.formatSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L195C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The SCOR-Reference to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted SCOR-Reference.  
  
##### Description
  
Formats the given SCOR-Reference according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.utils.formatReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L210C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted reference.  
  
##### Description
  
Detects the type of the given reference and formats it according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.utils.formatAmount(amount)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L230C0)  
  
##### Parameter
  
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) containing the amount to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted amount.  
  
##### Description
  
Formats the given amount according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.utils.mm2pt(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L255C0)  
  
##### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to points.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in points.  
  
##### Description
  
Converts millimeters to points.  
  
<br/>
  
#### Function: utils.utils.pt2mm(points)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L265C0)  
  
##### Parameter
  
- **points** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The points you want to convert to millimeters.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted points in millimeters.  
  
##### Description
  
Converts points to millimeters.  
  
<br/>
  
#### Function: utils.utils.mm2px(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L275C0)  
  
##### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to pixels.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in pixels.  
  
##### Description
  
Converts millimeters to pixels.  
  
<br/>
  
#### Function: utils.utils.px2mm(pixels)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L285C0)  
  
##### Parameter
  
- **pixels** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) containing the pixels you want to convert to millimeters.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted pixels in millimeters.  
  
##### Description
  
Converts pixels to millimeters.  
  
<br/>
  
#### Function: utils.utils.getReferenceType(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L295C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) The reference to get the type of.  
  
##### Return Type
  
`"NON"` | `"QRR"` | `"SCOR"` The type of the given reference.  
  
##### Description
  
Detects the type of the given reference.  
  
<br/>
  
### Namespace: errors
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L6C7)  
  
<br/>
  
#### Function: errors.errors.resolveMessageParams(message, params)
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L13C0)  
  
##### Parameters
  
- **message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
- **params** [`type literal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
  
<br/>
  
#### Class: errors.ValidationError
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L1C0)  
  
<br/>
  
##### Construct Signature
  
###### Function: errors.ValidationError.new errors.ValidationError(message\[, params\])
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L2C2)  
  
###### Parameters
  
- **message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
- **params** [`type literal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) `optional`  
  
###### Return Type
  
[`ValidationError`](#class-errorsvalidationerror)  
  
<br/>
  
#### Enum: errors.ValidationErrors
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L19C0)  
  
- ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING `"If there is no reference, a conventional IBAN must be used."`
- ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR `"QR-IBAN requires the use of a QR-Reference."`
- ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR `"QR-Reference requires the use of a QR-IBAN."`
- ACCOUNT_LENGTH_IS_INVALID `"The provided IBAN number '{iban}' is either too long or too short."`
- ADDITIONAL_INFORMATION_LENGTH_IS_INVALID `"Additional information must be a maximum of 140 characters."`
- ADDITIONAL_INFORMATION_TYPE_IS_INVALID `"Additional information must be a string."`
- ALTERNATIVE_SCHEME_LENGTH_IS_INVALID `"{scheme} must be a maximum of 100 characters."`
- ALTERNATIVE_SCHEME_TYPE_IS_INVALID `"{scheme} must be a string."`
- AMOUNT_LENGTH_IS_INVALID `"Amount must be a maximum of 12 digits."`
- AMOUNT_TYPE_IS_INVALID `"Amount must be a number."`
- CREDITOR_ACCOUNT_COUNTRY_IS_INVALID `"Only CH and LI IBAN numbers are allowed."`
- CREDITOR_ACCOUNT_IS_INVALID `"The provided IBAN number '{iban}' is not valid."`
- CREDITOR_ACCOUNT_IS_UNDEFINED `"Creditor account cannot be undefined."`
- CREDITOR_ADDRESS_IS_UNDEFINED `"Creditor address cannot be undefined."`
- CREDITOR_ADDRESS_LENGTH_IS_INVALID `"Creditor address must be a maximum of 70 characters."`
- CREDITOR_ADDRESS_TYPE_IS_INVALID `"Creditor address TYPE must be a string."`
- CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID `"Creditor buildingNumber must be a maximum of 16 characters."`
- CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID `"Creditor buildingNumber must be either a string or a number."`
- CREDITOR_CITY_IS_UNDEFINED `"Creditor city cannot be undefined."`
- CREDITOR_CITY_LENGTH_IS_INVALID `"Creditor city must be a maximum of 35 characters."`
- CREDITOR_CITY_TYPE_IS_INVALID `"Creditor city must be a string."`
- CREDITOR_COUNTRY_IS_UNDEFINED `"Creditor country cannot be undefined."`
- CREDITOR_COUNTRY_LENGTH_IS_INVALID `"Creditor country must be 2 characters."`
- CREDITOR_COUNTRY_TYPE_IS_INVALID `"Creditor country must be a string."`
- CREDITOR_IS_UNDEFINED `"Creditor cannot be undefined."`
- CREDITOR_NAME_IS_UNDEFINED `"Creditor name cannot be undefined."`
- CREDITOR_NAME_LENGTH_IS_INVALID `"Creditor name must be a maximum of 70 characters."`
- CREDITOR_NAME_TYPE_IS_INVALID `"Creditor name must be a string."`
- CREDITOR_ZIP_IS_UNDEFINED `"Creditor zip cannot be undefined."`
- CREDITOR_ZIP_LENGTH_IS_INVALID `"Creditor zip must be a maximum of 16 characters."`
- CREDITOR_ZIP_TYPE_IS_INVALID `"Creditor zip must be either a string or a number."`
- CURRENCY_IS_UNDEFINED `"Currency cannot be undefined."`
- CURRENCY_LENGTH_IS_INVALID `"Currency must be a length of 3 characters."`
- CURRENCY_STRING_IS_INVALID `"Currency must be either 'CHF' or 'EUR'"`
- CURRENCY_TYPE_IS_INVALID `"Currency must be a string."`
- DEBTOR_ADDRESS_IS_UNDEFINED `"Debtor address cannot be undefined."`
- DEBTOR_ADDRESS_LENGTH_IS_INVALID `"Debtor address must be a maximum of 70 characters."`
- DEBTOR_ADDRESS_TYPE_IS_INVALID `"Debtor address TYPE must be a string."`
- DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID `"Debtor buildingNumber must be a maximum of 16 characters."`
- DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID `"Debtor buildingNumber must be either a string or a number."`
- DEBTOR_CITY_IS_UNDEFINED `"Debtor city cannot be undefined."`
- DEBTOR_CITY_LENGTH_IS_INVALID `"Debtor city must be a maximum of 35 characters."`
- DEBTOR_CITY_TYPE_IS_INVALID `"Debtor city must be a string."`
- DEBTOR_COUNTRY_IS_UNDEFINED `"Debtor country cannot be undefined."`
- DEBTOR_COUNTRY_LENGTH_IS_INVALID `"Debtor country must be 2 characters."`
- DEBTOR_COUNTRY_TYPE_IS_INVALID `"Debtor country must be a string."`
- DEBTOR_IS_UNDEFINED `"Debtor cannot be undefined."`
- DEBTOR_NAME_IS_UNDEFINED `"Debtor name cannot be undefined."`
- DEBTOR_NAME_LENGTH_IS_INVALID `"Debtor name must be a maximum of 70 characters."`
- DEBTOR_NAME_TYPE_IS_INVALID `"Debtor name must be a string."`
- DEBTOR_ZIP_IS_UNDEFINED `"Debtor zip cannot be undefined."`
- DEBTOR_ZIP_LENGTH_IS_INVALID `"Debtor zip must be a maximum of 16 characters."`
- DEBTOR_ZIP_TYPE_IS_INVALID `"Debtor zip must be either a string or a number."`
- MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID `"Message and additionalInformation combined must be a maximum of 140 characters."`
- MESSAGE_LENGTH_IS_INVALID `"Message must be a maximum of 140 characters."`
- MESSAGE_TYPE_IS_INVALID `"Message must be a string."`
- QR_REFERENCE_IS_INVALID `"The provided QR-Reference '{reference}' is not valid."`
- QR_REFERENCE_LENGTH_IS_INVALID `"QR-Reference must be a must be exactly 27 characters."`
- REFERENCE_TYPE_IS_INVALID `"Reference must be a string."`
- REGULAR_REFERENCE_LENGTH_IS_INVALID `"Creditor reference must be a maximum of 25 characters."`
