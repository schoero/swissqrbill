const data = {
  creditor: {
    account: "CH58 0079 1123 0008 8901 2",
    address: "Creditor Address",
    city: "Creditor City",
    country: "CH",
    name: "Creditor FirstName LastName",
    zip: 1234
  },
  currency: "CHF"
};

const pdf = new PDFDocument({ size: "A4" });
const stream = pdf.pipe(blobStream());
const qrBill = new SwissQRBill.PDF(data);

stream.on("finish", () => {
  const url = stream.toBlobURL("application/pdf");
  iframe.src = url;
});

qrBill.attachTo(pdf);
pdf.end();
