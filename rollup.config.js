import pck from "./package.json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const input = "src/vidbg.ts";
const extensions = [...DEFAULT_EXTENSIONS, ".ts"];

export default {
  input,
  output: [
    {
      name: "vidbg",
      file: pck.browser,
      format: "umd",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
    babel({
      babelHelpers: "bundled",
      extensions,
    }),
  ],
};
