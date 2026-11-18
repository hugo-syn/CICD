export const defaults = {
  locale: "en",
  retry: { attempts: 3, backoff: "exponential" },
  logLevel: "info",
} as const;
