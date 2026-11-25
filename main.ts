// The Tired Dark Lord — a 100-word villain monologue for make.fun.
// The program writes the fixed monologue to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";

const ENTRY =
  "You think the throne is power? It's a chair. A cold one, with a draft from the east tower no spell has ever fixed. I conquered seven kingdoms before breakfast — before breakfast! — and the kitchens still serve my porridge lukewarm. The hero will come, sword gleaming, monologue ready. I'll let him talk. I've heard it all before, and frankly, the dramatic pause is the only part I still enjoy. Tonight the dragon gets the night off. So do I. The conquest can wait until after my nap. The realms can wait. They've waited three hundred years, and so can you.";

mkdirSync(OUTPUT_DIR, { recursive: true });
// Gate guard: the sealed scorer requires 1–600 characters of non-whitespace
// text, and the brief asks for about 100 words — refuse to emit an entry
// that would be invalid instead of silently writing a bad file.
const words = ENTRY.trim().split(/\s+/).length;
if (ENTRY.length < 1 || ENTRY.length > 600 || ENTRY.trim().length === 0) {
  throw new Error(`entry out of gate: ${ENTRY.length} chars`);
}
if (words < 90 || words > 110) {
  throw new Error(`entry word count out of range: ${words} words`);
}
writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY, "utf8");
