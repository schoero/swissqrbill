# API documentation

## Contents

- Constructor
  - [SwissQRBill.PDF(data, outputPath[, options])](#swissqrbillpdfdata-outputpath-options)
- Methods
  - [addPage()](#addpage)
  - [end()](#end)
  - [addQRBill()](#addqrbill)
  - [mmToPoints(mm)](#mmtopointsmm)

<br/>

## Constructor

### SwissQRBill.PDF(data, outputPath[, options])

 - [**data**](#data) - `object` containing all relevant billing data, *mandatory*.
 - **outputPath** - `string` output path for the generated PDF file, *mandatory*.
 - [**options**](#options) - `object` containing settings, *optional*.


#### data

  The data object is constructed in the following way:

  - **currency** `string: "CHF | "EUR"` *mandatory*, 3 characters.
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
  - **debitor** *optional*
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
     > Whether you want to show the scissor icons or the text `Separate before paying in`.
   - **autoGenerate** - `boolean`: *default* `true`.
     > Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit.

<br/>


```js
const SwissQRBill = require("swissqrbill");

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
  debitor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse",
    houseNumber: 28,
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};

const pdf = new SwissQRBill.PDF(data, "qrbill.pdf");
```

<br/>

## Methods

### addPage()
Adds a new page to the PDF.

### end()
Finalizes the PDF document, after this command you are no longer able to edit the PDF.
> Note: This function is automatically called when the option autoGenerate is set to true.

### addQRBill()
Adds the QR Bill to the bottom of the current page if there is enough space, otherwise it will be added as a standalone A6/5 page.
> Note: This function is automatically called when the option autoGenerate is set to true.

### mmToPoints(mm)
 - mm - `number` containg the millimeters you want to convert to points.  
 Converts milimeters to points. This method can be used to simplify positioning while you create your own layout using PDFKit.  
 Returns a `number` containing the converted millimeters in points.

### addTable(table)
 - table - `object` containing the table information.

 Inserts a table 

 #### table

  The table object is constructed in the following way:

  - **width** `number` width of whole table *optional*<br/>
  - **x** `number` horizontal start position of the table *optional*<br/>
  - **y** `number` vertical start position of the table *optional*<br/>
  - **padding** `number` cell padding of the table cells *optional*<br/>
  - **lineWidth** `number` width of the border lines *optional*<br/>
  - **font** `string` font of the text inside the table *optional*<br/>
  - **fontSize** `number` font size of the text inside the table *optional*<br/>
  - **rows** `array` of rows *mandatory*
    - **fillColor** `string` background color of the row *optional*<br/>
    - **strokeColor** `string` border color of the row *optional*<br/>
    - **height** `height` height of the row *optional*<br/>
    - **font** `string` font of the text inside the row *optional*<br/>
    - **fontSize** `number` font size of the text inside the row *optional*<br/>
    - **columns** `array` of columns *mandatory*<br/>
      - **text** `string | number | boolean` cell text *mandatory*<br/>
      - **width** `number` width of the cell *optional*<br/>
      - **fillColor** `string` background color of the cell *optional*<br/>
      - **strokeColor** `string` border color of the cell *optional*<br/>
      - **font** `string` font of the text inside the cell *optional*<br/>
      - **fontSize** `number` font size of the text inside the cell *optional*<br/>
      - **textOptions** `object` same as text [PDFKit text options](http://pdfkit.org/docs/text.html#text_styling) *optional*<br/>
