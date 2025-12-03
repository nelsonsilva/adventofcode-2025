import { log, sum, toInt } from "./util.ts";

const INPUT = (await Deno.readTextFile("day3.txt")).split("\n");

// Part 1
const jolts = (bank: string) => {
  const combinations = [];
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      combinations.push(parseInt(bank[i] + bank[j]));
    }
  }
  return combinations.sort((a, b) => b - a)[0];
};

// Part 2
const max = (bank: string, n: number): number => {
  const batteries = bank.split("").map(toInt);
  const res = [];
  let i = 0;
  while (n-- > 0) {
    const head = batteries.slice(i, bank.length - n);
    const m = Math.max(...head);
    res.push(m);
    i += head.indexOf(m) + 1;
  }
  return toInt(res.map((b) => b.toString()).join(""));
};

const total = (banks: string[], n: number) => sum(banks.map((b) => max(b, n)));

export default async function* run() {
  yield `Part1: ${total(INPUT, 2)}\n`;
  yield `Part2: ${total(INPUT, 12)}\n`;
}

if (import.meta.main) {
  log(run());
}

export { jolts, max, total };
