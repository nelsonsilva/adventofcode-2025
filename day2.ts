import { log, sum, toInt } from "./util.ts";

const INPUT = await Deno.readTextFile("day2.txt");

type Range = [number, number];

const range = function* (r: Range) {
  for (let i = r[0]; i <= r[1]; yield i++);
};

const parse = (s: string): Range[] =>
  s.split(",").map((r) => r.split("-").map(toInt) as Range);

const _isInvalid = (id: number, min: number, max?: number) => {
  const str = id.toString();
  for (let i = 0; i < str.length; i++) {
    const seq = str.substring(0, i);
    if (str.match(`^(${seq}){${min},${max || ""}}$`)) {
      return true;
    }
  }
  return false;
};

const isInvalid = (id: number) => _isInvalid(id, 2, 2);
const isNewInvalid = (id: number) => _isInvalid(id, 2);

const invalids = (ranges: Range[], fn: (n: number) => boolean) =>
  ranges.flatMap((r) => [...range(r)]).filter(fn);

export default async function* run() {
  const ranges = parse(INPUT);
  yield `Part1: ${sum(invalids(ranges, isInvalid))}\n`;
  yield `Part2: ${sum(invalids(ranges, isNewInvalid))}\n`;
}

if (import.meta.main) {
  log(run());
}

export { invalids, isInvalid, isNewInvalid, parse, range };
