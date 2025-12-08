import { assertEquals } from "@std/assert";
import { indexesOf, move, parse, simulate, timelines } from "./day7.ts";

const INPUT = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

Deno.test("Day #7", () => {
  // Part 1
  assertEquals(indexesOf(INPUT.split("\n")[0], "S"), [7]);
  const [beams, splitters] = parse(INPUT);
  assertEquals(beams, [7]);
  assertEquals(splitters[0], []);
  assertEquals(splitters[1], [7]);
  const [_s1, m1] = move(beams, splitters[0]);
  assertEquals(m1, [7]);
  const [s2, m2] = move(m1, splitters[1]);
  assertEquals(s2, 1);
  assertEquals(m2, [6, 8]);
  const [_s3, m3] = move(m2, splitters[2]);
  assertEquals(m3, [6, 8]);
  const [s4, m4] = move(m3, splitters[3]);
  assertEquals(s4, 2);
  assertEquals(m4, [5, 7, 9]);

  assertEquals(simulate(beams, splitters), [21, [
    0,
    2,
    4,
    6,
    8,
    10,
    11,
    12,
    14,
  ]]);

  // Part 2
  assertEquals(timelines([7], splitters), 40);
});
