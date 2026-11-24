// The Funniest Out-of-Office — make.fun entry (v2).
//
// Writes one line of out-of-office auto-reply to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Gate: UTF-8 text, 1-140 characters, not only whitespace, a single line.
//
// v2 revises the line itself: v1's cat-deletes-my-email joke is a trope the
// judge has read a thousand times. v2 keeps the same shape (out until
// Monday, then the twist) but the twist is fresher — the inbox was handed
// to my future self, and he just quit — and every word earns its place.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "I'm out until Monday. My inbox is now handled by my future self, who has just handed in his notice.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate counts characters, so enforce the competition's own rules here.
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 140) {
  throw new Error(`Line is ${ENTRY_LINE.length} characters, must be 1-140.`);
}
if (ENTRY_LINE.trim().length === 0 || ENTRY_LINE.includes("\n")) {
  throw new Error("Line must be a single non-blank line.");
}

mkdirSync(outDir, { recursive: true });
// No trailing newline: the file is exactly the line, nothing else.
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(
  `Wrote ${ENTRY_LINE.length} characters to ${join(outDir, "entry.txt")}`,
);
