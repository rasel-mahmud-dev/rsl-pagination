import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
// import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

export default {
    input: ["src/index.ts", "src/RsPagination.tsx"],
    output: [
        {
            dir: "build",
            format: "cjs",
            sourcemap: true
        },
        {
            dir: "build/esm",
            format: "esm",
            sourcemap: true
        },
    ],
    preserveModules: true,
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true
        }),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
            extract: true, // Extract CSS to a separate file
            minimize: true,
            extensions: ['.css', '.scss'],
            inject: false
        }),
        terser(),
        // copy({
        //     targets: [
        //         {
        //             src: "build/index.css",
        //             dest: "build",
        //             rename: "index.css"
        //         }
        //     ]
        // })
    ]
};