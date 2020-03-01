"use strict";
exports.__esModule = true;
var qrcode_1 = require("qrcode");
var fs_1 = require("fs");
var pdfkit_1 = require("pdfkit");
var svg_parser_1 = require("svg-parser");
var svgpath_1 = require("svgpath");
//https://www.paymentstandards.ch/dam/downloads/style-guide-de.pdf
//https://www.paymentstandards.ch/dam/downloads/ig-qr-bill-de.pdf
var swissCross = "\n  <polygon points=\"18.3,0.7 1.6,0.7 0.7,0.7 0.7,1.6 0.7,18.3 0.7,19.1 1.6,19.1 18.3,19.1 19.1,19.1 19.1,18.3 19.1,1.6 19.1,0.7 \"/>\n  <rect x=\"8.3\" y=\"4\" fill=\"#FFFFFF\" width=\"3.3\" height=\"11\"/>\n  <rect x=\"4.4\" y=\"7.9\" fill=\"#FFFFFF\" width=\"11\" height=\"3.3\"/>\n  <polygon fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.4357\" stroke-miterlimit=\"10\" points=\"0.7,1.6 0.7,18.3 0.7,19.1 1.6,19.1 18.3,19.1 19.1,19.1 19.1,18.3 19.1,1.6 19.1,0.7 18.3,0.7 \n    1.6,0.7 0.7,0.7 \"/>\n";
var sampleData = "SPC\n0200\n1\nCH4431999123000889012\nS\nRobert Schneider AG\nRue du Lac\n1268\n2501\nBiel\nCH\n\n\n\n\n\n\n\n1949.75\nCHF\nS\nPia-Maria Rutschmann-Schnyder\nGrosse Marktgasse\n28\n9400\nRorschach\nCH\nQRR\n210000000003139471430009017\nAuftrag vom 15.06.2020\nEPD\n//S1/10/10201409/11/200701/20/140.000-53/30/102673831/31/200615/32/7.7/33/7.7:139.40/40/0:30\nName AV1: UV;UltraPay005;12345\nName AV2: XY;XYService;54321";
var SwissQRBill = /** @class */ (function () {
    function SwissQRBill(data, output) {
        this.document = new pdfkit_1["default"]({ autoFirstPage: false });
        this.document.pipe(fs_1["default"].createWriteStream("file.pdf"));
        this.document.info.Author = "SwissQRBill";
        this.addPage();
        this.document.text("Hello world!", 100, 100);
        this.drawQRBill();
        this._generateQRCode(data);
        this.document.end();
    }
    SwissQRBill.prototype.addPage = function () {
        this.document.addPage({
            margin: this._mmToPoints(5),
            layout: "portrait",
            size: "A4"
        });
    };
    SwissQRBill.prototype.drawQRBill = function () {
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
            align: "left"
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
    };
    SwissQRBill.prototype._mmToPoints = function (mm) {
        return Math.round(mm * 2.83465);
    };
    SwissQRBill.prototype._generateQRCode = function (data) {
        var _this = this;
        qrcode_1["default"].toString(data, { type: "svg", width: this._mmToPoints(46), errorCorrectionLevel: "medium" }, function (error, qrcodeString) {
            var svgPath = _this._getSVGPathFromQRCodeString(qrcodeString);
            if (svgPath === undefined) {
                console.error("Could not convert svg image to path");
                return;
            }
            svgPath = svgpath_1["default"](svgPath)
                .scale(1.2)
                .toString();
            _this.document.path(svgPath)
                .undash()
                .stroke();
            //fs.writeFileSync("out.svg", this._insertLogo(svgPath));
        });
    };
    SwissQRBill.prototype._getSVGPathFromQRCodeString = function (qrcodeString) {
        var svgObject = svg_parser_1.parse(qrcodeString);
        if (svgObject.children === undefined) {
            return;
        }
        firstChildLoop: for (var _i = 0, _a = svgObject.children; _i < _a.length; _i++) {
            var firstChild = _a[_i];
            if (firstChild.type !== "element") {
                continue firstChildLoop;
            }
            secondChildLoop: for (var _b = 0, _c = firstChild.children; _b < _c.length; _b++) {
                var secondChild = _c[_b];
                if (typeof secondChild !== "object") {
                    continue secondChildLoop;
                }
                if (secondChild.type !== "element") {
                    continue secondChildLoop;
                }
                if (secondChild.properties === undefined) {
                    continue secondChildLoop;
                }
                if (secondChild.properties.stroke !== "#000000") {
                    continue secondChildLoop;
                }
                if (typeof secondChild.properties.d !== "string") {
                    continue secondChildLoop;
                }
                return secondChild.properties.d;
            }
        }
    };
    SwissQRBill.prototype._insertLogo = function (svgData) {
        return svgData.replace("</svg>", swissCross + "</svg>");
    };
    return SwissQRBill;
}());
exports["default"] = SwissQRBill;
var bill = new SwissQRBill(sampleData, "./test.pdf");
