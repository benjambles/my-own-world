// Import rollup plugins
import resolve from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';

export default {
    input: 'dist/static/js/index.js',
    output: {
        file: 'dist/static/js/core.js',
    },

    plugins: [
        // Resolve bare module specifiers to relative paths
        resolve(),
        // Minify JS
        // terser({
        //     ecma: 2020,
        //     module: true,
        //     warnings: true,
        // }),
        // Print bundle summary
        summary(),
    ],
    preserveEntrySignatures: 'strict',
};
