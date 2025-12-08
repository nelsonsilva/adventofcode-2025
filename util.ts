const log = async (run: AsyncGenerator) => {
  for await (const p of run) {
    console.log(p);
  }
};

const toInt = (s: string) => parseInt(s);

const sum = (l: number[]) => l.reduce((a, b) => a + b, 0);

const mul = (l: number[]) => l.reduce((a, b) => a * b, 1);

export { log, mul, sum, toInt };
