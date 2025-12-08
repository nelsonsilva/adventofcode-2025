import { log, sum, toInt } from "./util.ts";

const INPUT = await Deno.readTextFile("day7.txt");

const indexesOf = (s: string, k: string) => {
  let idx = -1;
  const res = [];
  while ((idx = s.indexOf(k, idx + 1)) > 0) res.push(idx);
  return res;
};

const parse = (str: string): [number[], number[][]] => {
  const lines = str.split("\n");
  const beams = indexesOf(lines.shift()!, "S");
  const splitters = lines.map((l) => indexesOf(l, "^"));
  return [beams, splitters];
};

const move = (beams: number[], splitters: number[]): [number, number[]] => {
  let splits = 0;
  const res = new Set<number>();
  beams.forEach((b) => {
    if (splitters.includes(b)) {
      res.add(b - 1);
      res.add(b + 1);
      splits++;
    } else {
      res.add(b);
    }
  });
  return [splits, [...res]];
};

const simulate = (start: number[], lines: number[][]): [number, number[]] => {
  let splits = 0;
  let beams = start;
  lines.forEach((splitters) => {
    const [s, m] = move(beams, splitters);
    splits += s;
    beams = m;
  });
  return [splits, beams];
};

// Part 2
class CountMap {
  map: { [k: number]: number } = {};
  constructor(a?: number[]) {
    if (a) {
      a.forEach((e) => this.add(e));
    }
  }
  add(idx: number, count: number = 1) {
    this.map[idx] = (this.map[idx] || 0) + count;
  }
  get(idx: number): number {
    return this.map[idx];
  }
  get length() {
    return sum(Object.values(this.map));
  }
  entries() {
    return Object.entries(this.map).map(([k, v]) => [toInt(k), v]);
  }
}

const timelines = (start: number[], lines: number[][]): number => {
  let beams = new CountMap(start);
  lines.forEach((l) => {
    const n = new CountMap();
    beams.entries().forEach(([p, c]) => {
      if (l.includes(p)) {
        n.add(p - 1, c);
        n.add(p + 1, c);
      } else {
        n.add(p, c);
      }
    });
    beams = n;
  });
  return beams.length;
};

export default async function* run() {
  const [start, lines] = parse(INPUT);
  const [splits, _beams] = simulate(start, lines);
  yield `Part1: ${splits}\n`;
  yield `Part2: ${timelines(start, lines)}\n`;
}

if (import.meta.main) {
  log(run());
}

export { CountMap, indexesOf, move, parse, simulate, timelines };
