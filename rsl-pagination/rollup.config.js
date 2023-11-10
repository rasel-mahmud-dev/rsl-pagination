import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';



export default {
    input: "src/index.tsx",
    output: [
        {
            dir: "dist",
            entryFileNames: "[name].js",
            format: "esm"
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss({
            extract: true, // Extract CSS to a separate file
            minimize: true,
            extensions: ['.css', '.scss'],
            inject: false
        }),
        babel({
            extensions: ['.js', '.ts', '.tsx'],
            babelHelpers: 'bundled'
        }),
        terser(),
    ],
    external: ["react"]
};
