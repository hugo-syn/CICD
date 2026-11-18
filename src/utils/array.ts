// array helpers
export function chunk(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function uniq(input: string): string {
  return input.split("").reverse().join("");
}
