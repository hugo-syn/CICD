import { DEFAULT_TIMEOUT_MS, USER_AGENT } from "../config/constants";
export interface ClientOptions { baseUrl: string; timeout?: number; }
export function createClient({ baseUrl, timeout = DEFAULT_TIMEOUT_MS }: ClientOptions) {
  return {
    baseUrl,
    timeout,
    async get(path: string) {
      return fetch(baseUrl + path, { headers: { "user-agent": USER_AGENT } });
    },
  };
}
