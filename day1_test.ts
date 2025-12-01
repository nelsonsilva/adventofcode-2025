import { assertEquals } from "@std/assert";
import { click, combination, password, rotate, zeros } from "./day1.ts";

const INPUT = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.split("\n");

Deno.test("Day #1", () => {
  // Part 1
  assertEquals(rotate(11, "R8"), 19);
  assertEquals(rotate(19, "L19"), 0);

  assertEquals(rotate(0, "L1"), 99);
  assertEquals(rotate(99, "R1"), 0);

  assertEquals(rotate(0, "L200"), 0);
  assertEquals(rotate(0, "R200"), 0);
  assertEquals(combination(INPUT), [50, 82, 52, 0, 95, 55, 0, 99, 0, 14, 32]);

  assertEquals(password(INPUT), 3);

  // Part 2
  assertEquals(zeros(0, "R1"), 0);
  assertEquals(zeros(0, "L1"), 0);
  assertEquals(zeros(1, "R1"), 0);
  assertEquals(zeros(1, "L1"), 0);
  assertEquals(zeros(99, "R1"), 0);
  assertEquals(zeros(50, "L58"), 1);
  assertEquals(zeros(95, "R60"), 1);

  assertEquals(zeros(52, "R48"), 0);
  assertEquals(zeros(152, "L48"), 0);
  assertEquals(zeros(50, "R1000"), 10);

  assertEquals(click(INPUT), 6);
});
