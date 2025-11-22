  
# Index
  
- Namespaces
  
  - [pdf](#namespace-pdf)
  
    - Classes
  
      - [SwissQRBill](#class-pdfswissqrbill)
  
        - Constructor
          - [new SwissQRBill(data\[, options\])](#constructor-new-pdfswissqrbilldata-options)
        - Properties
          - [width](#property-pdfswissqrbillwidth)
          - [height](#property-pdfswissqrbillheight)
        - Methods
          - [attachTo(doc\[, x\]\[, y\])](#method-pdfswissqrbillattachtodoc-x-y)
          - [isSpaceSufficient(doc\[, x\]\[, y\])](#method-pdfswissqrbillisspacesufficientdoc-x-y)
  
      - [SwissQRCode](#class-pdfswissqrcode)
  
        - Constructor
          - [new SwissQRCode(data\[, size\])](#constructor-new-pdfswissqrcodedata-size)
        - Method
          - [attachTo(doc\[, x\]\[, y\])](#method-pdfswissqrcodeattachtodoc-x-y)
  
      - [Table](#class-pdftable)
  
        - Constructor
          - [new Table(data)](#constructor-new-pdftabledata)
        - Method
          - [attachTo(doc\[, x\]\[, y\])](#method-pdftableattachtodoc-x-y)
  
      - [PDFBorderColor](#type-alias-pdfpdfbordercolor)
      - [PDFBorderWidth](#type-alias-pdfpdfborderwidth)
      - [PDFPadding](#type-alias-pdfpdfpadding)
      - [PDFTable](#interface-pdfpdftable)
      - [PDFRow](#interface-pdfpdfrow)
      - [PDFColumn](#interface-pdfpdfcolumn)
  
  - [svg](#namespace-svg)
  
    - Classes
  
      - [SwissQRBill](#class-svgswissqrbill)
  
        - Constructor
          - [new SwissQRBill(data\[, options\])](#constructor-new-svgswissqrbilldata-options)
        - Property
          - [instance](#property-svgswissqrbillinstance)
        - Method
          - [toString()](#method-svgswissqrbilltostring)
        - Getter
          - [element()](#getter-svgswissqrbillelement)
  
      - [SwissQRCode](#class-svgswissqrcode)
  
        - Constructor
          - [new SwissQRCode(data\[, size\])](#constructor-new-svgswissqrcodedata-size)
        - Property
          - [instance](#property-svgswissqrcodeinstance)
        - Method
          - [toString()](#method-svgswissqrcodetostring)
        - Getter
          - [element()](#getter-svgswissqrcodeelement)
  
  - [types](#namespace-types)
  
    - Type aliases
  
      - [Language](#type-alias-typeslanguage)
      - [FontName](#type-alias-typesfontname)
      - [Currency](#type-alias-typescurrency)
      - [Data](#interface-typesdata)
      - [Debtor](#interface-typesdebtor)
      - [Creditor](#interface-typescreditor)
      - [PDFOptions](#interface-typespdfoptions)
      - [SVGOptions](#interface-typessvgoptions)
  
  - [utils](#namespace-utils)
  
    - Functions
  
      - [isQRIBAN(iban)](#function-utilsisqribaniban)
      - [isIBANValid(iban)](#function-utilsisibanvalidiban)
      - [formatIBAN(iban)](#function-utilsformatibaniban)
      - [isQRReference(reference)](#function-utilsisqrreferencereference)
      - [isQRReferenceValid(reference)](#function-utilsisqrreferencevalidreference)
      - [isSCORReference(reference)](#function-utilsisscorreferencereference)
      - [isSCORReferenceValid(reference)](#function-utilsisscorreferencevalidreference)
      - [calculateSCORReferenceChecksum(reference)](#function-utilscalculatescorreferencechecksumreference)
      - [calculateQRReferenceChecksum(reference)](#function-utilscalculateqrreferencechecksumreference)
      - [formatQRReference(reference)](#function-utilsformatqrreferencereference)
      - [formatSCORReference(reference)](#function-utilsformatscorreferencereference)
      - [formatReference(reference)](#function-utilsformatreferencereference)
      - [formatAmount(amount)](#function-utilsformatamountamount)
      - [mm2pt(millimeters)](#function-utilsmm2ptmillimeters)
      - [pt2mm(points)](#function-utilspt2mmpoints)
      - [mm2px(millimeters)](#function-utilsmm2pxmillimeters)
      - [px2mm(pixels)](#function-utilspx2mmpixels)
      - [getReferenceType(reference)](#function-utilsgetreferencetypereference)
  
  - [errors](#namespace-errors)
  
    - Classes
  
      - [ValidationError](#class-errorsvalidationerror)
  
        - Property
          - [code](#property-errorsvalidationerrorcode)
  
      - [ValidationErrors](#enum-errorsvalidationerrors)
  
<br/>
  
## Namespaces
  
### Namespace: pdf
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L2C7)  
  
<br/>
  
#### Class: pdf.SwissQRBill
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L51C0)  
  
##### Description
  
The SwissQRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
using the [`attachTo`](#method-pdfswissqrbillattachtodoc-x-y) method.  
  
##### Example
  
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

const pdf = new PDFDocument({ autoFirstPage: false });
const qrBill = new SwissQRBill(data);

const stream = createWriteStream("qr-bill.pdf");

qrBill.attachTo(pdf);
pdf.pipe(stream);
pdf.end();
```
  
<br/>
  
##### Constructor: new pdf.SwissQRBill(data\[, options\])
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L70C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata) The data to be used for the QR Bill.  
- **options** [`PDFOptions`](#interface-typespdfoptions) Options to define how the QR Bill should be rendered. `optional`  
  
###### Return Type
  
[`SwissQRBill`](#class-pdfswissqrbill)  
  
###### Throws
  
- [`ValidationError`](#class-errorsvalidationerror) Throws an error if the data is invalid.
  
###### Description
  
Creates a new SwissQRBill instance.  
  
<br/>
  
##### Property: pdf.SwissQRBill.width
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L153C2)  
  
###### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Description
  
The horizontal size of the QR Bill.  
  
<br/>
  
##### Property: pdf.SwissQRBill.height
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L158C2)  
  
###### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Description
  
The vertical size of the QR Bill.  
  
<br/>
  
##### Method: pdf.SwissQRBill.attachTo(doc\[, x\]\[, y\])
  
`public`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L107C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDFKit instance.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the QR Bill will be placed. `optional` Default: `0`  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the QR Bill will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
`void`  
  
###### Description
  
Attaches the QR-Bill to a PDFKit document instance. It will create a new page with the size of the QR-Slip if not
enough space is left on the current page.  
  
<br/>
  
##### Method: pdf.SwissQRBill.isSpaceSufficient(doc\[, x\]\[, y\])
  
`public` `static`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L136C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position where the QR Bill will be placed. `optional` Default: `0`  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position where the QR Bill will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if there is enough space, otherwise `false`  
  
###### Description
  
Checks whether there is enough space on the current page to add the QR Bill.  
  
<br/>
  
#### Class: pdf.SwissQRCode
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L11C0)  
  
<br/>
  
##### Constructor: new pdf.SwissQRCode(data\[, size\])
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L23C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. `optional` Default: `46`  
  
###### Return Type
  
[`SwissQRCode`](#class-pdfswissqrcode)  
  
###### Throws
  
- [`ValidationError`](#class-errorsvalidationerror) Throws an error if the data is invalid.
  
###### Description
  
Creates a Swiss QR Code.  
  
<br/>
  
##### Method: pdf.SwissQRCode.attachTo(doc\[, x\]\[, y\])
  
`public`  
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L37C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDF document to attach the Swiss QR Code to.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the Swiss QR Code will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the Swiss QR Code will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
`void`  
  
###### Description
  
Attaches the Swiss QR Code to a PDF document.  
  
<br/>
  
#### Class: pdf.Table
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L157C0)  
  
##### Description
  
The Table class is used to create tables for PDFKit documents. A table can be attached to any PDFKit document instance
using the [`attachTo`](#method-pdftableattachtodoc-x-y) method.  
  
##### Example
  
```ts
const tableData = {
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
const pdf = new PDFDocument();
const table = new Table(tableData);

const stream = createWriteStream("table.pdf");

table.attachTo(pdf);
pdf.pipe(stream);
pdf.end();
```
  
<br/>
  
##### Constructor: new pdf.Table(data)
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L165C2)  
  
###### Parameter
  
- **data** [`PDFTable`](#interface-pdfpdftable) The rows and columns for the table.  
  
###### Return Type
  
[`Table`](#class-pdftable) The Table instance.  
  
###### Description
  
Creates a new Table instance.  
  
<br/>
  
##### Method: pdf.Table.attachTo(doc\[, x\]\[, y\])
  
`public`  
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L190C2)  
  
###### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the table be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the table will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
###### Return Type
  
`void`  
  
###### Throws
  
- `Error` Throws an error if no table rows are provided.
  
###### Description
  
Attaches the table to a PDFKit document instance beginning on the current page. It will create a new page with for
every row that no longer fits on a page.  
  
<br/>
  
#### Type alias: pdf.PDFBorderColor
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L90C0)  
  
##### Type
  
`union`  
  
- [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- `tuple`
  
  - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- `tuple`
  
  - vertical [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - horizontal [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
##### Description
  
Can be used to set the color of the border of a table, row or column.  
  
<br/>
  
#### Type alias: pdf.PDFBorderWidth
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L96C0)  
  
##### Type
  
`union`  
  
- [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- `tuple`
  
  - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- `tuple`
  
  - vertical [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - horizontal [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
##### Description
  
Can be used to set the width of the border of a table, row or column.  
  
<br/>
  
#### Type alias: pdf.PDFPadding
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L102C0)  
  
##### Type
  
`union`  
  
- [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- `tuple`
  
  - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- `tuple`
  
  - vertical [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - horizontal [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
##### Description
  
Can be used to set the padding of a table cell.  
  
<br/>
  
#### Interface: pdf.PDFTable
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L1C0)  
  
- **pdf.rows** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table rows.
  
  - [`PDFRow`](#interface-pdfpdfrow)
  
- **pdf.align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the table. `optional`
- **pdf.backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the table. `optional`
- **pdf.borderColor** [`PDFBorderColor`](#type-alias-pdfpdfbordercolor) The colors of the border. `optional`
- **pdf.borderWidth** [`PDFBorderWidth`](#type-alias-pdfpdfborderwidth) Width of the borders of the row. `optional`
- **pdf.fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the table. `optional`
- **pdf.fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the table. `optional`
- **pdf.padding** [`PDFPadding`](#type-alias-pdfpdfpadding) Cell padding of the table cells. `optional`
- **pdf.textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside table. `optional`
- **pdf.textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **pdf.verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the table. `optional`
- **pdf.width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of whole table. `optional`
  
<br/>
  
#### Interface: pdf.PDFRow
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L29C0)  
  
- **pdf.columns** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table columns.
  
  - [`PDFColumn`](#interface-pdfpdfcolumn)
  
- **pdf.align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the row. `optional`
- **pdf.backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the row. `optional`
- **pdf.borderColor** [`PDFBorderColor`](#type-alias-pdfpdfbordercolor) The colors of the border. `optional`
- **pdf.borderWidth** [`PDFBorderWidth`](#type-alias-pdfpdfborderwidth) Width of the borders of the row. `optional`
- **pdf.fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the row. `optional`
- **pdf.fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the row. `optional`
- **pdf.header** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) A header row gets inserted automatically on new pages. Only one header row is allowed. `optional`
- **pdf.height** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Height of the row. Overrides minHeight and maxHeight. `optional`
- **pdf.maxHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Maximum height of the row. `optional`
- **pdf.minHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Minimum height of the row. `optional`
- **pdf.padding** [`PDFPadding`](#type-alias-pdfpdfpadding) Cell padding of the table cells inside the row. `optional`
- **pdf.textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the row. `optional`
- **pdf.textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **pdf.verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the row. `optional`
  
<br/>
  
#### Interface: pdf.PDFColumn
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L62C0)  
  
- **pdf.text** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Cell text.
- **pdf.align** `"center"` | `"left"` | `"right"` Horizontal alignment of the text inside the cell. `optional`
- **pdf.backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the cell. `optional`
- **pdf.borderColor** [`PDFBorderColor`](#type-alias-pdfpdfbordercolor) The colors of the border. `optional`
- **pdf.borderWidth** [`PDFBorderWidth`](#type-alias-pdfpdfborderwidth) Width of the borders of the row. `optional`
- **pdf.fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the cell. `optional`
- **pdf.fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the cell. `optional`
- **pdf.padding** [`PDFPadding`](#type-alias-pdfpdfpadding) Cell padding of the table cell. `optional`
- **pdf.textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the cell. `optional`
- **pdf.textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **pdf.verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of the text inside the cell. `optional`
- **pdf.width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of the cell. `optional`
  
<br/>
  
### Namespace: svg
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L3C7)  
  
<br/>
  
#### Class: svg.SwissQRBill
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L45C0)  
  
##### Description
  
The SwissQRBill class creates the Payment Part with the QR Code as an SVG.  
  
##### Example
  
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
  
##### Constructor: new svg.SwissQRBill(data\[, options\])
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L56C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata)  
- **options** [`SVGOptions`](#interface-typessvgoptions) `optional`  
  
###### Return Type
  
[`SwissQRBill`](#class-svgswissqrbill)  
  
<br/>
  
##### Property: svg.SwissQRBill.instance
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L47C2)  
  
###### Type
  
`SVG`  
  
<br/>
  
##### Method: svg.SwissQRBill.toString()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L87C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG.  
  
###### Description
  
Outputs the SVG as a string.  
  
<br/>
  
##### Getter: svg.SwissQRBill.element()
  
`public`  
  
Defined in: [src/svg/swissqrbill.ts](../../src/svg/swissqrbill.ts#L97C2)  
  
###### Return Type
  
`SVGElement` The SVG element.  
  
###### Description
  
Returns the SVG element.  
  
<br/>
  
#### Class: svg.SwissQRCode
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L10C0)  
  
<br/>
  
##### Constructor: new svg.SwissQRCode(data\[, size\])
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L21C2)  
  
###### Parameters
  
- **data** [`Data`](#interface-typesdata) The data to be encoded in the QR code.  
- **size** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The size of the QR code in mm. `optional` Default: `46`  
  
###### Return Type
  
[`SwissQRCode`](#class-svgswissqrcode)  
  
###### Throws
  
- [`ValidationError`](#class-errorsvalidationerror) Throws an error if the data is invalid.
  
###### Description
  
Creates a Swiss QR Code.  
  
<br/>
  
##### Property: svg.SwissQRCode.instance
  
`public`  
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L12C2)  
  
###### Type
  
`SVG`  
  
<br/>
  
##### Method: svg.SwissQRCode.toString()
  
`public`  
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L58C2)  
  
###### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The outerHTML of the SVG element.  
  
###### Description
  
Outputs the SVG as a string.  
  
<br/>
  
##### Getter: svg.SwissQRCode.element()
  
`public`  
  
Defined in: [src/svg/swissqrcode.ts](../../src/svg/swissqrcode.ts#L68C2)  
  
###### Return Type
  
`SVGElement` The SVG element.  
  
###### Description
  
Returns the SVG element.  
  
<br/>
  
### Namespace: types
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L4C7)  
  
<br/>
  
#### Type alias: types.Language
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L159C0)  
  
##### Type
  
`"DE"` | `"EN"` | `"FR"` | `"IT"`  
  
<br/>
  
#### Type alias: types.FontName
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L160C0)  
  
##### Type
  
`"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"`  
  
<br/>
  
#### Type alias: types.Currency
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L161C0)  
  
##### Type
  
`"CHF"` | `"EUR"`  
  
<br/>
  
#### Interface: types.Data
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L1C0)  
  
- **types.creditor** [`Creditor`](#interface-typescreditor) Creditor related data.
- **types.currency** `"CHF"` | `"EUR"` The currency to be used. **3 characters.**.
- **types.additionalInformation** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Additional information. **Max 140 characters.**.
  
  Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment. `optional`
- **types.amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The amount. **Max. 12 digits.**. `optional`
- **types.av1** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**.
  
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf). `optional`
- **types.av2** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Alternative scheme. **Max. 100 characters.**.
  
  Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf). `optional`
- **types.debtor** [`Debtor`](#interface-typesdebtor) Debtor related data. `optional`
- **types.message** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A message. **Max. 140 characters.**.
  
  Message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference. `optional`
- **types.reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) A reference number. **Max 27 characters.**.
  
  QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
  Creditor Reference (ISO 11649): Maximum 25 characters. `optional`
  
<br/>
  
#### Interface: types.Debtor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L60C0)  
  
- **types.address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**.
- **types.city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**.
- **types.country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**.
- **types.name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**.
- **types.zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**.
- **types.buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.**. `optional`
  
<br/>
  
#### Interface: types.Creditor
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L93C0)  
  
- **types.address** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Address. **Max 70 characters.**.
- **types.city** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) City. **Max 35 characters.**.
- **types.country** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Country code. **2 characters.**.
- **types.name** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Name. **Max. 70 characters.**.
- **types.zip** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Postal code. **Max 16 characters.**.
- **types.buildingNumber** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Building number. **Max 16 characters.**. `optional`
- **types.account** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN. **21 characters.**.
  
<br/>
  
#### Interface: types.PDFOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L143C0)  
  
- **types.fontName** `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"` Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) . `optional`
  
  *Example:*
  
  ```ts
  // Register the font
  pdf.registerFont("Liberation-Sans", "path/to/LiberationSans-Regular.ttf");
  pdf.registerFont("Liberation-Sans-Bold", "path/to/LiberationSans-Bold.ttf");
  const qrBill = new SwissQRBill(data, { fontName: "Liberation-Sans" });
  ```
  
- **types.language** `"DE"` | `"EN"` | `"FR"` | `"IT"` The language with which the bill is rendered. `optional`
- **types.outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **types.scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
- **types.separate** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the text `Separate before paying in` `optional`
  
<br/>
  
#### Interface: types.SVGOptions
  
Defined in: [src/shared/types.ts](../../src/shared/types.ts#L155C0)  
  
- **types.fontName** `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"` Font used for the QR-Bill.
  Fonts other than Helvetica must be registered in the PDFKit document.  [http://pdfkit.org/docs/text.html#fonts](http://pdfkit.org/docs/text.html#fonts) . `optional`
  
  *Example:*
  
  ```ts
  // Register the font
  pdf.registerFont("Liberation-Sans", "path/to/LiberationSans-Regular.ttf");
  pdf.registerFont("Liberation-Sans-Bold", "path/to/LiberationSans-Bold.ttf");
  const qrBill = new SwissQRBill(data, { fontName: "Liberation-Sans" });
  ```
  
- **types.language** `"DE"` | `"EN"` | `"FR"` | `"IT"` The language with which the bill is rendered. `optional`
- **types.outlines** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want render the outlines. This option may be disabled if you use perforated paper. `optional`
- **types.scissors** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) Whether you want to show the scissors icons or the text `Separate before paying in` `optional`
  
<br/>
  
### Namespace: utils
  
Defined in: [src/bundle/index.ts](../../src/bundle/index.ts#L5C7)  
  
<br/>
  
#### Function: utils.isQRIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L7C0)  
  
##### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given IBAN is a QR-IBAN and `false`  
  
##### Description
  
Checks whether the given iban is a QR-IBAN or not.  
  
<br/>
  
#### Function: utils.isIBANValid(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L20C0)  
  
##### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the checksum of the given IBAN is valid and `false`  
  
##### Description
  
Validates the given IBAN.  
  
<br/>
  
#### Function: utils.formatIBAN(iban)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L41C0)  
  
##### Parameter
  
- **iban** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The IBAN to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted IBAN.  
  
##### Description
  
Formats the given IBAN according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.isQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L56C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a QR-Reference and `false`  
  
##### Description
  
Checks whether the given reference is a QR-Reference or not.  
  
##### Remark
  
The QR-Reference is a 27 digits long string containing only digits. The last digit is the checksum.  
  
<br/>
  
#### Function: utils.isQRReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L79C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
##### Description
  
Validates the given QR-Reference.  
  
<br/>
  
#### Function: utils.isSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L104C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The Reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is a SCOR-Reference and `false`  
  
##### Description
  
Checks whether the given reference is a SCOR-Reference or not.  
  
##### Remark
  
The SCOR-Reference is an alphanumeric string beginning with 'RF' and containing a 2 digit checksum and a max 21 digits long reference.  
  
<br/>
  
#### Function: utils.isSCORReferenceValid(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L131C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be checked.  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if the given reference is valid and `false`  
  
##### Description
  
Validates the given SCOR-Reference.  
  
<br/>
  
#### Function: utils.calculateSCORReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L162C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The max 21 digits long reference (without the "RF" and the 2 digit checksum) whose checksum should be calculated.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum as 2 digit string.  
  
##### Description
  
Calculates the checksum according to the ISO 11649 standard.  
  
<br/>
  
#### Function: utils.calculateQRReferenceChecksum(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L175C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The 26 digits long reference (without the checksum) whose checksum should be calculated.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The calculated checksum.  
  
##### Description
  
Calculates the checksum according the specifications.  
  
<br/>
  
#### Function: utils.formatQRReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L185C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The QR-Reference to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted QR-Reference.  
  
##### Description
  
Formats the given QR-Reference according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.formatSCORReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L206C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The SCOR-Reference to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted SCOR-Reference.  
  
##### Description
  
Formats the given SCOR-Reference according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.formatReference(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L222C0)  
  
##### Parameter
  
- **reference** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The reference to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted reference.  
  
##### Description
  
Detects the type of the given reference and formats it according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.formatAmount(amount)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L243C0)  
  
##### Parameter
  
- **amount** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Containing the amount to be formatted.  
  
##### Return Type
  
[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) The formatted amount.  
  
##### Description
  
Formats the given amount according the specifications to be easily readable.  
  
<br/>
  
#### Function: utils.mm2pt(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L269C0)  
  
##### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to points.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in points.  
  
##### Description
  
Converts millimeters to points.  
  
<br/>
  
#### Function: utils.pt2mm(points)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L280C0)  
  
##### Parameter
  
- **points** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The points you want to convert to millimeters.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted points in millimeters.  
  
##### Description
  
Converts points to millimeters.  
  
<br/>
  
#### Function: utils.mm2px(millimeters)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L291C0)  
  
##### Parameter
  
- **millimeters** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The millimeters you want to convert to pixels.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted millimeters in pixels.  
  
##### Description
  
Converts millimeters to pixels.  
  
<br/>
  
#### Function: utils.px2mm(pixels)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L302C0)  
  
##### Parameter
  
- **pixels** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Containing the pixels you want to convert to millimeters.  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The converted pixels in millimeters.  
  
##### Description
  
Converts pixels to millimeters.  
  
<br/>
  
#### Function: utils.getReferenceType(reference)
  
Defined in: [src/shared/utils.ts](../../src/shared/utils.ts#L313C0)  
  
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
  
#### Class: errors.ValidationError
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L2C0)  
  
##### Description
  
A [`ValidationError`](#class-errorsvalidationerror) is thrown when the data provided to swissqrbill is invalid.  
  
<br/>
  
##### Property: errors.ValidationError.code
  
`public`  
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L5C2)  
  
###### Type
  
`union`  
  
- `"ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_MISSING"`
- `"ACCOUNT_IS_QR_IBAN_BUT_REFERENCE_IS_REGULAR"`
- `"ACCOUNT_IS_REGULAR_IBAN_BUT_REFERENCE_IS_QR"`
- `"ACCOUNT_LENGTH_IS_INVALID"`
- `"ADDITIONAL_INFORMATION_LENGTH_IS_INVALID"`
- `"ADDITIONAL_INFORMATION_TYPE_IS_INVALID"`
- `"ALTERNATIVE_SCHEME_LENGTH_IS_INVALID"`
- `"ALTERNATIVE_SCHEME_TYPE_IS_INVALID"`
- `"AMOUNT_LENGTH_IS_INVALID"`
- `"AMOUNT_TYPE_IS_INVALID"`
- `"CREDITOR_ACCOUNT_COUNTRY_IS_INVALID"`
- `"CREDITOR_ACCOUNT_IS_INVALID"`
- `"CREDITOR_ACCOUNT_IS_UNDEFINED"`
- `"CREDITOR_ADDRESS_IS_UNDEFINED"`
- `"CREDITOR_ADDRESS_LENGTH_IS_INVALID"`
- `"CREDITOR_ADDRESS_TYPE_IS_INVALID"`
- `"CREDITOR_BUILDING_NUMBER_LENGTH_IS_INVALID"`
- `"CREDITOR_BUILDING_NUMBER_TYPE_IS_INVALID"`
- `"CREDITOR_CITY_IS_UNDEFINED"`
- `"CREDITOR_CITY_LENGTH_IS_INVALID"`
- `"CREDITOR_CITY_TYPE_IS_INVALID"`
- `"CREDITOR_COUNTRY_IS_UNDEFINED"`
- `"CREDITOR_COUNTRY_LENGTH_IS_INVALID"`
- `"CREDITOR_COUNTRY_TYPE_IS_INVALID"`
- `"CREDITOR_IS_UNDEFINED"`
- `"CREDITOR_NAME_IS_UNDEFINED"`
- `"CREDITOR_NAME_LENGTH_IS_INVALID"`
- `"CREDITOR_NAME_TYPE_IS_INVALID"`
- `"CREDITOR_ZIP_IS_UNDEFINED"`
- `"CREDITOR_ZIP_LENGTH_IS_INVALID"`
- `"CREDITOR_ZIP_TYPE_IS_INVALID"`
- `"CURRENCY_IS_UNDEFINED"`
- `"CURRENCY_LENGTH_IS_INVALID"`
- `"CURRENCY_STRING_IS_INVALID"`
- `"CURRENCY_TYPE_IS_INVALID"`
- `"DEBTOR_ADDRESS_IS_UNDEFINED"`
- `"DEBTOR_ADDRESS_LENGTH_IS_INVALID"`
- `"DEBTOR_ADDRESS_TYPE_IS_INVALID"`
- `"DEBTOR_BUILDING_NUMBER_LENGTH_IS_INVALID"`
- `"DEBTOR_BUILDING_NUMBER_TYPE_IS_INVALID"`
- `"DEBTOR_CITY_IS_UNDEFINED"`
- `"DEBTOR_CITY_LENGTH_IS_INVALID"`
- `"DEBTOR_CITY_TYPE_IS_INVALID"`
- `"DEBTOR_COUNTRY_IS_UNDEFINED"`
- `"DEBTOR_COUNTRY_LENGTH_IS_INVALID"`
- `"DEBTOR_COUNTRY_TYPE_IS_INVALID"`
- `"DEBTOR_IS_UNDEFINED"`
- `"DEBTOR_NAME_IS_UNDEFINED"`
- `"DEBTOR_NAME_LENGTH_IS_INVALID"`
- `"DEBTOR_NAME_TYPE_IS_INVALID"`
- `"DEBTOR_ZIP_IS_UNDEFINED"`
- `"DEBTOR_ZIP_LENGTH_IS_INVALID"`
- `"DEBTOR_ZIP_TYPE_IS_INVALID"`
- `"MESSAGE_AND_ADDITIONAL_INFORMATION_LENGTH_IS_INVALID"`
- `"MESSAGE_LENGTH_IS_INVALID"`
- `"MESSAGE_TYPE_IS_INVALID"`
- `"QR_REFERENCE_IS_INVALID"`
- `"QR_REFERENCE_LENGTH_IS_INVALID"`
- `"REFERENCE_TYPE_IS_INVALID"`
- `"REGULAR_REFERENCE_LENGTH_IS_INVALID"`
  
###### Description
  
A stable error code that can be used to identify the error programmatically.  
  
<br/>
  
#### Enum: errors.ValidationErrors
  
Defined in: [src/shared/errors.ts](../../src/shared/errors.ts#L37C0)  
  
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
