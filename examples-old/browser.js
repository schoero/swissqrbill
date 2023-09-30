import SwissQRBill from "swissqrbill/bundle";


const data = {
  amount: 1199.95,
  creditor: {
    account: "CH4431999123000889012",
    address: "Rue du Lac 1268",
    city: "Biel",
    country: "CH",
    name: "Robert Schneider AG",
    zip: 2501
  },
  currency: "CHF",
  debtor: {
    address: "Grosse Marktgasse 28",
    city: "Rorschach",
    country: "CH",
    name: "Pia-Maria Rutschmann-Schnyder",
    zip: 9400
  },
  reference: "210000000003139471430009017"
};


const stream = new SwissQRBill.BlobStream();
const pdf = new SwissQRBill.PDF(data, stream);

pdf.on("finish", () => {
  window.location.href = stream.toBlobURL("application/pdf");
  console.log("PDF has been successfully created.");
});
