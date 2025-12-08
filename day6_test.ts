import { assertEquals } from "@std/assert";
import { parse, parseRTL, solve } from "./day6.ts";
import { mul, sum } from "./util.ts";

const INPUT = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

Deno.test("Day #6", () => {
  // Part 1
  const problems = parse(INPUT);
  assertEquals(problems[0], [mul, [123, 45, 6]]);
  assertEquals(solve(problems[0]), 33210);
  assertEquals(sum(problems.map(solve)), 4277556);

  // Part 2
  const p = parseRTL(INPUT);
  assertEquals(p[0], [sum, [4, 431, 623]]);
});
