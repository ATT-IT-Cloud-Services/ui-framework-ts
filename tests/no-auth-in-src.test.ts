import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

describe("Architectural Boundary: NO auth in src/", () => {
  const srcDir = path.resolve(__dirname, "../src");
  const srcFiles = getAllFiles(srcDir);

  it("src/ must not contain files or paths matching auth pages", () => {
    const forbiddenPattern = /(login|register|signup|signin|forgot-password|reset-password)/i;

    const offendingFiles = srcFiles.filter((file) => {
      const rel = path.relative(srcDir, file);
      return forbiddenPattern.test(rel);
    });

    expect(offendingFiles).toEqual([]);
  });

  it("src/ must not import third-party auth packages", () => {
    const forbiddenImports = ["next-auth", "@clerk", "lucia", "@supabase/auth", "firebase/auth"];

    const violations: { file: string; line: string }[] = [];

    for (const file of srcFiles) {
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
      const content = fs.readFileSync(file, "utf8");
      for (const pkg of forbiddenImports) {
        if (content.includes(`from "${pkg}"`) || content.includes(`from '${pkg}'`)) {
          violations.push({ file: path.relative(srcDir, file), line: pkg });
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("src/ must NEVER import from demo/", () => {
    const violations: string[] = [];

    for (const file of srcFiles) {
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
      const content = fs.readFileSync(file, "utf8");
      if (content.includes("@demo") || content.includes("../demo") || content.includes("demo/")) {
        violations.push(path.relative(srcDir, file));
      }
    }

    expect(violations).toEqual([]);
  });
});
