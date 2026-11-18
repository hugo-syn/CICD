export function readEnv(key: string, fallback = ""): string {
  const v = typeof process !== "undefined" ? process.env[key] : undefined;
  return v === undefined ? fallback : v;
}
