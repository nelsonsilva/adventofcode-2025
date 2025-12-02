import { assert, assertEquals } from "@std/assert";
import { invalids, isInvalid, isNewInvalid, parse } from "./day2.ts";
import { sum } from "./util.ts";

const INPUT =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

Deno.test("Day #2", () => {
  // Part #1
  assert(isInvalid(11));
  assert(isInvalid(22));
  assert(isInvalid(1010));
  assert(isInvalid(1188511885));
  assert(isInvalid(222222));
  assert(isInvalid(446446));
  assert(isInvalid(38593859));

  const ranges = parse(INPUT);
  assertEquals(sum(invalids(ranges, isInvalid)), 1227775554);

  // Part #2
  assert(isNewInvalid(11));
  assert(isNewInvalid(22));
  assert(isNewInvalid(1010));
  assert(isNewInvalid(1188511885));
  assert(isNewInvalid(565656));
  assert(isNewInvalid(824824824));
  assert(isNewInvalid(2121212121));
  assertEquals(sum(invalids(ranges, isNewInvalid)), 4174379265);
});
