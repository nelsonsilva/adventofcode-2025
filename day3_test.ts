import { assertEquals } from "@std/assert";
import { jolts, max, total } from "./day3.ts";
import { sum } from "./util.ts";

const INPUT = `987654321111111
811111111111119
234234234234278
818181911112111`;

Deno.test("Day #3", () => {
  // Part #1
  assertEquals(jolts("987654321111111"), 98);
  assertEquals(jolts("811111111111119"), 89);
  assertEquals(jolts("234234234234278"), 78);
  assertEquals(jolts("818181911112111"), 92);

  const banks = INPUT.split("\n");
  assertEquals(total(banks, 2), 357);

  // Part #2
  assertEquals(max("987654321111111", 12), 987654321111);
  assertEquals(max("811111111111119", 12), 811111111119);
  assertEquals(max("234234234234278", 12), 434234234278);
  assertEquals(max("818181911112111", 12), 888911112111);

  assertEquals(sum(banks.map((b) => max(b, 12))), 3121910778619);
});
