import { log, sum } from "./util.ts";

const INPUT = (await Deno.readTextFile("day4.txt")).split("\n");

const PAPER = "@";

const isAccessible = (grid: string[], x: number, y: number) => {
  let rolls = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  for (let yi = y - 1; yi <= y + 1; yi++) {
    if (yi < 0 || yi >= rows) continue;
    const row = grid[yi];
    for (let xi = x - 1; xi <= x + 1; xi++) {
      if (xi < 0 || xi >= cols) continue;
      if (xi == x && yi == y) continue;
      if (row[xi] == PAPER) rolls++;
    }
  }
  return rolls < 4;
};

const countAccessible = (grid: string[]) => {
  return sum(
    grid.map((row, y) =>
      row.split("").filter((_, x) =>
        row[x] === PAPER && isAccessible(grid, x, y)
      ).length
    ),
  );
};

const removeAccessible = (grid: string[]) => {
  return grid.map((row, y) =>
    row.split("").map((_, x) =>
      row[x] === PAPER && isAccessible(grid, x, y) ? "x" : row[x]
    ).join("")
  );
};

const removeAll = (grid: string[]) => {
  let c, res = 0;
  while ((c = countAccessible(grid)) > 0) {
    res += c;
    grid = removeAccessible(grid);
  }
  return res;
};

export default async function* run() {
  yield `Part1: ${countAccessible(INPUT)}\n`;
  yield `Part2: ${removeAll(INPUT)}\n`;
}

if (import.meta.main) {
  log(run());
}

export { countAccessible, isAccessible, removeAccessible, removeAll };
