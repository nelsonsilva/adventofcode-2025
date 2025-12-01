export const log = async (run: AsyncGenerator) => {
  for await (const p of run) {
    console.log(p);
  }
};
