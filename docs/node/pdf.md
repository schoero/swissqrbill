  
# Pdf
  
- Class
  
  - [PDF](#pdf)
  
    - Constructors
  
      - [constructor(data, outputPath\[, callback\])](#constructordata-outputpath-callback)
      - [constructor(data, writableStream\[, callback\])](#constructordata-writablestream-callback)
      - [constructor(data, outputPath\[, options\]\[, callback\])](#constructordata-outputpath-options-callback)
      - [constructor(data, writableStream\[, options\]\[, callback\])](#constructordata-writablestream-options-callback)
  
    - Properties
  
      - [size](#size)
      - [_data](#_data)
  
    - Methods
  
      - [addPage(\[options\])](#addpageoptions)
      - [end()](#end)
      - [addQRBill(size)](#addqrbillsize)
      - [switchToPage(n)](#switchtopagen)
      - [addTable(table)](#addtabletable)
      - [addPath(path, x, y)](#addpathpath-x-y)
  
    - Getter
  
      - [currentPage()](#currentpage)
  
    - Events
  
      - [finish](#finish)
      - [pageAdded](#pageadded)
      - [beforeEnd](#beforeend)
  
## Class
  
### PDF
  
Defined in: [node/pdf.ts](../node/pdf.ts#L10C0)  
  
#### Construct Signatures
  
---
  
##### constructor(data, outputPath\[, callback\])
  
Defined in: [node/pdf.ts](../node/pdf.ts#L12C2)  
  
###### Parameters
  
- **data** [Data](./types.md#data)
- **outputPath** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **callback** Function `optional`
  
##### Return Type
  
[PDF](#pdf)
  
---
  
#### constructor(data, writableStream\[, callback\])
  
Defined in: [node/pdf.ts](../node/pdf.ts#L13C2)  
  
##### Parameters
  
- **data** [Data](./types.md#data)
- **writableStream** Writable
- **callback** Function `optional`
  
##### Return Type
  
[PDF](#pdf)
  
---
  
#### constructor(data, outputPath\[, options\]\[, callback\])
  
Defined in: [node/pdf.ts](../node/pdf.ts#L14C2)  
  
##### Parameters
  
- **data** [Data](./types.md#data)
- **outputPath** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **options** [PDFOptions](./types.md#pdfoptions) `optional`
- **callback** Function `optional`
  
##### Return Type
  
[PDF](#pdf)
  
---
  
#### constructor(data, writableStream\[, options\]\[, callback\])
  
Defined in: [node/pdf.ts](../node/pdf.ts#L15C2)  
  
##### Parameters
  
- **data** [Data](./types.md#data)
- **writableStream** Writable
- **options** [PDFOptions](./types.md#pdfoptions) `optional`
- **callback** Function `optional`
  
##### Return Type
  
[PDF](#pdf)
  
### Properties
  
#### size
  
`public`  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L13C2)  
  
##### Type
  
[Size](./types.md#size)  
  
#### _data
  
`protected`  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L15C2)  
  
##### Type
  
[Data](./types.md#data)  
  
### Methods
  
---
  
#### addPage(\[options\])
  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L105C2)  
`public`   `override`  
  
##### Parameter
  
- **options** PDFDocumentOptions - An object containing [PDFKit document options.](https://pdfkit.org/docs/getting_started.html#adding_pages) `optional`
  
##### Return Type
  
PDFDocument `this`
  
##### Description
  
Adds a new page to the PDF. This method is basically the same as the original \[PDFKit `addPage()`  
  
---
  
#### end()
  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L120C2)  
`public`   `override`  
  
##### Return Type
  
`void`
  
---
  
#### addQRBill(size)
  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L130C2)  
`public`  
  
##### Parameter
  
- **size** [Size](./types.md#size) - The size of the new page if not enough space is left for the QR slip. Default: `"A6"`
  
##### Return Type
  
`void`
  
##### Description
  
Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.  
  
---
  
#### switchToPage(n)
  
Defined in: [src/pdf/extended-pdf.ts](../../src/pdf/extended-pdf.ts#L116C2)  
`public`   `override`  
  
##### Parameter
  
- **n** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
##### Return Type
  
PDFPage
  
---
  
#### addTable(table)
  
Defined in: [src/pdf/extended-pdf.ts](../../src/pdf/extended-pdf.ts#L158C2)  
`public`  
  
##### Parameter
  
- **table** [PDFTable](./types.md#pdftable) - An Object which contains the table information.
  
##### Return Type
  
PDFDocument `this`
  
##### Throws
  
- Error - Throws an error if no table rows are provided.
  
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
      fillColor: "#ECF0F1"
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
  
---
  
#### addPath(path, x, y)
  
Defined in: [src/pdf/extended-pdf.ts](../../src/pdf/extended-pdf.ts#L494C2)  
`public`  
  
##### Parameters
  
- **path** [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - The path data to insert. This is the same as the `d`
- **x** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) - The x position where the path should be inserted.
- **y** [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) - The y position where the path should be inserted.
  
##### Return Type
  
PDFDocument `this`
  
##### Description
  
Adds a path to the document on the given position.  
  
### Getter
  
---
  
#### currentPage()
  
Defined in: [src/pdf/extended-pdf.ts](../../src/pdf/extended-pdf.ts#L111C2)  
`public`  
  
##### Return Type
  
[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  
### Events
  
#### finish
  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L28C2)  
  
##### Description
  
The finish event is emitted when the file has finished writing. You have to wait until the file has finished writing before you are able to interact with the generated file.  
  
#### pageAdded
  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L34C2)  
  
##### Description
  
The pageAdded event is emitted every time a page is added. This can be useful to add a header or footer to the pages as described in the [PDFKit documentation](https://pdfkit.org/docs/getting_started.html#adding_pages).  
  
#### beforeEnd
  
Defined in: [src/pdf/pdf.ts](../../src/pdf/pdf.ts#L40C2)  
  
##### Description
  
The beforeEnd event is emitted right before the file gets finalized. This could be used to add page numbers to the pages as described in the [PDFKit documentation](http://pdfkit.org/docs/getting_started.html#switching_to_previous_pages)  
