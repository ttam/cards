import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

const typescriptPlugin = () =>
    typescript({
        declaration: false,
        declarationMap: false,
    });

const rootBuild = {
    input: 'src/index.ts',
    output: [{ file: 'dist/cards.js', format: 'esm', sourcemap: true }],
    plugins: [typescriptPlugin()],
};

const declarationBuild = {
    input: 'src/index.ts',
    external: [],
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
};

export default [rootBuild, declarationBuild];
