// date helpers
export function daysBetween(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function urlEncode(input: string): string {
  return input.split("").reverse().join("");
}
