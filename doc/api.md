## API documentation

### Methods

- Constructor
  - [SwissQRBill.PDF(data, outputPath[, options])](#swissqrbillpdfdata-outputpath-options)
- Methods
  - [addPage()](#addpage)
  - [end()](#end)
  - [addQRBill()](#addqrbill)
  - [mmToPoints(mm)](#mmtopointsmm)
- Properties
  - [document](#document)

---

### SwissQRBill.PDF(data, outputPath[, options])

 - [**data**](#data) - `object` containing all relevant billing data, *mandatory*.
 - **outputPath** - `string` output path for the generated PDF file, *mandatory*.
 - [**options**](#options) - `object` containing settings, *optional*.


Returns a new instance of SwissQRBill.PDF


#### data

  The data object is constructed in the following way:

  - **currency** `string: "CHF | "EUR"` *mandatory*, 3 characters.
  - **amount** - `number` *optional*, max. 12 digits.
  - **reference** - `string` *optional*, max 27 characters.
    > QR-IBAN: Maximum 27 characters. Must be filled if a QR-IBAN is used.
      Creditor Reference (ISO 11649): Maximum 25 characters.
  - **message** - `string` *optional*
    > message can be used to indicate the payment purpose or for additional textual information about payments with a structured reference.
  - **additionalInformation** - `string` *optional*
    > Bill information contain coded information for automated booking of the payment. The data is not forwarded with the payment.
  - **av1** - `string` *optional*
  - **av2** - `string` *optional*
  - **creditor** *mandatory*
    - **name** - `string` *mandatory*, max. 70 characters.
      > First name (*optional*, sending is recommended, if available) + last name or company name.
    - **account** - `string` *mandatory*, 21 characters.
    - **address** - `string` *mandatory*, max 70 characters.
    - **housenumber** - `string` *optional*, max 16 characters.
    - **zip** - `number` *mandatory*, max 16 characters.
    - **city** - `string` *mandatory*, max 35 characters.
    - **country** - `string` *mandatory*, 2 characters.
  - **debitor** *optional*
    - **name** - `string` *mandatory*, max. 70 characters.
      > First name (*optional*, sending is recommended, if available) + last name or company name.
    - **address** - `string` *mandatory*, max 70 characters.
    - **housenumber** - `string` *optional*, max 16 characters.
    - **zip** - `number` *mandatory*, max 16 characters.
    - **city** - `string` *mandatory*, max 35 characters.
    - **country** - `string` *mandatory*, 2 characters.


#### options

  Available options: 

   - **language** - `string "DE" | "EN" | "IT" | "FR"`. *default* `"DE"`.
   - **size** - `string "A4" | "A6/5"`. *default* `"A6/5"`.
   - **scissors** - `boolean`: *default* `true`.
     > Whether you want to show the scissor icons or the text `Separate before paying in`.
   - **autoGenerate** - `boolean`: *default* `true`.
     > Whether you want to automatically finalize the PDF. When set to false you are able to add your own content to the PDF using PDFKit.


### addPage()
Adds a new page to the PDF.

### end()
Finalizes the PDF document, after this command you are no longer able to edit the PDF.
> Note: This function is automatically called when the option autoGenerate is set to true.

### addQRBill()
Adds the QR Bill to the bottom of the current page.
> Note: This function is automatically called when the option autoGenerate is set to true.

### mmToPoints(mm)
 - mm - `number` containg the millimeters you want to convert to points.

 Converts milimeters to points. This method can be used to simplify positioning while you create your own layout using PDFKit.
 
 Returns a `number` containing the converted millimeters in points.