import QRCode from "qrcode";
import fs from "fs";
import PDFDocument from "pdfkit";
import { parse } from "svg-parser";
import svgpath from "svgpath";

//https://www.paymentstandards.ch/dam/downloads/style-guide-de.pdf
//https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-de.pdf


const swissCross = `
  <polygon points="18.3,0.7 1.6,0.7 0.7,0.7 0.7,1.6 0.7,18.3 0.7,19.1 1.6,19.1 18.3,19.1 19.1,19.1 19.1,18.3 19.1,1.6 19.1,0.7 "/>
  <rect x="8.3" y="4" fill="#FFFFFF" width="3.3" height="11"/>
  <rect x="4.4" y="7.9" fill="#FFFFFF" width="11" height="3.3"/>
  <polygon fill="none" stroke="#FFFFFF" stroke-width="1.4357" stroke-miterlimit="10" points="0.7,1.6 0.7,18.3 0.7,19.1 1.6,19.1 18.3,19.1 19.1,19.1 19.1,18.3 19.1,1.6 19.1,0.7 18.3,0.7 
    1.6,0.7 0.7,0.7 "/>
`;

const sampleData = `SPC
0200
1
CH4431999123000889012
S
Robert Schneider AG
Rue du Lac
1268
2501
Biel
CH







1949.75
CHF
S
Pia-Maria Rutschmann-Schnyder
Grosse Marktgasse
28
9400
Rorschach
CH
QRR
210000000003139471430009017
Auftrag vom 15.06.2020
EPD
//S1/10/10201409/11/200701/20/140.000-53/30/102673831/31/200615/32/7.7/33/7.7:139.40/40/0:30
Name AV1: UV;UltraPay005;12345
Name AV2: XY;XYService;54321`;




export default class SwissQRBill {

  public document: PDFKit.PDFDocument;

  constructor(data: string, output: string){

    this.document = new PDFDocument({ autoFirstPage: false });
    this.document.pipe(fs.createWriteStream("file.pdf"));

    this.document.info.Author = "SwissQRBill";

    this.addPage();

    this.document.text("Hello world!", 100, 100);

    this.drawQRBill();

    this._generateQRCode(data);

    this.document.end();

  }

  public addPage() {
    this.document.addPage({
      margin: this._mmToPoints(5),
      layout: "portrait",
      size: "A4"
    });
  }


  public drawQRBill(): void {


    //-- Draw outlines

    this.document.moveTo(0, this._mmToPoints(192))
      .lineTo(this._mmToPoints(210), this._mmToPoints(192))
      .moveTo(this._mmToPoints(62), this._mmToPoints(192))
      .lineTo(this._mmToPoints(62), this._mmToPoints(297))
      .dash(1, { space: 1 })
      .stroke();


    //-- Draw receipt

    this.document.fontSize(11);
    this.document.font("Helvetica-Bold");
    this.document.text("Empfangsschein", this._mmToPoints(5), this._mmToPoints(197), {
      width: this._mmToPoints(52),
      align: "left",
    });

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text("Konto / Zahlbar an", this._mmToPoints(5), this._mmToPoints(204), {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(8);
    this.document.font("Helvetica");
    this.document.text("CH44 3199 9123 0008 8901 2\nRobert Schneider AG\nRue du Lac 1268\n2501 Biel", {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(9);
    this.document.moveDown();

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text("Referenz", {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(8);
    this.document.font("Helvetica");
    this.document.text("C21 00000 00003 13947 14300 09017", {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(9);
    this.document.moveDown();

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text("Zahlbar durch", {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(8);
    this.document.font("Helvetica");
    this.document.text("Pia-Maria Rutschmann-Schnyder\nGrosse Marktgasse 28\n9400 Rorschach", {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(6);
    this.document.font("Helvetica-Bold");
    this.document.text("Währung Betrag", this._mmToPoints(5), this._mmToPoints(260), {
      width: this._mmToPoints(52)
    });

    this.document.fontSize(8);
    this.document.font("Helvetica");
    this.document.text("CHF 1 949.75", {
      width: this._mmToPoints(52)
    });

  }


  private _mmToPoints(mm: number): number {
    return Math.round(mm * 2.83465);
  }


  private _generateQRCode(data: string){

    QRCode.toString(data, { type: "svg", width: this._mmToPoints(46), errorCorrectionLevel: "medium" }, (error, qrcodeString) => {

      let svgPath = this._getSVGPathFromQRCodeString(qrcodeString);

      if(svgPath === undefined){
        console.error("Could not convert svg image to path");
        return;
      }


      svgPath = svgpath(svgPath)
        .scale(1.2)
        .toString();

      this.document.path(svgPath)
        .undash()
        .stroke();
      //fs.writeFileSync("out.svg", this._insertLogo(svgPath));
    });

  }


  private _getSVGPathFromQRCodeString(qrcodeString: string): string | undefined {

    const svgObject = parse(qrcodeString);

    if(svgObject.children === undefined){
      return;
    }

    firstChildLoop: for(const firstChild of svgObject.children){
      if(firstChild.type !== "element"){
        continue firstChildLoop;
      }

      secondChildLoop: for(const secondChild of firstChild.children){

        if(typeof secondChild !== "object"){
          continue secondChildLoop;
        }
        if(secondChild.type !== "element"){
          continue secondChildLoop;
        }
        if(secondChild.properties === undefined){
          continue secondChildLoop;
        }
        if(secondChild.properties.stroke !== "#000000"){
          continue secondChildLoop;
        }
        if(typeof secondChild.properties.d !== "string"){
          continue secondChildLoop;
        }
        return secondChild.properties.d;
      }
    }

  }


  private _insertLogo(svgData: string): string {
    return svgData.replace("</svg>", swissCross + "</svg>");
  }

}

const bill = new SwissQRBill(sampleData, "./test.pdf");