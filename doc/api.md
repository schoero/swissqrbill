# API documentation

## Contents

- Constructor
  - [SwissQRBill.PDF(data, outputPath[, options] [, callback])](#swissqrbillpdfdata-outputpath-options--callback)
  - [SwissQRBill.PDF(data, writeableStream[, options] [, callback])](#swissqrbillpdfdata-writeablestream-options--callback)
- Methods
  - [addPage(options)](#addpageoptions)
  - [addQRBill()](#addqrbill)
  - [mmToPoints(mm)](#mmtopointsmm)
  - [addTable(table)](#addtabletable)
  - [blobStream()](#blobStream)
- Events
  - [finish](#event-finish)
  - [pageAdded](#event-pageadded)
  - [beforeEnd](#event-beforeEnd)

- BlobStream
  - [toBlob(type)](#toblobtype)
  - [toBlobURL(type)](#tobloburltype)

<br/>

## Constructor

### SwissQRBill.PDF(data, outputPath[, options] [, callback])
### SwissQRBill.PDF(data, writeableStream[, options] [, callback])

 - [**data**](#data) - `object` containing all relevant billing data, *mandatory*.
 - **outputPath | writeableStream** - `string` output path for the generated PDF file or `writeableStream` a writeableStream to stream data into. *mandatory*.
 - [**options**](#options) - `object` containing settings, *optional*.
 - **callback** - `function` that gets called right after the pdf has been created, *optional*.

> **Note:** The outputPath option is only available in Node.js.

> **Note:** The creation of the PDF file is not synchronous. You can take advantage of the callback function that gets called when the PDF is ready to interact with the created PDF file.

#### data

  The data object is constructed in the following way:

  - **currency** `string: "CHF" | "EUR"` *mandatory*, 3 characters.
  - **amount** - `number` *optional*, max. 12 digits.
  - **reference** - `string` *optional*, max 27 characters.
    > QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
      Creditor Reference (ISO 11649): Maximum 25 characters.
  - **message** - `string` *optional*, max. 140 characters.
    > message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference.
  - **additionalInformation** - `string` *optional*, max. 140 characters.
    > Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment.
  - **av1** - `string` *optional*, max. 100 characters.
    > Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
  - **av2** - `string` *optional*, max. 100 characters.
    > Parameter character chain of the alternative scheme according to the syntax definition in the [“Alternative scheme” section](https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-en.pdf)
  - **creditor** *mandatory*
    - **name** - `string` *mandatory*, max. 70 characters.
      > First name + last name or company name.
    - **account** - `string` *mandatory*, 21 characters.
    - **address** - `string` *mandatory*, max 70 characters.
    - **housenumber** - `string | number` *optional*, max 16 characters.
    - **zip** - `number` *mandatory*, max 16 characters.
    - **city** - `string` *mandatory*, max 35 characters.
    - **country** - `string` *mandatory*, 2 characters.
  - **debtor** *optional*
    - **name** - `string` *mandatory*, max. 70 characters.
      > First name + last name or company name.
    - **address** - `string` *mandatory*, max 70 characters.
    - **housenumber** - `string | number` *optional*, max 16 characters.
    - **zip** - `number` *mandatory*, max 16 characters.
    - **city** - `string` *mandatory*, max 35 characters.
    - **country** - `string` *mandatory*, 2 characters.


#### options

  Available options: 

   - **language** - `string: "DE" | "EN" | "IT" | "FR"`. *default* `"DE"`.
   - **size** - `string: "A4" | "A6/5"`. *default* `"A6/5"`.
   - **scissors** - `boolean`: *default* `true`.
     > Whether you want to show the scissors icons or the text `Separate before paying in`.
   - **autoGenerate** - `boolean`: *default* `true`.
     > Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit.

<br/>


```js
const data = {
  currency: "CHF",
  amount: 1199.95,
  reference: "210000000003139471430009017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac",
    houseNumber: "1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debtor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse",
    houseNumber: 28,
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};
```

<br/>

## Methods

### addPage(options)
 - options - `object` containing [PDFKit document options.](https://pdfkit.org/docs/getting_started.html#adding_pages)  
Adds a new page to the PDF.
This method is basically the same as the original [PDFKit `addPage()` method](https://pdfkit.org/docs/getting_started.html#adding_pages).  
However the default values are changed to use the default page size provided in the constructor options.


### addQRBill()
Adds the QR Bill to the bottom of the current page if there is enough space, otherwise it will be added as a standalone A6/5 page.
> **Note:** This function is automatically called when the option autoGenerate is set to true.

### mmToPoints(mm)
 - mm - `number` containg the millimeters you want to convert to points.  
 Converts milimeters to points. This method can be used to simplify positioning while you create your own layout using PDFKit.  
 Returns a `number` containing the converted millimeters in points.

### addTable(table)
 - table - `object` containing the table information.

 Inserts a table to the document

 #### table

  The table object is constructed in the following way:

  - **width** `number` width of whole table *optional*<br/>
  - **x** `number` horizontal start position of the table *optional*<br/>
  - **y** `number` vertical start position of the table *optional*<br/>
  - **padding** `number | [top: number, right: number, bottom: number, left: number]` cell padding of the table cells *optional*<br/>
  - **lineWidth** `number` width of the border lines *optional*<br/>
  - **font** `string` font of the text inside the table *optional*<br/>
  - **fontSize** `number` font size of the text inside the table *optional*<br/>
  - **rows** `array` of rows *mandatory*
    - **header** `boolean` A header row gets inserted automatically on new pages. Only one header row is allowed. *optional*<br/>
    - **fillColor** `string` background color of the row *optional*<br/>
    - **strokeColor** `string` border color of the row *optional*<br/>
    - **padding** `number | [top: number, right: number, bottom: number, left: number]` cell padding of the table cells inside the row *optional*<br/>
    - **height** `height` height of the row *optional*<br/>
    - **font** `string` font of the text inside the row *optional*<br/>
    - **fontSize** `number` font size of the text inside the row *optional*<br/>
    - **columns** `array` of columns *mandatory*<br/>
      - **text** `string | number | boolean` cell text *mandatory*<br/>
      - **width** `number` width of the cell *optional*<br/>
      - **fillColor** `string` background color of the cell *optional*<br/>
      - **strokeColor** `string` border color of the cell *optional*<br/>
      - **padding** `number | [top: number, right: number, bottom: number, left: number]` cell padding of the table cell *optional*<br/>
      - **font** `string` font of the text inside the cell *optional*<br/>
      - **fontSize** `number` font size of the text inside the cell *optional*<br/>
      - **textOptions** `object` same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling) *optional*<br/>

```js
const table = {
  rows: [
    {
      fillColor: "#ECF0F1",
      columns: [
        {
          text: "Row 1 cell 1",
        }, {
          text: "Row 1 cell 2",
        }, {
          text: "Row 1 cell 3"
        }
      ]
    }, {
      columns: [
        {
          text: "Row 2 cell 1",
        }, {
          text: "Row 2 cell 2",
        }, {
          text: "Row 2 cell 3"
        }
      ]
    }
  ]
};
```

### blobStream()
 Creates a new writeableStream which streams the generated pdf into a [HTML5 Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
 Returns a [BlobStream](#BlobStream-1) instance.
> **Warning:** This method does only exist when executed inside a browser

<br/>

## Events

### Event: "finish"
The finish event is emitted when the file has finished writing. 
You have to wait until the file has finished writing before you are able to interact with the genereated file.

### Event: "pageAdded"
The pageAdded event is emitted every time a page is added.
This can be useful to add a header or footer to the pages as described [here](https://pdfkit.org/docs/getting_started.html#adding_pages).

### Event: "beforeEnd"
The beforeEnd event is emitted right before the file gets finalized.
This could be used to add page numbers to the pages as described [here](http://pdfkit.org/docs/getting_started.html#switching_to_previous_pages).


<br/>

## BlobStream

### toBlob(type)
 - type - `string` [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) of the streamed data, for example `"application/pdf"`.

 Returns a [HTML5 Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
> **Warning:** This method does only exist when executed inside a browser

### toBlobURL(type)
 - type - `string` [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) of the streamed data, for example `"application/pdf"`.

 Returns an url with the [HTML5 Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
> **Warning:** This method does only exist when executed inside a browser
