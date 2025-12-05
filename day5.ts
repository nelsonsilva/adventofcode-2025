import { log, sum, toInt } from "./util.ts";

const INPUT = await Deno.readTextFile("day5.txt");

const parse = (input: string): [number[][], number[]] => {
  const [fresh, available] = input.split("\n\n");
  return [
    fresh.split("\n").map((s) => s.split("-").map(toInt)),
    available.split("\n").map(toInt),
  ];
};

const isFresh = (fresh: number[][], id: number) => {
  return fresh.some(([a, b]) => id >= a && id <= b);
};

// Part 2
const merge = (ranges: number[][]) => {
  // sort by start
  ranges.sort(([a1, _b1], [a2, _b2]) => a1 - a2);
  let end = 0;
  const res = [];
  for (let i = 0; i < ranges.length; i++) {
    let [a, b] = ranges[i];
    // if fully contained, just skip
    if (b <= end) continue;
    // push the start of the range to the last end
    a = a > end ? a : end + 1;
    res.push([a, b]);
    end = b;
  }
  return res;
};

const count = (ranges: number[][]) => {
  return sum(merge(ranges).map(([a, b]) => b - a + 1));
};

export default async function* run() {
  const [fresh, available] = parse(INPUT);
  const c = available.filter((i) => isFresh(fresh, i)).length;
  yield `Part1: ${c}\n`;
  yield `Part2: ${count(fresh)}\n`;
}

if (import.meta.main) {
  log(run());
}

export { count, isFresh, merge, parse };
