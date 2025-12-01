import { log } from "./util.ts";

const INPUT = (await Deno.readTextFile("day1.txt")).split("\n");

const rotate = (current: number, rotation: string) => {
  const [dir, str] = rotation.match(/(.)(\d+)/)?.slice(1)!;
  const amount = parseInt(str);
  if (dir == "L") current -= amount;
  if (dir == "R") current += amount;
  current = current % 100;
  if (current < 0) current = 100 + current;
  return current;
};

const combination = (rotations: string[]) =>
  rotations.reduce<number[]>(
    (pos, r) => pos.concat(rotate(pos[pos.length - 1], r)),
    [50],
  );

const password = (rotations: string[]) =>
  combination(rotations).filter((p) => p == 0).length;

const zeros = (current: number, rotation: string) => {
  const [dir, str] = rotation.match(/(.)(\d+)/)?.slice(1)!;
  let amount = parseInt(str);
  let turns = Math.abs(Math.floor(amount / 100));
  amount = amount - (turns * 100);

  if (dir == "L" && current > 0 && current - amount < 0) turns++;
  if (dir == "R" && current + amount > 100) turns++;

  return turns;
};

const click = (rotations: string[]) => {
  let count = password(rotations);
  const positions = combination(rotations);
  for (let i = 0; i < positions.length - 1; i++) {
    const p = positions[i];
    const z = zeros(p, rotations[i]);
    console.log(`${p} ${rotations[i]} ${positions[i + 1]}: ${z}`);
    count += z;
  }
  return count;
};

export default async function* run() {
  yield `Part1: ${password(INPUT)}\n`;
  yield `Part2: ${click(INPUT)}\n`;
}

if (import.meta.main) {
  log(run());
}

export { click, combination, password, rotate, zeros };
