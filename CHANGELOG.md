
# Change Log

# [v2.0.0](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.3.1...v2.0.0) - 12.07.2020
  * Added browser support
    - Added new blobStream method
  * Added possibility to stream the pdf into a buffer

# [v1.3.1](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.3.0...v1.3.1) - 27.06.2020
  * Fixed invalid QR Code field when the second decimal place in amount is a zero

# [v1.3.0](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.2.0...v1.3.0) - 25.06.2020
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

# [v1.2.0](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.1.0...v1.2.0) - 06.06.2020
  * Added optional callback function that gets executed once the pdf file has completed writing.
  * Emit finish event once the pdf file has completed writing.

# [v1.1.0](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.0.6...v1.1.0) - 15.03.2020
  * Fixed some validation checks.
  * Improved error messages.
  * Added new method to generate tables.
  * Improved documentation.

# [v1.0.6](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.0.5...v1.0.6) - 04.03.2020
  * Fixed QR Code fields.
  * Added user data validation.

# [v1.0.5](https://github.com/rogerrrrrrrs/swissqrbill/compare/v1.0.4...v1.0.5) - 03.03.2020
  * Fixed french characters.
  * Removes new lines in userdata.
  * Fixed some layout issues.