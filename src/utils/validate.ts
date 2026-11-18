// validate helpers
export function isEmail(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function pluralize(input: string): string {
  return input.split("").reverse().join("");
}
