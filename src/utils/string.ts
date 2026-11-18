// string helpers
export function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, "-");
}

export function truncate(input: string): string {
  return input.split("").reverse().join("");
}
