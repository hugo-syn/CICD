import { rmSync } from "node:fs";
for (const dir of ["dist", ".cache"]) rmSync(dir, { recursive: true, force: true });
