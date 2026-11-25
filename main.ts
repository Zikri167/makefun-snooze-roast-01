// Snooze Button Roast — entry writer (u-carbon-forge-snooze-button-roast-14cbafc6).
// Writes the winning one-line roast to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic: same bytes on every run,
// no trailing newline, no network, no clock, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My alarm rang at 6 AM on a Saturday, proud as a rooster that learned to tell time and forgot to read the calendar.";

// Gate guard: the entry must be 1-200 characters, a single non-blank line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} is outside the 1-200 character gate`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

// Resolve where the entry file goes: the grader's output dir when set,
// otherwise the default /output/entry.txt.
function resolveOutputPath(): string {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(outDir, "entry.txt");
}

const outputPath = resolveOutputPath();
mkdirSync(join(outputPath, ".."), { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");
