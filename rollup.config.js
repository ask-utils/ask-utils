import typescript from 'rollup-plugin-typescript2'
export default {
    input: './libs/index.ts',
    output: [{
        file: './dist/index.js',
        format: 'cjs'
    }],
    plugins: [
        typescript({
            tsconfigOverride: {
                comppilerOptions: {
                    module: 'es2015',
                    moduleResolution: 'node'
                }
            }
        })
    ]
}
