import type { Creditor, Data, Debtor } from "swissqrbill:types";


export function cleanData(data: Data): Data {

  const _cleanObject = <ObjectType extends Creditor | Data | Debtor>(object: ObjectType): ObjectType => {

    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => {

        if(typeof value === "object"){
          return [key, _cleanObject(value)];
        }

        if(typeof value === "string"){
          if(key === "account"){
            return [key, removeLineBreaks(removeSpaces(value))];
          }
          if(key === "reference"){
            return [key, removeLineBreaks(removeSpaces(value))];
          }
          if(key === "country"){
            return [key, removeLineBreaks(removeSpaces(value).toUpperCase())];
          }
          return [key, removeLineBreaks(value)];
        }

        return [key, value];
      })
    ) as ObjectType;
  };

  return _cleanObject(data);

}

export function removeSpaces(text: string): string {
  return text.replace(/ /g, "");
}

export function removeLineBreaks(text: string): string {
  return text
    .replace(/\n/g, "")
    .replace(/\r/g, "");
}
