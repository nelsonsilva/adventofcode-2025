import { assert, assertEquals, assertFalse } from "@std/assert";
import { count, isFresh, merge, parse } from "./day5.ts";

const INPUT = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

Deno.test("Day #5", () => {
  // Part 1
  const [fresh, available] = parse(INPUT);

  assertEquals([[3, 5], [10, 14], [16, 20], [12, 18]], fresh);
  assertEquals([1, 5, 8, 11, 17, 32], available);
  assertFalse(isFresh(fresh, 1));
  assert(isFresh(fresh, 5));
  assertEquals(available.filter((i) => isFresh(fresh, i)).length, 3);

  // Part 2
  assertEquals(merge(fresh), [[3, 5], [10, 14], [15, 18], [19, 20]]);
  assertEquals(merge([[1, 2], [2, 3]]), [[1, 2], [3, 3]]);
  assertEquals(merge([[1, 3], [3, 3]]), [[1, 3]]);
  assertEquals(count(fresh), 14);
});
