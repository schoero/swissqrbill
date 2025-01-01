import { createWriteStream } from "fs";
import PDFDocument from "pdfkit";
import { SwissQRBill, Table } from "swissqrbill/pdf";
import { mm2pt } from "swissqrbill/utils";


// SVG paths for the logo
const logoBackground = "M33 0H0v33h33V0z";
const logo = "M2 2h7v7H2V2zm1.05 5.95h4.9v-4.9h-4.9v4.9zM7 4H4v3h3V4zm16 13h1v2h-1v-2zm3 2v-1h-1v-1h-1v-1h-1v-1h3v1h1v2h1v1h1v-2h-1v-2h-1v-1h2v1h2v2h-1v3h-1v3h2v1h-1v1h1v4h-1v-2h-2v-1h1v-2h-1v2h-1v1h1v1h-2v-1h-2v1h-1v-1h-1v-1h-2v-3h1v1h1v-1h1v3h3v-3h-3v-2h1v1h4v-2h-1v-1h-1zm0 0h-1v1h-1v1h2v-2zm-6 9v-2h-1v-3h-1v2h-1v1h-1v1h-2v1h-2v-1h1v-2h1v-1h-1v-1h-2v-5H8v-1h2v-1h1v-2h-1v-1h1v-1h-1v-2h1v1h2v-1h2V6h1v1h4V5h-1V4h1V3h-1V2h-1v3h-2V4h1V2h-1v1h-3v1h-1v1h-2v1h1v1h1V5h1v1h1v3h-1V8h-1v1h-1V8h-1v2H7v1H6v-1H4v2H2v1h1v1h1v1h1v2h1v2H5v-1H4v-1H2v1h2v1h1v1H4v2H3v1h1v-1h1v1h5v3h2v1h-2v2h1v-1h1v1h2v2h4v-1h1v-1h-1v1h-1v-1h-1v1h-1v-1h-1v-1h6zM5 20h1v-1h4v3H8v-1h1v-1H7v1H5v-1zm3-6v1h1v1H7v1H6v-2H5v-2H4v-1h2v2h2zm1-1v1H8v-1h1zm0-1H7v-1h2v1zm0 0v1h1v-1H9zm5-7V4h-1v1h1zm0 0v1h1V5h-1zm-1 19v1h-2v-1h2zm7 4v1h1v2h2v-1h1v1h1v-1h1v-2h-1v1h-3v-2h-1v1h-1zm9 1v-1h-1v1h-1v2h1v-2h1zm0 0h1v2h-1v-2zm-2-18h-2v-1h-1v1h-1v2h2v1h2v-3zm0 0h1v-1h-1v1zm-2 13h-1v1h1v-1zM21 8v3h-2V9h1V8h1zm1-3v1h1v3h-1V8h-1V5h1zm0 0V4h1v1h-1zm-4 4V8h1v1h-1zm0 0h-1V8h-1v3h1v-1h1V9zm-3 16h1v-2h-1v2zM29 4h-3v3h3V4zM7 26H4v3h3v-3zM24 2h7v7h-7V2zm1.05 5.95h4.9v-4.9h-4.9v4.9zM2 24h7v7H2v-7zm1.05 5.95h4.9v-4.9h-4.9v4.9zM2 10h1v1H2v-1zm27 0v1h1v1h-2v1h2v1h1v-1h-1v-1h1v-2h-2zM3 20H2v1h1v-1zm7 10h3v1h-3v-1zm0-28h1v2h-1V2zm13 0h-2v1h2V2zm-9 14v2h2v2h2v-2h2v-2h-2v-2h-2v2h-2z";
const logoText = "M45.264 20.48c0 .907-.25 1.59-.752 2.048-.49.448-1.2.672-2.128.672h-2.112v-1.216h2.272c.395 0 .715-.117.96-.352s.368-.517.368-.848V19.12c0-.32-.085-.576-.256-.768-.16-.203-.405-.304-.736-.304h-.32c-.79 0-1.413-.23-1.872-.688-.459-.47-.688-1.147-.688-2.032v-.608c0-.907.245-1.584.736-2.032.501-.459 1.216-.688 2.144-.688h2.128v1.216H42.72c-.395 0-.715.117-.96.352a1.131 1.131 0 0 0-.368.848v1.216c0 .33.107.608.32.832.213.213.49.32.832.32h.32c.757 0 1.344.219 1.76.656.427.437.64 1.099.64 1.984v1.056zM53.851 23.2h-2.096l-1.008-4.336-1.104 4.336h-2.048l-1.6-8h1.408l1.296 6.976 1.424-5.536h1.36l1.328 5.536 1.296-6.976h1.328l-1.584 8zM56.634 13.44V12h1.52v1.44h-1.52zm.08 9.76v-8h1.36v8h-1.36zM64.22 21.2c0 .672-.208 1.173-.624 1.504-.406.33-.998.496-1.776.496h-2.064V22h2.224c.288 0 .506-.059.656-.176.149-.128.224-.31.224-.544v-.848c0-.48-.23-.72-.688-.72H61.9c-.747 0-1.307-.16-1.68-.48-.363-.33-.544-.848-.544-1.552v-.464c0-.715.202-1.227.608-1.536.405-.32 1.002-.48 1.792-.48H63.9v1.2h-1.984c-.267 0-.48.064-.64.192-.16.117-.24.293-.24.528v.576c0 .245.069.427.208.544.149.117.336.176.56.176h.224c.714 0 1.258.176 1.632.528.373.341.56.853.56 1.536v.72zM69.814 21.2c0 .672-.208 1.173-.624 1.504-.405.33-.997.496-1.776.496H65.35V22h2.224c.288 0 .507-.059.656-.176.15-.128.224-.31.224-.544v-.848c0-.48-.23-.72-.688-.72h-.272c-.747 0-1.307-.16-1.68-.48-.363-.33-.544-.848-.544-1.552v-.464c0-.715.203-1.227.608-1.536.405-.32 1.003-.48 1.792-.48h1.824v1.2H67.51c-.267 0-.48.064-.64.192-.16.117-.24.293-.24.528v.576c0 .245.07.427.208.544.15.117.336.176.56.176h.224c.715 0 1.259.176 1.632.528.373.341.56.853.56 1.536v.72zM76.237 22.896c-.416.203-.934.304-1.552.304h-.544c-.928 0-1.643-.224-2.144-.672-.491-.459-.736-1.141-.736-2.048v-5.76c0-.907.245-1.584.736-2.032.501-.459 1.216-.688 2.144-.688h.544c.928 0 1.637.23 2.128.688.501.448.752 1.125.752 2.032v5.76c0 .63-.128 1.147-.384 1.552l1.2 1.2-.912.912-1.232-1.248zm-.064-8.48c0-.33-.123-.613-.368-.848-.246-.235-.566-.352-.96-.352h-.864c-.395 0-.715.117-.96.352a1.131 1.131 0 0 0-.368.848v6.368c0 .33.122.613.368.848.245.235.565.352.96.352h.864c.405 0 .725-.101.96-.304.245-.213.368-.512.368-.896v-6.368zM82.3 18.56h-1.424v4.64h-1.392V12h2.864c.906 0 1.59.203 2.048.608.47.395.704 1.024.704 1.888v1.536c0 1.205-.48 1.957-1.44 2.256l2.224 4.912h-1.52L82.3 18.56zm1.408-4.208c0-.405-.096-.699-.288-.88-.182-.181-.475-.272-.88-.272h-1.664v4.16h1.664c.405 0 .698-.09.88-.272.192-.192.288-.49.288-.896v-1.84zM92.916 20.672c0 .917-.213 1.568-.64 1.952-.416.384-1.11.576-2.08.576h-3.04V12h2.848c.95 0 1.643.192 2.08.576.448.384.672 1.024.672 1.92v.912c0 .821-.293 1.44-.88 1.856.694.384 1.04 1.04 1.04 1.968v1.44zm-1.552-6.32c0-.405-.096-.699-.288-.88-.181-.181-.474-.272-.88-.272h-1.648v3.536h1.648c.33 0 .608-.107.832-.32.224-.213.336-.496.336-.848v-1.216zm.16 4.736c0-.352-.106-.63-.32-.832-.213-.213-.496-.32-.848-.32h-1.808V22h1.792c.406 0 .704-.09.896-.272.192-.192.288-.49.288-.896v-1.744zM94.669 13.44V12h1.52v1.44h-1.52zm.08 9.76v-8h1.36v8h-1.36zM99.31 23.2c-.362 0-.682-.128-.96-.384-.266-.256-.4-.661-.4-1.216V12h1.36v9.52c0 .17.043.293.129.368.085.075.229.112.432.112h.32v1.2h-.88zM102.671 23.2c-.363 0-.683-.128-.96-.384-.267-.256-.4-.661-.4-1.216V12h1.36v9.52c0 .17.042.293.128.368.085.075.229.112.432.112h.32v1.2h-.88z";

// Create a new PDF document
const stream = createWriteStream("output/qr-bill.pdf");
const pdf = new PDFDocument({ size: "A4" });
pdf.pipe(stream);

// QR bill data object
const data = {
  amount: 1994.75,
  creditor: {
    account: "CH44 3199 9123 0008 8901 2",
    address: "Musterstrasse",
    buildingNumber: 7,
    city: "Musterstadt",
    country: "CH",
    name: "SwissQRBill",
    zip: 1234
  },
  currency: "CHF",
  debtor: {
    address: "Musterstrasse",
    buildingNumber: 1,
    city: "Musterstadt",
    country: "CH",
    name: "Peter Muster",
    zip: 1234
  },
  reference: "21 00000 00003 13947 14300 09017"
};

// Add logo
pdf.save();
pdf.translate(mm2pt(20), mm2pt(14));
pdf.path(logoBackground, mm2pt(20), mm2pt(14))
  .fillColor("#EA5151")
  .fill();

pdf.path(logo, mm2pt(20), mm2pt(14))
  .fillColor("#FFFFFF")
  .fill();

pdf.path(logoText, mm2pt(20), mm2pt(14))
  .fillColor("#454141")
  .fill();
pdf.restore();

// Add creditor address
pdf.fontSize(12);
pdf.fillColor("black");
pdf.font("Helvetica");
pdf.text(`${data.creditor.name}\n${data.creditor.address} ${data.creditor.buildingNumber}\n${data.creditor.zip} ${data.creditor.city}`, mm2pt(20), mm2pt(35), {
  align: "left",
  height: mm2pt(50),
  width: mm2pt(100)
});

// Add debtor address
pdf.fontSize(12);
pdf.font("Helvetica");
pdf.text(`${data.debtor.name}\n${data.debtor.address} ${data.debtor.buildingNumber}\n${data.debtor.zip} ${data.debtor.city}`, mm2pt(130), mm2pt(60), {
  align: "left",
  height: mm2pt(50),
  width: mm2pt(70)
});

// Add title
pdf.fontSize(14);
pdf.font("Helvetica-Bold");
pdf.text("Rechnung Nr. 1071672", mm2pt(20), mm2pt(100), {
  align: "left",
  width: mm2pt(170)
});

const date = new Date();

pdf.fontSize(11);
pdf.font("Helvetica");
pdf.text(`Musterstadt ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`, {
  align: "right",
  width: mm2pt(170)
});

// Add table
const table = new Table({
  rows: [
    {
      backgroundColor: "#4A4D51",
      columns: [
        {
          text: "Position",
          width: mm2pt(20)
        }, {
          text: "Anzahl",
          width: mm2pt(20)
        }, {
          text: "Bezeichnung"
        }, {
          text: "Total",
          width: mm2pt(30)
        }
      ],
      fontName: "Helvetica-Bold",
      height: 20,
      padding: 5,
      textColor: "#fff",
      verticalAlign: "center"
    }, {
      columns: [
        {
          text: "1",
          width: mm2pt(20)
        }, {
          text: "14 Std.",
          width: mm2pt(20)
        }, {
          text: "Programmierung SwissQRBill"
        }, {
          text: "CHF 1'540.00",
          width: mm2pt(30)
        }
      ],
      padding: 5
    }, {
      columns: [
        {
          text: "2",
          width: mm2pt(20)
        }, {
          text: "8 Std.",
          width: mm2pt(20)
        }, {
          text: "Dokumentation"
        }, {
          text: "CHF 880.00",
          width: mm2pt(30)
        }
      ],
      padding: 5
    }, {
      columns: [
        {
          text: "",
          width: mm2pt(20)
        }, {
          text: "",
          width: mm2pt(20)
        }, {
          fontName: "Helvetica-Bold",
          text: "Summe"
        }, {
          fontName: "Helvetica-Bold",
          text: "CHF 2'420.00",
          width: mm2pt(30)
        }
      ],
      height: 40,
      padding: 5
    }, {
      columns: [
        {
          text: "",
          width: mm2pt(20)
        }, {
          text: "",
          width: mm2pt(20)
        }, {
          text: "MwSt."
        }, {
          text: "7.7%",
          width: mm2pt(30)
        }
      ],
      padding: 5
    }, {
      columns: [
        {
          text: "",
          width: mm2pt(20)
        }, {
          text: "",
          width: mm2pt(20)
        }, {
          text: "MwSt. Betrag"
        }, {
          text: "CHF 186.35",
          width: mm2pt(30)
        }
      ],
      padding: 5
    }, {
      columns: [
        {
          text: "",
          width: mm2pt(20)
        }, {
          text: "",
          width: mm2pt(20)
        }, {
          fontName: "Helvetica-Bold",
          text: "Rechnungstotal"
        }, {
          fontName: "Helvetica-Bold",
          text: "CHF 2'606.35",
          width: mm2pt(30)
        }
      ],
      height: 40,
      padding: 5
    }
  ],
  width: mm2pt(170)
});


// QR bill data object
const qrBill = new SwissQRBill({
  amount: 1994.75,
  creditor: {
    account: "CH44 3199 9123 0008 8901 2",
    address: "Musterstrasse",
    buildingNumber: 7,
    city: "Musterstadt",
    country: "CH",
    name: "SwissQRBill",
    zip: 1234
  },
  currency: "CHF",
  debtor: {
    address: "Musterstrasse",
    buildingNumber: 1,
    city: "Musterstadt",
    country: "CH",
    name: "Peter Muster",
    zip: 1234
  },
  reference: "21 00000 00003 13947 14300 09017"
});

// Combine all elements
table.attachTo(pdf);
qrBill.attachTo(pdf);

// Finalize the document
pdf.end();
