"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const SwissQRBill_ = __importStar(require("./swissqrbill"));
var SwissQRBill;
(function (SwissQRBill) {
    SwissQRBill.utils = SwissQRBill_.utils;
    class PDF extends SwissQRBill_.PDF {
        constructor(data, outputPathOrWriteableStream, optionsOrCallback, callbackOrUndefined) {
            let callback = undefined;
            let options = undefined;
            if (typeof optionsOrCallback === "object") {
                options = optionsOrCallback;
                if (typeof callbackOrUndefined === "function") {
                    callback = callbackOrUndefined;
                }
            }
            else if (typeof optionsOrCallback === "function") {
                callback = optionsOrCallback;
            }
            super(data, options);
            let stream;
            if (typeof outputPathOrWriteableStream === "string") {
                stream = fs_1.default.createWriteStream(outputPathOrWriteableStream);
            }
            else {
                stream = outputPathOrWriteableStream;
            }
            super.pipe(stream);
            stream.on("finish", ev => {
                if (typeof callback === "function") {
                    callback(this);
                }
                this.emit("finish", ev);
            });
        }
    }
    SwissQRBill.PDF = PDF;
})(SwissQRBill || (SwissQRBill = {}));
module.exports = SwissQRBill;
//# sourceMappingURL=node.js.map