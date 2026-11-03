import type { Creditor, Data, Debtor } from "swissqrbill:types";


export function cleanData(data: Data): Data {

  const _cleanValue = (key: string, value: unknown): unknown => {

    if(typeof value !== "string"){
      return value;
    }

    if(key === "account" || key === "country"){
      return removeLineBreaks(removeSpaces(value).toUpperCase());
    }

    if(key === "reference"){
      return removeLineBreaks(removeSpaces(value));
    }

    return removeLineBreaks(value);

  };

  const _cleanObject = <ObjectType extends Creditor | Data | Debtor>(object: ObjectType): ObjectType => {

    const cleanedEntries = Object.entries(object).reduce<[string, unknown][]>((entries, [key, value]) => {

      const cleanedValue = typeof value === "object"
        ? _cleanObject(value)
        : _cleanValue(key, value);

      // Optional fields are treated as not used if they are empty after cleaning
      if(cleanedValue === "" && (
        key === "additionalInformation" ||
        key === "av1" ||
        key === "av2" ||
        key === "buildingNumber" ||
        key === "message" ||
        key === "reference"
      )){
        return entries;
      }

      entries.push([key, cleanedValue]);
      return entries;

    }, []);

    return Object.fromEntries(cleanedEntries) as unknown as ObjectType;

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
