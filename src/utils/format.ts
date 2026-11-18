// format helpers
export function titleCase(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function reverse(input: string): string {
  return input.split("").reverse().join("");
}
