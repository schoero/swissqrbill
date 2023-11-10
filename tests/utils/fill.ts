export function fillUntil(str: string, length: number): string {
  str ||= "_";
  return str.repeat(Math.ceil(length / str.length)).slice(0, length);
}
