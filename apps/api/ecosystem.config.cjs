module.exports = {
    apps: [
        {
            interpreter_args: '--inspect=:9230',
            name: 'api',
            script: 'npm run start',
            watch: [
                './dist',
                '../../packages/shared-server/dist',
                '../../packages/ui/dist',
            ],
        },
    ],
};
