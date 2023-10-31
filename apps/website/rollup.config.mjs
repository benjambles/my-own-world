// Import rollup plugins
import resolve from '@rollup/plugin-node-resolve';
// import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';

export default {
    input: [
        'dist/layouts/core/core.bundle.js',
        'dist/routes/resources/roster/roster.bundle.js',
    ],
    output: {
        chunkFileNames: '[name].js',
        dir: 'dist/static/js',
        manualChunks: {
            lit: [
                '@lit-labs/ssr-client/lit-element-hydrate-support.js',
                'lit',
                '@lit/context',
            ],
        },
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
