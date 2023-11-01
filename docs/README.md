# SwissQRBill

The documentation for SwissQRBill is located in [github.com/schoero/swissqrbill/docs](https://github.com/schoero/swissqrbill/tree/main/docs).

## Getting started

To help you get started, you can follow the guide [how to create a complete qr bill](./how-to-create-a-complete-qr-bill.md) to create your first QR bill.

## Importing

Depending on the environment you are using, you may need to import the library differently. The following documentation will help you find the best way to import the library for your environment.

- [Node.js: ES Module](./importing.md#nodejs-es-module-import)
- [Node.js: CommonJS](./importing.md#nodejs-commonjs-import)
- [Browser: Bundling with webpack](./importing.md#browser-bundling-with-webpack)
- [Browser: Pre-built bundle](./importing.md#browser-pre-built-bundle)

## API documentation

SwissQRBill exposes different classes and functions that can be used to create a QR bill. The API is split into different parts, depending on the use case.

- [PDF](./pdf/index.md)
  - [SwissQRBill](./pdf/index.md#swissqrbill)
  - [SwissQRCode](./pdf/index.md#swissqrcode)
  - [Table](./pdf/index.md#table)
- [SVG](./svg/index.md)
  - [SwissQRBill](./svg/index.md#swissqrbill)
  - [SwissQRCode](./svg/index.md#swissqrcode)
- [Utils](./utils/utils.md)
- [bundle](./bundle/index.md)