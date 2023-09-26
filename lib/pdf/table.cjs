"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var TableLayer = /* @__PURE__ */ ((TableLayer2) => {
  TableLayer2[TableLayer2["HeightCalculation"] = 0] = "HeightCalculation";
  TableLayer2[TableLayer2["PageInjection"] = 1] = "PageInjection";
  TableLayer2[TableLayer2["BackgroundColor"] = 2] = "BackgroundColor";
  TableLayer2[TableLayer2["Borders"] = 3] = "Borders";
  TableLayer2[TableLayer2["Text"] = 4] = "Text";
  return TableLayer2;
})(TableLayer || {});
class Table {
  /**
   * Inserts a table to the document.
   * @param data An Object which contains the table information.
   * @returns The Table instance.
   * @example
   * ```ts
   * const table = {
   *   rows: [
   *     {
   *       columns: [
   *         {
   *           text: "Row 1 cell 1"
   *         }, {
   *           text: "Row 1 cell 2"
   *         }, {
   *           text: "Row 1 cell 3"
   *         }
   *       ],
   *       backgroundColor: "#ECF0F1"
   *     }, {
   *       columns: [
   *         {
   *           text: "Row 2 cell 1"
   *         }, {
   *           text: "Row 2 cell 2"
   *         }, {
   *           text: "Row 2 cell 3"
   *         }
   *       ]
   *     }
   *   ]
   * };
   * ```
   */
  constructor(data) {
    this.data = data;
  }
  // Hacky workaround to get the current page of the document
  getCurrentPage(doc) {
    const page = doc.page;
    for (let i = doc.bufferedPageRange().start; i < doc.bufferedPageRange().count; i++) {
      doc.switchToPage(i);
      if (doc.page === page) {
        return i;
      }
    }
    return doc.bufferedPageRange().count;
  }
  /**
   * Attaches the table to a PDFKit document instance.
   * @param doc The PDFKit document instance
   * @returns The Table instance.
   * @throws { Error } Throws an error if no table rows are provided.
   */
  attachTo(doc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    if (this.data.rows === void 0) {
      throw new Error("No table rows provided.");
    }
    doc.options.bufferPages = true;
    const startX = doc.x;
    const startPage = this.getCurrentPage(doc);
    const tableX = this.data.x ? this.data.x : doc.x;
    const tableY = this.data.y ? this.data.y : doc.y;
    const tableWidth = this.data.width ? this.data.width : doc.page.width - tableX - doc.page.margins.right;
    const tableBackgroundColor = this.data.backgroundColor ? this.data.backgroundColor : void 0;
    const tableBorder = this.data.border ? this.data.border : void 0;
    const tableBorderColors = this.data.borderColor ? this.data.borderColor : "#000000";
    const tablePadding = this.data.padding ? this.data.padding : 0;
    const tableFontSize = this.data.fontSize ? this.data.fontSize : 11;
    const tableTextColor = this.data.textColor ? this.data.textColor : "#000000";
    const tableFont = this.data.font ? this.data.font : "Helvetica";
    const tableAlign = this.data.align ? this.data.align : void 0;
    const tableVerticalAlign = this.data.verticalAlign ? this.data.verticalAlign : "top";
    const autoRowHeights = [];
    for (let layer = 0; layer < Object.keys(TableLayer).length; layer++) {
      doc.switchToPage(startPage);
      let rowY = tableY;
      rowLoop:
        for (let rowIndex = 0; rowIndex < this.data.rows.length; rowIndex++) {
          const row = this.data.rows[rowIndex];
          const rowHeight = autoRowHeights[rowIndex];
          const minRowHeight = row.minHeight;
          const maxRowHeight = row.maxHeight;
          const rowPadding = row.padding ? row.padding : tablePadding;
          const rowBackgroundColor = row.backgroundColor ? row.backgroundColor : tableBackgroundColor;
          const rowBorder = row.border ? row.border : tableBorder;
          const rowBorderColors = row.borderColor ? row.borderColor : tableBorderColors;
          const rowFontSize = row.fontSize ? row.fontSize : tableFontSize;
          const rowFont = row.font ? row.font : tableFont;
          const rowTextColor = row.textColor ? row.textColor : tableTextColor;
          const rowAlign = row.align ? row.align : tableAlign;
          const rowVerticalAlign = row.verticalAlign ? row.verticalAlign : tableVerticalAlign;
          doc.moveTo(tableX, tableY);
          let columnX = tableX;
          columnLoop:
            for (let columnIndex = 0; columnIndex < row.columns.length; columnIndex++) {
              const column = row.columns[columnIndex];
              const { remainingColumns, widthUsed } = row.columns.reduce((acc, column2) => {
                if (column2.width !== void 0) {
                  acc.widthUsed += column2.width;
                  acc.remainingColumns--;
                }
                return acc;
              }, { remainingColumns: row.columns.length, widthUsed: 0 });
              const columnWidth = column.width ? column.width : (tableWidth - widthUsed) / remainingColumns;
              const columnPadding = column.padding ? column.padding : rowPadding;
              const columnBackgroundColor = column.backgroundColor ? column.backgroundColor : rowBackgroundColor;
              const columnBorder = column.border ? column.border : rowBorder;
              const columnBorderColors = column.borderColor ? column.borderColor : rowBorderColors;
              const columnFontSize = column.fontSize ? column.fontSize : rowFontSize;
              const columnFont = column.font ? column.font : rowFont;
              const columnTextColor = column.textColor ? column.textColor : rowTextColor;
              const columnAlign = column.align ? column.align : rowAlign;
              const columnVerticalAlign = column.verticalAlign ? column.verticalAlign : rowVerticalAlign;
              const fillOpacity = columnBackgroundColor === void 0 ? 0 : 1;
              const borderOpacity = columnBorderColors === void 0 ? 0 : 1;
              const paddings = this._positionsToObject(columnPadding);
              doc.moveTo(columnX + columnWidth, rowY);
              const textOptions = __spreadProps(__spreadValues({}, (_a = column.textOptions) != null ? _a : {}), {
                align: columnAlign,
                baseline: "middle",
                height: rowHeight !== void 0 ? rowHeight - ((_b = paddings.top) != null ? _b : 0) - ((_c = paddings.bottom) != null ? _c : 0) : void 0,
                lineBreak: true,
                width: columnWidth - ((_d = paddings.left) != null ? _d : 0) - ((_e = paddings.right) != null ? _e : 0)
              });
              doc.font(columnFont);
              doc.fontSize(columnFontSize);
              const textHeight = doc.heightOfString(`${column.text}`, textOptions);
              const singleLineHeight = doc.heightOfString("A", textOptions);
              if (layer === 0) {
                if (autoRowHeights[rowIndex] === void 0 || autoRowHeights[rowIndex] < textHeight + ((_f = paddings.top) != null ? _f : 0) + ((_g = paddings.bottom) != null ? _g : 0)) {
                  autoRowHeights[rowIndex] = textHeight + ((_h = paddings.top) != null ? _h : 0) + ((_i = paddings.bottom) != null ? _i : 0);
                  if (minRowHeight !== void 0 && autoRowHeights[rowIndex] < minRowHeight) {
                    autoRowHeights[rowIndex] = minRowHeight;
                  }
                  if (maxRowHeight !== void 0 && autoRowHeights[rowIndex] > maxRowHeight) {
                    autoRowHeights[rowIndex] = maxRowHeight;
                  }
                }
                if (row.height !== void 0) {
                  autoRowHeights[rowIndex] = row.height;
                }
                if (columnIndex < row.columns.length - 1) {
                  continue columnLoop;
                } else {
                  continue rowLoop;
                }
              }
              if (layer === 1) {
                if (rowY + rowHeight >= doc.page.height - doc.page.margins.bottom) {
                  doc.addPage();
                  rowY = doc.y;
                  const headerRow = this.data.rows.find((row2) => row2.header);
                  if (headerRow !== void 0) {
                    this.data.rows.splice(rowIndex, 0, headerRow);
                    autoRowHeights.splice(rowIndex, 0, autoRowHeights[this.data.rows.indexOf(headerRow)]);
                    rowIndex--;
                    continue rowLoop;
                  }
                }
              }
              if (layer > 1) {
                if (!!row.header && rowY !== doc.page.margins.top || rowY + rowHeight >= doc.page.height - doc.page.margins.bottom) {
                  doc.switchToPage(this.getCurrentPage(doc) + 1);
                  doc.x = (_j = doc.page.margins.left) != null ? _j : 0;
                  doc.y = (_k = doc.page.margins.top) != null ? _k : 0;
                  rowY = doc.y;
                }
              }
              if (layer === 2) {
                if (columnBackgroundColor !== void 0) {
                  doc.rect(columnX, rowY, columnWidth, rowHeight).fillColor(columnBackgroundColor).fillOpacity(fillOpacity).fill();
                }
              }
              if (layer === 4) {
                let textPosY = rowY;
                if (columnVerticalAlign === "top") {
                  textPosY = rowY + ((_l = paddings.top) != null ? _l : 0) + singleLineHeight / 2;
                } else if (columnVerticalAlign === "center") {
                  textPosY = rowY + rowHeight / 2 - textHeight / 2 + singleLineHeight / 2;
                } else if (columnVerticalAlign === "bottom") {
                  textPosY = rowY + rowHeight - ((_m = paddings.bottom) != null ? _m : 0) - textHeight + singleLineHeight / 2;
                }
                if (textPosY < rowY + ((_n = paddings.top) != null ? _n : 0) + singleLineHeight / 2) {
                  textPosY = rowY + ((_o = paddings.top) != null ? _o : 0) + singleLineHeight / 2;
                }
                doc.fillColor(columnTextColor).fillOpacity(1);
                doc.text(`${column.text}`, columnX + ((_p = paddings.left) != null ? _p : 0), textPosY, textOptions);
              }
              if (layer === 3) {
                if (columnBorder !== void 0 && columnBorderColors !== void 0) {
                  const border = this._positionsToObject(columnBorder);
                  const borderColor = this._positionsToObject(columnBorderColors);
                  doc.undash().lineJoin("miter").lineCap("butt").strokeOpacity(borderOpacity);
                  if (border.left && borderColor.left) {
                    const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;
                    const borderTopMargin = border.top ? border.top / 2 : 0;
                    doc.moveTo(columnX, rowY + rowHeight + borderBottomMargin);
                    doc.lineTo(columnX, rowY - borderTopMargin).strokeColor(borderColor.left).lineWidth(border.left).stroke();
                  }
                  if (border.right && borderColor.right) {
                    const borderTopMargin = border.top ? border.top / 2 : 0;
                    const borderBottomMargin = border.bottom ? border.bottom / 2 : 0;
                    doc.moveTo(columnX + columnWidth, rowY - borderTopMargin);
                    doc.lineTo(columnX + columnWidth, rowY + rowHeight + borderBottomMargin).strokeColor(borderColor.right).lineWidth(border.right).stroke();
                  }
                  if (border.top && borderColor.top) {
                    const borderLeftMargin = border.left ? border.left / 2 : 0;
                    const borderRightMargin = border.right ? border.right / 2 : 0;
                    doc.moveTo(columnX - borderLeftMargin, rowY);
                    doc.lineTo(columnX + columnWidth + borderRightMargin, rowY).strokeColor(borderColor.top).lineWidth(border.top).stroke();
                  }
                  if (border.bottom && borderColor.bottom) {
                    const borderRightMargin = border.right ? border.right / 2 : 0;
                    const borderLeftMargin = border.left ? border.left / 2 : 0;
                    doc.moveTo(columnX + columnWidth + borderRightMargin, rowY + rowHeight);
                    doc.lineTo(columnX - borderLeftMargin, rowY + rowHeight).strokeColor(borderColor.bottom).lineWidth(border.bottom).stroke();
                  }
                }
              }
              columnX += columnWidth;
            }
          rowY += rowHeight;
          doc.x = columnX;
          doc.y = rowY;
        }
    }
    doc.x = startX;
    return this;
  }
  _positionsToObject(numberOrPositions) {
    if (typeof numberOrPositions === "number" || typeof numberOrPositions === "string") {
      return {
        bottom: numberOrPositions,
        left: numberOrPositions,
        right: numberOrPositions,
        top: numberOrPositions
      };
    } else {
      return {
        bottom: numberOrPositions[2] ? numberOrPositions[2] : numberOrPositions[0],
        left: numberOrPositions[3] ? numberOrPositions[3] : numberOrPositions[1] ? numberOrPositions[1] : numberOrPositions[0],
        right: numberOrPositions[1] ? numberOrPositions[1] : numberOrPositions[0],
        top: numberOrPositions[0]
      };
    }
  }
}
exports.Table = Table;
