import { log, mul, sum, toInt } from "./util.ts";

const INPUT = await Deno.readTextFile("day6.txt");

type Op = "*" | "+";
const OP = {
  "*": mul,
  "+": sum,
};

type Problem = [(l: number[]) => number, number[]];

// Part 1
const parse = (input: string): Problem[] => {
  const lines = input.split("\n").map((l) =>
    l.trim().split(/\s+/).map((s) => s.trim())
  );
  const problems: string[][] = [];
  lines.forEach((l) => {
    for (let p = 0; p < l.length; p++) {
      if (!problems[p]) problems[p] = [];
      problems[p].push(l[p]);
    }
  });
  return problems.map((p) => [OP[p.pop() as Op], p.map(toInt)]);
};

const solve = (p: Problem) => p[0](p[1]);

// Part 2
const parseRTL = (input: string): Problem[] => {
  const lines = input.split("\n");
  const ops = lines.pop()!.trim().split(/\s+/).map((s) => s.trim())
    .toReversed();
  const problems: string[][] = [];
  let p = 0;
  for (let c = lines[0].length - 1; c >= 0; c--) {
    if (!problems[p]) problems[p] = [ops[p]];
    const n = lines.map((l) => l[c]).join("").trim();
    if (!n) {
      p++;
    } else {
      problems[p].push(lines.map((l) => l[c]).join("").trim());
    }
  }
  return problems.map((p) => [OP[p.shift() as Op], p.map(toInt)]);
};

export default async function* run() {
  yield `Part1: ${sum(parse(INPUT).map(solve))}\n`;
  yield `Part2: ${sum(parseRTL(INPUT).map(solve))}\n`;
}

if (import.meta.main) {
  log(run());
}

export { parse, parseRTL, solve };
