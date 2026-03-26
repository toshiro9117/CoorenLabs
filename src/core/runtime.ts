type RuntimeEnv = Record<string, string | undefined>;

const bunRuntime = (globalThis as { Bun?: { env?: RuntimeEnv; write?: (path: string, data: string) => Promise<number> } }).Bun;

export const env: RuntimeEnv = bunRuntime?.env ?? (process.env as RuntimeEnv);
export const isBunRuntime = Boolean(bunRuntime);

export const bunWrite = async (path: string, data: string): Promise<void> => {
  if (typeof bunRuntime?.write === "function") {
    await bunRuntime.write(path, data);
  }
};
