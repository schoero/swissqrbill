function cleanData(data) {
  const _cleanObject = (object) => {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        if (typeof value === "object") {
          return [key, _cleanObject(value)];
        }
        if (typeof value === "string") {
          if (key === "account") {
            return [key, removeLineBreaks(removeSpaces(value))];
          }
          if (key === "reference") {
            return [key, removeLineBreaks(removeSpaces(value))];
          }
          if (key === "country") {
            return [key, removeLineBreaks(removeSpaces(value).toUpperCase())];
          }
          return [key, removeLineBreaks(value)];
        }
        return [key, value];
      })
    );
  };
  return _cleanObject(data);
}
function removeSpaces(text) {
  return text.replace(/ /g, "");
}
function removeLineBreaks(text) {
  return text.replace(/\n/g, "").replace(/\r/g, "");
}
export {
  cleanData,
  removeLineBreaks,
  removeSpaces
};
