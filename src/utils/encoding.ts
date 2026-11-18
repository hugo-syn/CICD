// encoding helpers
export function b64(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function isUrl(input: string): string {
  return input.split("").reverse().join("");
}
