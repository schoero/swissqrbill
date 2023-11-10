
# Change Log

# [v4.0.0](https://github.com/schoero/swissqrbill/compare/v3.2.2...v4.0.0) - 10.11.2023

With version 4, SwissQRBill has been completely reworked. The main goal was to make the API more flexible and reduce the complexity of the library. As a consequence, the API has changed quite significantly. However, migration should be fairly easy.  

Please read the [migration guide](docs/migration-v3-to-v4.md) for more information and have a look at the updated [documentation](docs).

* New features
  * SwissQRBill can now be attached to any PDFDocument instance from PDFKit.
  * New SwissQRCode class to create the standalone Swiss QR Code to attach to an existing PDFKit document.
  * New Table class to create a table to attach to an existing PDFKit document.
  * It is now possible to change the font of the QR Bill. The allowed fonts are `"Arial"` | `"Frutiger"` | `"Helvetica"` | `"Liberation Sans"`
  * Additional options for SVG renderings.

* Breaking changes
  * The entrypoints have changed. Please read the [importing documentation](docs/importing.md) for more information.
  * SwissQRBill no longer extends PDFKit.
  * The table method has been extracted into it's own class.
  * Events have been removed from SwissQRBill.
  * Properties and options have been renamed.
  * Now requires Node.js >= 18.0.0

* Fixes
  * Some slight rendering improvements.

* Other improvements
  * Better examples. The examples are now automatically hosted on StackBlitz. Everyone can now easily try out the library in the browser without having to install anything.
  * Automated documentation. SwissQRBill now uses [unwritten](https://github.com/schoero/unwritten) to automatically generate the documentation. This makes it easier to keep the documentation up to date.
  * Automated testing for even more stability.

Thanks to [@danielpanero](https://github.com/danielpanero) and [@skch-17](https://github.com/skch-17) for their contributions.

# [v3.2.3](https://github.com/schoero/swissqrbill/compare/v3.2.2...v3.2.3) - 16.04.2023

* Updated dependencies.
* Removed source maps from the pre-built bundle.

# [v3.2.2](https://github.com/schoero/swissqrbill/compare/v3.2.1...v3.2.2) - 14.01.2023

* Updated dependencies.
* Fixed CI status badge.

# [v3.2.1](https://github.com/schoero/swissqrbill/compare/v3.2.0...v3.2.1) - 31.08.2022

* Performance improvements for in QR-Code rendering for PDF renderings. [#384](https://github.com/schoero/SwissQRBill/pull/384)
* Enforce minimum and maximum allowed QR-Code versions according to the specifications.

# [v3.2.0](https://github.com/schoero/swissqrbill/compare/v3.1.5...v3.2.0) - 05.03.2022

* Changed `PDF_._data` property to be protected to allow extending the `PDF_` class. [#368](https://github.com/schoero/SwissQRBill/pull/368)

# [v3.1.5](https://github.com/schoero/swissqrbill/compare/v3.1.4...v3.1.5) - 21.02.2022

* Fixed umlauts not correctly decoded with PostFinance scanner. [#367](https://github.com/schoero/SwissQRBill/pull/367)
* QR-Bills rendered as SVG now have a white background color.

# [v3.1.4](https://github.com/schoero/swissqrbill/compare/v3.1.3...v3.1.4) - 11.01.2022

* Fixed rendering of debtor rectangle in when page size is A4. [#361](https://github.com/schoero/SwissQRBill/pull/361)
* Fixed rendering of country code for foreign payments. [#362](https://github.com/schoero/SwissQRBill/pull/362)
* Fixed missing of `-` character in svg text rendering. [#363](https://github.com/schoero/SwissQRBill/pull/363)

# [v3.1.3](https://github.com/schoero/swissqrbill/compare/v3.1.2...v3.1.3) - 05.12.2021

* Fixed rendering of AV1 and AV2. [#357](https://github.com/schoero/SwissQRBill/pull/357)

# [v3.1.2](https://github.com/schoero/swissqrbill/compare/v3.1.1...v3.1.2) - 26.11.2021

* Removed deprecated restrictions for AV1 and AV2. [#355](https://github.com/schoero/SwissQRBill/pull/355)

# [v3.1.1](https://github.com/schoero/swissqrbill/compare/v3.1.0...v3.1.1) - 13.11.2021

* Fixed swiss cross positioning for PDF rendering. [#353](https://github.com/schoero/SwissQRBill/pull/353)

# [v3.1.0](https://github.com/schoero/swissqrbill/compare/v3.0.1...v3.1.0) - 12.11.2021

* Added TSDoc comments. [#348](https://github.com/schoero/SwissQRBill/pull/348)
* Removed unwanted space in `utils.formatAmount()`. [#349](https://github.com/schoero/SwissQRBill/pull/349)
* Fixed the formatting of the reference in SVG renderings. [#351](https://github.com/schoero/SwissQRBill/pull/351)
* Added a new `utils.formatReference()` function that auto detects the reference type.
* Improved the text spacing and positioning. [#352](https://github.com/schoero/SwissQRBill/pull/352)

# [v3.0.1](https://github.com/schoero/swissqrbill/compare/v3.0.0...v3.0.1) - 14.10.2021

* Changed build target to ES6 to support older Browsers and Node.js versions. [#347](https://github.com/schoero/SwissQRBill/pull/347)

# [v3.0.0](https://github.com/schoero/swissqrbill/compare/v2.4.2...v3.0.0) - 03.10.2021

* New features
  * SVG
    * Added support for SVG rendering. [#343](https://github.com/schoero/SwissQRBill/issues/343)
  * Added ES6 module exports.
  * Support for tree shaking.
  * utils
    * Added `mm2px()` function.
    * Added `px2mm()` function.
    * Added `pt2mm()` function.
* Breaking changes
  * imports
    * SwissQRBill is now available as a CommonJS and an ES module. This may change how the module has to be imported. Please take a look at the [importing the library](https://github.com/schoero/SwissQRBill#importing-the-library) section in the readme.
  * data
    * the field `houseNumber` has been renamed to `buildingNumber`.
    * the deprecated field `debitor` has been removed. Use `debtor` instead.
  * utils
    * `mmToPoints()` function has been renamed to `mm2pt()`.
  * PDF
    * Removed deprecated `mmToPoints()` export. Use `utils.mm2pt()` instead.
* Fixes
  * PDF
    * The positioning of the box when no amount is provided has been slightly corrected.
    * The positioning iban on the payment part has been slightly corrected.
    * Fixed positioning of the debtor boxes when no debtor is provided and the creditor address break to multiple lines.

# [v2.4.2](https://github.com/schoero/swissqrbill/compare/v2.4.1...v2.4.2) - 26.08.2021

* Fixed translation of `additionalInformation` and `payableByName`. [#342](https://github.com/schoero/SwissQRBill/pull/342)

# [v2.4.1](https://github.com/schoero/swissqrbill/compare/v2.4.0...v2.4.1) - 25.08.2021

* Fixed missing rendering of `message`. [#340](https://github.com/schoero/SwissQRBill/pull/340)

# [v2.4.0](https://github.com/schoero/swissqrbill/compare/v2.3.3...v2.4.0) - 01.07.2021

* Added an optional size parameter to specify the new page size in `addQRBill()`. [#338](https://github.com/schoero/SwissQRBill/pull/338)

# [v2.3.3](https://github.com/schoero/swissqrbill/compare/v2.3.1...v2.3.3) - 05.04.2021

* A string is now allowed for the zip code field. [#294](https://github.com/schoero/SwissQRBill/pull/294)

# [v2.3.1](https://github.com/schoero/swissqrbill/compare/v2.3.0...v2.3.1) - 06.02.2021

* Removed iban dependency and integrated IBAN validation directly into the library.
* Fixed some misleading error messages.

# [v2.3.0](https://github.com/schoero/swissqrbill/compare/v2.2.0...v2.3.0) - 24.01.2021

* Added [options](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md#options) to disable rendering of outlines, scissors icons or text `Separate before paying in`, for use with perforated or preprinted paper.

# [v2.2.0](https://github.com/schoero/swissqrbill/compare/v2.1.0...v2.2.0) - 20.01.2021

* Switched from `fs.WriteStream` to `stream.Writable` in order to provide more streaming flexibility. [#207](https://github.com/schoero/SwissQRBill/pull/207)

# [v2.1.0](https://github.com/schoero/swissqrbill/compare/v2.0.3...v2.1.0) - 15.12.2020

* Changed the implemented QR code library to fix an issue that caused QR code scanning to fail on some QR readers.
* Added [utility functions](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md#swissqrbillutils) to simplify the creation of QR bills.
* Added additional QR-Reference validation.

# [v2.0.3](https://github.com/schoero/swissqrbill/compare/v2.0.2...v2.0.3) - 09.12.2020

* Fixed a problem with QR Code encoding that caused QR Code scanning to fail at certain banks.

# [v2.0.2](https://github.com/schoero/swissqrbill/compare/v2.0.1...v2.0.2) - 19.08.2020

* Fixed an issue that caused reference to render incorrectly.
* Fixed "Compte / Payable à" to display correctly in french QR bills.

# [v2.0.1](https://github.com/schoero/swissqrbill/compare/v2.0.0...v2.0.1) - 22.07.2020

* Small bug fixes and code cleanup.

# [v2.0.0](https://github.com/schoero/swissqrbill/compare/v1.3.1...v2.0.0) - 12.07.2020

* Added browser support.
  * Added new blobStream method.
* Added possibility to stream the pdf into a buffer.

# [v1.3.1](https://github.com/schoero/swissqrbill/compare/v1.3.0...v1.3.1) - 27.06.2020

* Fixed invalid QR Code field when the second decimal place in amount is a zero.

# [v1.3.0](https://github.com/schoero/swissqrbill/compare/v1.2.0...v1.3.0) - 25.06.2020

* Tables
  * Added new header property on table rows to automatically insert a header row on new pages.
  * Table row height is now automatically calculated if not otherwise defined.
  * Added padding property to rows and cells.
* Events
  * Added new beforeEnd event that could be used to add page numbers.
  * Added new pageAdded event that could be used to add a header to the pages.
* Renamed `debitor` property to `debtor`.
* Improved documentation.
* TypeScript declaration improvements.
* Fixed typos in examples.

# [v1.2.0](https://github.com/schoero/swissqrbill/compare/v1.1.0...v1.2.0) - 06.06.2020

* Added optional callback function that gets executed once the pdf file has completed writing.
* Emit finish event once the pdf file has completed writing.

# [v1.1.0](https://github.com/schoero/swissqrbill/compare/v1.0.6...v1.1.0) - 15.03.2020

* Fixed some validation checks.
* Improved error messages.
* Added new method to generate tables.
* Improved documentation.

# [v1.0.6](https://github.com/schoero/swissqrbill/compare/v1.0.5...v1.0.6) - 04.03.2020

* Fixed QR Code fields.
* Added user data validation.

# [v1.0.5](https://github.com/schoero/swissqrbill/compare/v1.0.4...v1.0.5) - 03.03.2020

* Fixed french characters.
* Removes new lines in user data.
* Fixed some layout issues.
