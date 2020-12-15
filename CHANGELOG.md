
# Change Log

# [v2.1.0](https://github.com/schoero/swissqrbill/compare/v2.0.3...v2.1.0) - 15.12.2020
  * Changed the implemented QR code library to fix an issue that caused QR code scanning to fail on some QR readers.
  * Added [utility functions](https://github.com/schoero/SwissQRBill/blob/master/doc/api.md#swissqrbillutils) to simplify the creation of QR bills
  * Added additional QR-Reference validation

# [v2.0.3](https://github.com/schoero/swissqrbill/compare/v2.0.2...v2.0.3) - 09.12.2020
  * Fixed a problem with QR Code encoding that caused QR Code scanning to fail at certain banks.

# [v2.0.2](https://github.com/schoero/swissqrbill/compare/v2.0.1...v2.0.2) - 19.08.2020
  * Fixed an issue that caused reference to render incorrectly.
  * Fixed "Compte / Payable à" to display correctly in french QR bills.

# [v2.0.1](https://github.com/schoero/swissqrbill/compare/v2.0.0...v2.0.1) - 22.07.2020
  * Small bug fixes and code cleanup.

# [v2.0.0](https://github.com/schoero/swissqrbill/compare/v1.3.1...v2.0.0) - 12.07.2020
  * Added browser support.
    - Added new blobStream method.
  * Added possibility to stream the pdf into a buffer.

# [v1.3.1](https://github.com/schoero/swissqrbill/compare/v1.3.0...v1.3.1) - 27.06.2020
  * Fixed invalid QR Code field when the second decimal place in amount is a zero.

# [v1.3.0](https://github.com/schoero/swissqrbill/compare/v1.2.0...v1.3.0) - 25.06.2020
  * Tables
    - Added new header property on table rows to automatically insert a header row on new pages.
    - Table row height is now automatically calculated if not otherwise defined.
    - Added padding property to rows and cells.
  * Events
    - Added new beforeEnd event that could be used to add page numbers.
    - Added new pageAdded event that could be used to add a header to the pages.
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
  * Removes new lines in userdata.
  * Fixed some layout issues.