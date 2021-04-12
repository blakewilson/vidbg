import pck from "./package.json";
import typescript from "rollup-plugin-typescript2";
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
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
