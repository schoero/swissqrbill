# Migration guide from v3 to v4

## Introduction

With version 4 of SwissQRBill, the API has been completely reworked. The main goal was to make the API more flexible and reduce the complexity of the library.

In previous versions, SwissQRBill extended PDFKit and add a few methods to create the QR slip. While this approach made it really easy to create a QR Bill, it limited the flexibility of PDFKit and introduced a lot of complexity to the library.

With the new API, you can now create an independent QR Slip and attach it to any existing PDFKit document. This removes all the limitations of previous versions and opens up a lot of new possibilities. However, this approach passes some of the complexity to the user, that was previously handled by the library.

In version 4, the library contains the following parts

- PDF
  - SwissQRBill class to create a QR Slip as a PDF
  - Table class to create a table
- SVG
  - SVG class to create a QR Slip as SVG
- Utils
  - Utility functions

## Breaking changes

Lots of the API has changed. The following list contains the most important changes.

- The entrypoints have changed. Previously the library exported a "barrel file" that contained all the classes. Now the library exports the classes directly.
  - `swissqrbill/pdf`
  - `swissqrbill/table`
  - `swissqrbill/svg`
  - `swissqrbill/utils`
  - `swissqrbill/types`
  - `swissqrbill/errors`
- The table method is now it's own class and has been completely rewritten. As a part of the rewrite, some properties have been renamed. Check the [updated documentation](./table/table.md) for the new names.
- Events are removed from SwissQRBill

## Migration

### Importing the library

Depending on how you imported the library, you might need to change the import statement.

#### Node.js and self bundling (webpack)

If you used SwissQRBill on the backend, or you have bundled it yourself, you now have to import PDFKit and SwissQRBill separately.

```ts
// SwissQRBill <= v3
import { PDF } from "swissqrbill";
```

```ts
// SwissQRBill >= v4
import PDFDocument from "pdfkit";
import { SwissQRBill } from "swissqrbill/pdf";
import { Table } from "swissqrbill/table";
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
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/swissqrbill@4.0.0-alpha.4/lib/pdf/swissqrbill.js"></script>
```

### PDFKit events

SwissQRBill previously emitted events that could be used to add page numbers to the document. Since the library no longer extends PDFKit, this is no longer possible. You now have to follow the [documentation of PDFKit](http://pdfkit.org/docs/getting_started.html#switching_to_previous_pages)
