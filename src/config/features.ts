export const features = {
  newParser: true,
  streamingApi: false,
} as const;
export type Feature = keyof typeof features;
