  
# Table
  
- Classes
  
  - [Table](#table-1)
  
    - Constructor
  
      - [constructor(data)](#constructordata)
  
    - Method
  
      - [attachTo(doc)](#attachtodoc)
  
- Interfaces
  
  - [PDFTable](#pdftable)
  - [PDFRow](#pdfrow)
  - [PDFColumn](#pdfcolumn)
  
## Classes
  
### Table
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L100C0)  
  
#### Construct Signature
  
---
  
##### constructor(data)
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L136C2)  
  
###### Parameter
  
- **data** [`PDFTable`](#pdftable) An Object which contains the table information.  
  
##### Return Type
  
[`Table`](#table-1) The Table instance.  
  
##### Description
  
Inserts a table to the document.  
  
##### Example
  
```ts
const table = {
  rows: [
    {
      columns: [
        {
          text: "Row 1 cell 1"
        }, {
          text: "Row 1 cell 2"
        }, {
          text: "Row 1 cell 3"
        }
      ],
      backgroundColor: "#ECF0F1"
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
  
### Method
  
---
  
#### attachTo(doc)
  
`public`  
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L158C2)  
  
##### Parameter
  
- **doc** `PDFDocument` The PDFKit document instance  
  
##### Return Type
  
[`Table`](#table-1) The Table instance.  
  
##### Throws
  
- `Error` Throws an error if no table rows are provided.
  
##### Description
  
Attaches the table to a PDFKit document instance.  
  
# Interfaces
  
## PDFTable
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L1C0)  
  
- **rows** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table rows.
  
  - [`PDFRow`](#pdfrow)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the table `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the table. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the table. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the table. `optional`
- **padding** `union` Cell padding of the table cells. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside table. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the table `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of whole table. `optional`
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Horizontal start position of the table. `optional`
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Vertical start position of the table. `optional`
  
## PDFRow
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L32C0)  
  
- **columns** [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) Table columns.
  
  - [`PDFColumn`](#pdfcolumn)
  
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of texts inside the row `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the row. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the row. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the row. `optional`
- **header** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) A header row gets inserted automatically on new pages. Only one header row is allowed. `optional`
- **height** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Height of the row. Overrides minHeight and maxHeight `optional`
- **maxHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Maximum height of the row `optional`
- **minHeight** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Minimum height of the row `optional`
- **padding** `union` Cell padding of the table cells inside the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the row. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of texts inside the row `optional`
  
## PDFColumn
  
Defined in: [src/pdf/table.ts](../../src/pdf/table.ts#L65C0)  
  
- **text** [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Cell text.
- **align** `"center"` | `"left"` | `"right"` Horizontal alignment of the text inside the cell `optional`
- **backgroundColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Background color of the cell. `optional`
- **border** `union` Width of the borders of the row. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **borderColor** `union` The colors of the border `optional`
  
  - [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - `tuple`
  
    - top [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - right [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - bottom [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - left [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  
- **font** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Font of the text inside the cell. `optional`
- **fontSize** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Font size of the text inside the cell. `optional`
- **padding** `union` Cell padding of the table cell. `optional`
  
  - [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - `tuple`
  
    - top [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - right [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - bottom [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
    - left [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
- **textColor** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) Text color of texts inside the cell. `optional`
- **textOptions** `TextOptions` Same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling). `optional`
- **verticalAlign** `"bottom"` | `"center"` | `"top"` Vertical alignment of the text inside the cell `optional`
- **width** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Width of the cell. `optional`
