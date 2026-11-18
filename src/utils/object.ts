// object helpers
export function entries(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function omit(input: string): string {
  return input.split("").reverse().join("");
}
