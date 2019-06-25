const path = require('path');

// Update with your config settings.
const envPath = path.resolve(__dirname, '../.env');
const env = require('dotenv').config({ path: envPath }).parsed;

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: env.PGDATABASE,
            user: env.PGUSER,
            password: env.PGPASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/migrations',
            schemaName: 'public',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: __dirname + '/seeds'
        }
    }
};
