# Migration guide from v3 to v4

## Introduction

With version 4 of SwissQRBill, the API has been completely reworked. The main goal was to make the API more flexible and reduce the complexity of the library.

In previous versions, SwissQRBill extended PDFKit and added a few methods to create the QR slip. While this approach made it really easy to create a QR Bill, it limited the flexibility of PDFKit and introduced a lot of complexity to the library.

With the new API, you can now create an independent QR Slip and attach it to any existing PDFKit document. This removes all the limitations of previous versions and opens up a lot of new possibilities. However, this approach passes some of the complexity to the user, that was previously handled by the library.

In version 4, the library contains the following parts

- PDF
  - SwissQRBill class to create a QR Slip to attach to an existing PDFKit document
  - SwissQRCode class to create the standalone Swiss QR Code to attach to an existing PDFKit document
  - Table class to create a table to attach to an existing PDFKit document
- SVG
  - SwissQRBill class to create a QR Slip as a SVG
  - SwissQRCode class to create the standalone Swiss QR Code as a SVG
- Utils
  - Utility functions
- Types
  - Typescript types
- Errors
  - Errors thrown by the library
- Bundle
  - Pre built bundle of the library containing all the parts

## Breaking changes

Lots of the API has changed. The following list contains the most important changes.

- The entrypoints have changed. Previously the library exported a "barrel file" that contained all the classes. Now the library exports the classes separately.
  - `swissqrbill/pdf`
  - `swissqrbill/svg`
  - `swissqrbill/utils`
  - `swissqrbill/types`
  - `swissqrbill/errors`
  - `swissqrbill/bundle`
- SwissQRBill no longer extends PDFKit. Instead, it is now a standalone class that can be used to create a QR Slip. The QR Slip can then be attached to any existing PDFKit document.
- The table method is now it's own class and has been completely rewritten. As a part of the rewrite, some properties have been renamed. Check the [updated documentation](./pdf/index.md#table) for the new names. The Table class can now also be attached to any existing PDFKit document.
- Events have been removed from SwissQRBill.

## Migration

### Importing the library

Depending on how you imported the library, you might need to change the import statement.

Please read the new [importing documentation](./importing.md) for more information and examples on how to import the library now.

#### Node.js and self bundling (webpack)

If you used SwissQRBill on the backend, or you have bundled it yourself, you now have to import PDFKit and SwissQRBill separately.

```ts
// SwissQRBill <= v3
import { PDF } from "swissqrbill";
```

```ts
// SwissQRBill >= v4
import PDFDocument from "pdfkit";
import { SwissQRBill, Table } from "swissqrbill/pdf";
```

#### Pre built bundle

If you previously used the pre built bundle, provided by SwissQRBill, you now have to switch to the pre built bundle of PDFKit instead and import SwissQRBill separately.

```html
<!-- SwissQRBill <= v3 -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/swissqrbill/lib/browser/bundle/index.js"></script>
```

```html
<!-- SwissQRBill >= v4 -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pdfkit@0/js/pdfkit.standalone.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/blob-stream@0.1.3/+esm"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/swissqrbill@beta/lib/pdf/swissqrbill.js"></script>
```

### Standalone classes

Since SwissQRBill is now a standalone class, you have to create the PDFDocument separately from the QR slip.
You can then attach the QR slip to the document using the [`attachTo()`](./pdf/index.md#attachtodoc-xposition-yposition) method.

```ts
const pdf = new PDFDocument();
const qrBill = new SwissQRBill({ /* ... */ });
qrBill.attachTo(pdf);
```

The same applies to the new Table class.

```ts
const pdf = new PDFDocument();
const table = new Table({ /* ... */ });
table.attachTo(pdf);
```

### PDFKit events

SwissQRBill previously emitted events that could be used to add page numbers to the document. Since the library no longer extends PDFKit, this is no longer possible. You now have to follow the [documentation of PDFKit](http://pdfkit.org/docs/getting_started.html#switching_to_previous_pages) to learn how to add page numbers to your document.

### Renamed properties and options

Some properties and options have been renamed. Many properties of the [Table class](./pdf/index.md#table) have been renamed to be more consistent with the rest of the library. Please check out the [new documentation](./pdf/index.md#table) for the new names.
