/**
 * scripts/lib/exec.mjs
 *
 * Child-process helpers for deterministic CLI execution.
 */

import { spawn } from "node:child_process";
import process from "node:process";

/**
 * @typedef {{ code: number, stdout: string, stderr: string }} ExecResult
 */

/**
 * Run a command and capture stdout/stderr.
 *
 * @param {string} cmd
 * @param {string[]} args
 * @param {{ cwd?: string, env?: NodeJS.ProcessEnv }} [opts]
 * @returns {Promise<ExecResult>}
 */
export function execCapture(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd,
      env: opts.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => (stdout += d.toString("utf8")));
    child.stderr.on("data", (d) => (stderr += d.toString("utf8")));

    child.on("error", (err) => {
      stderr += `\n[execCapture] spawn failed: ${err?.message ?? String(err)}\n`;
      resolve({ code: 127, stdout, stderr });
    });

    child.on("close", (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

/**
 * Check if a command exists on PATH.
 *
 * @param {string} bin
 * @returns {Promise<boolean>}
 */
export async function commandExists(bin) {
  const tool = process.platform === "win32" ? "where" : "which";
  const res = await execCapture(tool, [bin]);
  return res.code === 0;
}

/**
 * Spawn a command and stream stdout to a writer, while capturing stderr.
 *
 * Returns exit code and stderr.
 *
 * @param {string} cmd
 * @param {string[]} args
 * @param {{ cwd?: string, env?: NodeJS.ProcessEnv, stdoutWriter: import('node:stream').Writable, timeoutMs?: number, signal?: AbortSignal }} opts
 * @returns {Promise<{ code: number, stderr: string, timedOut: boolean }>}
 */
export function spawnStdoutTo(cmd, args, opts) {
  return new Promise((resolve) => {
    /**
     * Implement timeouts using AbortController (Node 20+) when possible, with a safe fallback to kill().
     */
    const controller = opts.signal ? null : new AbortController();
    const signal = opts.signal ?? controller?.signal;
    let timedOut = false;

    const child = spawn(cmd, args, {
      cwd: opts.cwd,
      env: opts.env,
      stdio: ["ignore", "pipe", "pipe"],
      signal,
    });

    let stderr = "";
    const timeoutMs = Number(opts.timeoutMs ?? 0);
    const timer =
      timeoutMs > 0
        ? setTimeout(() => {
            timedOut = true;
            try {
              if (controller) controller.abort(new Error(`timeout after ${timeoutMs}ms`));
              else child.kill("SIGKILL");
            } catch {
              // ignore
            }
          }, timeoutMs)
        : null;

    child.stdout.pipe(opts.stdoutWriter);
    child.stderr.on("data", (d) => {
      stderr += d.toString("utf8");
    });

    child.on("error", (err) => {
      if (timer) clearTimeout(timer);
      stderr += `\n[spawnStdoutTo] spawn failed: ${err?.message ?? String(err)}\n`;
      resolve({ code: 127, stderr, timedOut });
    });

    child.on("close", (code) => {
      if (timer) clearTimeout(timer);
      resolve({ code: code ?? 1, stderr, timedOut });
    });
  });
}
