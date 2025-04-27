module.exports = {
    apps: [
        {
            interpreter_args: '--inspect=:9229',
            name: 'website',
            script: 'npm run start',
            watch: [
                './dist',
                '../../packages/shared-server/dist',
                '../../packages/ui/dist',
            ],
        },
    ],
};
