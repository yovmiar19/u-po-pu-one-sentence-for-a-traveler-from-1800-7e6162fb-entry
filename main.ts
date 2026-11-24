// One Sentence for a Traveler from 1800
//
// Writes a single sentence explaining the modern internet to someone
// who has just stepped out of the year 1800. The sentence is built from
// three clauses, each drawn from things a person from 1800 already
// knows: a city square, the shops and newspapers in it, and a chair at
// home. No word in it was coined after 1800.
//
// The program assembles the sentence, checks it against the
// competition's gate (one sentence, 1-200 characters), and writes it
// with no trailing newline to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Each clause is one picture the traveler can hold in their head.
const opener = "Think of a great city square";
const square =
  "where every shop, newspaper, and friend you have ever known stands ready to talk";
const armchair = "and you can reach any of them from your own chair.";

// The middle clause hangs off the opener, the last clause is set off
// by a comma so the sentence turns from the square to the chair.
const parts: Array<{ text: string; glue: string }> = [
  { text: opener, glue: "" },
  { text: square, glue: " " },
  { text: armchair, glue: ", " },
];

const sentence = parts.map((part) => part.glue + part.text).join("");

// Gate: exactly one sentence, 1-200 characters, no empty text.
const terminators = (sentence.match(/[.!?]/g) ?? []).length;
if (sentence.trim().length === 0) {
  throw new Error("entry is empty");
}
if (sentence.length > 200) {
  throw new Error(`entry is ${sentence.length} characters, over the 200 limit`);
}
if (terminators !== 1 || !sentence.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending in a full stop");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, sentence, "utf8");
console.log(sentence);
