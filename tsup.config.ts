import type { Options } from "tsup";

export default {
  entryPoints: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
} as Options;
