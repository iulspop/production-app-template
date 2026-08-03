import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { describe, expect, test } from "vitest";

const featuresDirectory = dirname(new URL(import.meta.url).pathname);

const collectAdapterFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) return collectAdapterFiles(path);
    if (!directory.endsWith("/adapters")) return [];
    if (!/\.(ts|tsx)$/.test(entry.name)) return [];
    if (/\.(test|spec|stories)\./.test(entry.name)) return [];

    return [path];
  });

describe("feature architecture", () => {
  test("given: a non-page feature adapter, should: implement an associated port", () => {
    const actual = collectAdapterFiles(featuresDirectory)
      .filter((path) => !path.endsWith("-page.tsx"))
      .filter((path) => !readFileSync(path, "utf8").includes("../ports/"))
      .map((path) => relative(featuresDirectory, path));
    const expected: string[] = [];

    expect(actual).toEqual(expected);
  });
});
