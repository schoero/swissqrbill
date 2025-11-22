  
# Index
  
- Classes
  
  - [SwissQRBill](#class-swissqrbill)
  
    - Constructor
      - [new SwissQRBill(data\[, options\])](#constructor-new-swissqrbilldata-options)
    - Properties
      - [width](#property-swissqrbillwidth)
      - [height](#property-swissqrbillheight)
    - Methods
      - [attachTo(doc\[, x\]\[, y\])](#method-swissqrbillattachtodoc-x-y)
      - [isSpaceSufficient(doc\[, x\]\[, y\])](#method-swissqrbillisspacesufficientdoc-x-y)
  
  - [SwissQRCode](#class-swissqrcode)
  
    - Constructor
      - [new SwissQRCode(data\[, size\])](#constructor-new-swissqrcodedata-size)
    - Method
      - [attachTo(doc\[, x\]\[, y\])](#method-swissqrcodeattachtodoc-x-y)
  
  - [Table](#class-table)
  
    - Constructor
      - [new Table(data)](#constructor-new-tabledata)
    - Method
      - [attachTo(doc\[, x\]\[, y\])](#method-tableattachtodoc-x-y)
  
  - [PDFBorderColor](#type-alias-pdfbordercolor)
  - [PDFBorderWidth](#type-alias-pdfborderwidth)
  - [PDFPadding](#type-alias-pdfpadding)
  - [PDFTable](#interface-pdftable)
  - [PDFRow](#interface-pdfrow)
  - [PDFColumn](#interface-pdfcolumn)
  
<br/>
  
## Classes
  
### Class: SwissQRBill
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L51C0)  
  
#### Description
  
The SwissQRBill class creates the Payment Part with the QR Code. It can be attached to any PDFKit document instance
using the [`attachTo`](#method-swissqrbillattachtodoc-x-y) method.  
  
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

const pdf = new PDFDocument({ autoFirstPage: false });
const qrBill = new SwissQRBill(data);

const stream = createWriteStream("qr-bill.pdf");

qrBill.attachTo(pdf);
pdf.pipe(stream);
pdf.end();
```
  
<br/>
  
#### Constructor: new SwissQRBill(data\[, options\])
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L70C2)  
  
##### Parameters
  
- **data** [`Data`](./types.md#interface-data) The data to be used for the QR Bill.  
- **options** [`PDFOptions`](./types.md#interface-pdfoptions) Options to define how the QR Bill should be rendered. `optional`  
  
##### Return Type
  
[`SwissQRBill`](#class-swissqrbill)  
  
##### Throws
  
- `ValidationError` Throws an error if the data is invalid.
  
##### Description
  
Creates a new SwissQRBill instance.  
  
<br/>
  
#### Property: SwissQRBill.width
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L153C2)  
  
##### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Description
  
The horizontal size of the QR Bill.  
  
<br/>
  
#### Property: SwissQRBill.height
  
`public` `static` `readonly`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L158C2)  
  
##### Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Description
  
The vertical size of the QR Bill.  
  
<br/>
  
#### Method: SwissQRBill.attachTo(doc\[, x\]\[, y\])
  
`public`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L107C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit instance.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the QR Bill will be placed. `optional` Default: `0`  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the QR Bill will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Return Type
  
`void`  
  
##### Description
  
Attaches the QR-Bill to a PDFKit document instance. It will create a new page with the size of the QR-Slip if not
enough space is left on the current page.  
  
<br/>
  
#### Method: SwissQRBill.isSpaceSufficient(doc\[, x\]\[, y\])
  
`public` `static`  
  
Defined in: [src/pdf/swissqrbill.ts](../../src/pdf/swissqrbill.ts#L136C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position where the QR Bill will be placed. `optional` Default: `0`  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position where the QR Bill will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Return Type
  
[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) `true` if there is enough space, otherwise `false`  
  
##### Description
  
Checks whether there is enough space on the current page to add the QR Bill.  
  
<br/>
  
### Class: SwissQRCode
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L11C0)  
  
<br/>
  
#### Constructor: new SwissQRCode(data\[, size\])
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L23C2)  
  
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
  
#### Method: SwissQRCode.attachTo(doc\[, x\]\[, y\])
  
`public`  
  
Defined in: [src/pdf/swissqrcode.ts](../../src/pdf/swissqrcode.ts#L37C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDF document to attach the Swiss QR Code to.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the Swiss QR Code will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the Swiss QR Code will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Return Type
  
`void`  
  
##### Description
  
Attaches the Swiss QR Code to a PDF document.  
  
<br/>
  
### Class: Table
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L157C0)  
  
#### Description
  
The Table class is used to create tables for PDFKit documents. A table can be attached to any PDFKit document instance
using the [`attachTo`](#method-tableattachtodoc-x-y) method.  
  
#### Example
  
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
  
#### Constructor: new Table(data)
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L165C2)  
  
##### Parameter
  
- **data** [`PDFTable`](#interface-pdftable) The rows and columns for the table.  
  
##### Return Type
  
[`Table`](#class-table) The Table instance.  
  
##### Description
  
Creates a new Table instance.  
  
<br/>
  
#### Method: Table.attachTo(doc\[, x\]\[, y\])
  
`public`  
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L190C2)  
  
##### Parameters
  
- **doc** `PDFDocument` The PDFKit document instance.  
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The horizontal position in points where the table be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) The vertical position in points where the table will be placed. `optional` Default: [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  
  
##### Return Type
  
`void`  
  
##### Throws
  
- `Error` Throws an error if no table rows are provided.
  
##### Description
  
Attaches the table to a PDFKit document instance beginning on the current page. It will create a new page with for
every row that no longer fits on a page.  
  
<br/>
  
### Type alias: PDFBorderColor
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L90C0)  
  
#### Type
  
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
  
#### Description
  
Can be used to set the color of the border of a table, row or column.  
  
<br/>
  
### Type alias: PDFBorderWidth
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L96C0)  
  
#### Type
  
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
  
#### Description
  
Can be used to set the width of the border of a table, row or column.  
  
<br/>
  
### Type alias: PDFPadding
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L102C0)  
  
#### Type
  
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
  
#### Description
  
Can be used to set the padding of a table cell.  
  
<br/>
  
### Interface: PDFTable
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L1C0)  
  
- **rows** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table rows.
  
  - [`PDFRow`](#interface-pdfrow)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the table. `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the table. `optional`
- **borderColor** [`PDFBorderColor`](#type-alias-pdfbordercolor) The colors of the border. `optional`
- **borderWidth** [`PDFBorderWidth`](#type-alias-pdfborderwidth) Width of the borders of the row. `optional`
- **fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the table. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the table. `optional`
- **padding** [`PDFPadding`](#type-alias-pdfpadding) Cell padding of the table cells. `optional`
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside table. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the table. `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of whole table. `optional`
  
<br/>
  
### Interface: PDFRow
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L29C0)  
  
- **columns** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table columns.
  
  - [`PDFColumn`](#interface-pdfcolumn)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the row. `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the row. `optional`
- **borderColor** [`PDFBorderColor`](#type-alias-pdfbordercolor) The colors of the border. `optional`
- **borderWidth** [`PDFBorderWidth`](#type-alias-pdfborderwidth) Width of the borders of the row. `optional`
- **fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the row. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the row. `optional`
- **header** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) A header row gets inserted automatically on new pages. Only one header row is allowed. `optional`
- **height** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Height of the row. Overrides minHeight and maxHeight. `optional`
- **maxHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Maximum height of the row. `optional`
- **minHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Minimum height of the row. `optional`
- **padding** [`PDFPadding`](#type-alias-pdfpadding) Cell padding of the table cells inside the row. `optional`
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the row. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the row. `optional`
  
<br/>
  
### Interface: PDFColumn
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L62C0)  
  
- **text** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Cell text.
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of the text inside the cell. `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the cell. `optional`
- **borderColor** [`PDFBorderColor`](#type-alias-pdfbordercolor) The colors of the border. `optional`
- **borderWidth** [`PDFBorderWidth`](#type-alias-pdfborderwidth) Width of the borders of the row. `optional`
- **fontName** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the cell. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the cell. `optional`
- **padding** [`PDFPadding`](#type-alias-pdfpadding) Cell padding of the table cell. `optional`
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the cell. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of the text inside the cell. `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of the cell. `optional`
