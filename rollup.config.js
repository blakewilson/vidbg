import pck from "./package.json";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const input = "src/vidbg.ts";

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
    typescript(),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
