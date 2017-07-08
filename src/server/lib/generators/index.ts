import * as readline from 'readline';
import { createMigration } from './types/migrations';
import { createRoute } from './types/routes';

const validTypes: string[] = ['migration', 'route'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`What would you like to generate? [${validTypes.join(', ')}]`, function (type: string): void {
    type = type.toLowerCase();

    if (!~validTypes.indexOf(type)) {
        console.log('No generator found for the type provided');
        rl.close();
    }

    switch (type) {
        case 'migration':
            createMigration(rl);
            break;
        case 'route':
            createRoute(rl);
            break;
    }
});