// number helpers
export function clamp(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function sum(input: string): string {
  return input.split("").reverse().join("");
}
