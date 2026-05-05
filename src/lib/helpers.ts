import { readFile, writeFile } from "fs/promises";

export async function readJSON<T>(path: string) {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data) as T;
  } catch (err) {
    throw new Error(`Failed to load JSON at ${path}:${err}`);
  }
}

export async function writeJSON<T>(path: string, data: T): Promise<void> {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error(`Failed to write JSON at ${path}:${err}`);
  }
}
