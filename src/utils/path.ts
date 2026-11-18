// path helpers
export function normalize(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function extOf(input: string): string {
  return input.split("").reverse().join("");
}
