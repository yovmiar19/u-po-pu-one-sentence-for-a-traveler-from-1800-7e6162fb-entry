// One sentence for a traveler from 1800.
//
// A visitor from 1800 has never seen the internet. This program
// explains it with one picture they already understand: a city
// square where every shop, newspaper, and friend is within reach
// from a chair at home. Every word in the sentence was already in
// use before 1800, so nothing in it would puzzle the traveler.
//
// The program builds the sentence, proves it meets the rules, and
// writes it with no trailing newline to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The three pictures, in the order the traveler meets them.
function composeSentence(): string {
  const square = "Think of a great city square";
  const crowd =
    "where every shop, newspaper, and friend you have ever known stands ready to talk";
  const chair = "and you can reach any of them from your own chair.";
  return `${square} ${crowd}, ${chair}`;
}

// Words a person from 1800 could not have known. If any of them
// slipped into the sentence, the entry would break the rules.
const MODERN_WORDS = [
  "internet",
  "computer",
  "telephone",
  "television",
  "radio",
  "website",
  "online",
  "digital",
  "smartphone",
  "email",
  "wifi",
  "software",
];

function hasModernWord(sentence: string): string | null {
  const words = sentence.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  for (const word of words) {
    if (MODERN_WORDS.includes(word)) {
      return word;
    }
  }
  return null;
}

function countSentenceEnds(sentence: string): number {
  let count = 0;
  for (const ch of sentence) {
    if (ch === "." || ch === "!" || ch === "?") {
      count += 1;
    }
  }
  return count;
}

function validate(sentence: string): void {
  if (sentence.length === 0) {
    throw new Error("entry is empty");
  }
  if (sentence.length > 200) {
    throw new Error(
      `entry is ${sentence.length} characters, over the 200 limit`,
    );
  }
  if (countSentenceEnds(sentence) !== 1 || !sentence.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending in a full stop");
  }
  const modern = hasModernWord(sentence);
  if (modern !== null) {
    throw new Error(`entry uses a word coined after 1800: ${modern}`);
  }
}

const sentence = composeSentence();
validate(sentence);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, sentence, "utf8");

// Read the file back and prove what landed on disk is exactly the
// sentence we validated. A partial write, a wrong path, or an
// encoding surprise must fail the run instead of silently shipping
// a broken entry.
const written = readFileSync(outPath, "utf8");
if (written !== sentence) {
  throw new Error("written entry does not match the validated sentence");
}
if (written.length > 200) {
  throw new Error(`written entry is ${written.length} characters, over the 200 limit`);
}
console.log(sentence);
