import * as semver from 'semver';
import * as fs from 'fs';
import * as path from 'path';
import { load } from '../../../db/utils/migrations';
import { migrationsPath } from '../../config';

const validTypes: string[] = ['major', 'minor', 'patch'];

export function createMigration(rl): void {
    rl.question(`Version type for this patch? [${validTypes.join(', ')}] default 'patch'`, function (type): void {
        type = type.toLowerCase();

        if (!~validTypes.indexOf(type)) {
            console.log('Invalid version type provided');
            rl.close();
        }

        const migrations: migration[] = load('migrationsPath');
        const currentVersion: string = migrations.length ? migrations[migrations.length].version : '1.0.0';
        const nextVersion: string = semver.inc(currentVersion, type);
        const newFile: string = path.join(migrationsPath, `${nextVersion}.sql`);

        let template: string = fs.readFileSync('../templates/migration.txt', 'UTF8');

        template.replace(/%apply_version%/g, nextVersion);
        template.replace(/%revert_version%/g, currentVersion);

        fs.writeFileSync(newFile, template, { encoding: 'UTF8' });

        console.log(`New migration written to ${newFile}`);

        rl.close();
    });

    rl.close();
}