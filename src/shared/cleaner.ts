import type { Creditor, Data, Debtor } from "swissqrbill:types";

export function cleanData(data: Data): Data {
  const _cleanObject = <ObjectType extends Creditor | Data | Debtor>(
    object: ObjectType | null | undefined
  ): ObjectType | null | undefined => {
    // Guard: if null/undefined or not an object, return as is
    if (object == null || typeof object !== "object") {
      return object;
    }

    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        // Recurse into nested objects
        if (value != null && typeof value === "object") {
          return [key, _cleanObject(value as any)];
        }

        // Clean up strings
        if (typeof value === "string") {
          if (key === "account" || key === "reference") {
            return [key, removeLineBreaks(removeSpaces(value))];
          }
          if (key === "country") {
            return [key, removeLineBreaks(removeSpaces(value).toUpperCase())];
          }
          return [key, removeLineBreaks(value)];
        }

        // Leave all other types untouched
        return [key, value];
      })
    ) as ObjectType;
  };

  // We know data is a valid object here
  return _cleanObject(data) as Data;
}

export function removeSpaces(text: string): string {
  return text.replace(/ /g, "");
}

export function removeLineBreaks(text: string): string {
  return text.replace(/\n/g, "").replace(/\r/g, "");
}
