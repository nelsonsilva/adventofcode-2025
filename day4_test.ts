import { assert, assertEquals, assertFalse } from "@std/assert";
import {
  countAccessible,
  isAccessible,
  removeAccessible,
  removeAll,
} from "./day4.ts";

const GRID = [
  "..@@.@@@@.",
  "@@@.@.@.@@",
  "@@@@@.@.@@",
  "@.@@@@..@.",
  "@@.@@@@.@@",
  ".@@@@@@@.@",
  ".@.@.@.@@@",
  "@.@@@.@@@@",
  ".@@@@@@@@.",
  "@.@.@@@.@.",
];

Deno.test("Day #4", () => {
  // Part #1
  assert(isAccessible(GRID, 3, 0));
  assertFalse(isAccessible(GRID, 7, 0));
  assertEquals(countAccessible(GRID), 13);

  // Part #2
  const n = removeAccessible(GRID);
  assertEquals(n, [
    "..xx.xx@x.",
    "x@@.@.@.@@",
    "@@@@@.x.@@",
    "@.@@@@..@.",
    "x@.@@@@.@x",
    ".@@@@@@@.@",
    ".@.@.@.@@@",
    "x.@@@.@@@@",
    ".@@@@@@@@.",
    "x.x.@@@.x.",
  ]);

  assertEquals(removeAll(GRID), 43);
});
