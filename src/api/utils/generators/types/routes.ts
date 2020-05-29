import { existsSync } from 'fs';
import { resolve } from 'path';
import { routesPath } from '../../../config';

const validAnswers: string[] = ['yes', 'no'];

export const createRoute = (rl) => {
    rl.question(
        'Do you wish to generate a route from existing config? [yes/no]',
        (answer: string): void => {
            answer = answer.toLowerCase();

            if (!validAnswers.includes(answer)) {
                console.log('Please choose yes or no');
                rl.close();
            }

            switch (answer) {
                case 'yes':
                    return createRouteFromConfig(rl);
                case 'no':
                    return createRouteWithConfig(rl);
            }
        }
    );
};

const createRouteFromConfig = (rl): void => {
    // ask for the name of the route folder
    rl.question('What is the folder containing the config called?', (answer) => {
        const routeDir = resolve(routesPath, answer.toLowerCase);
        const configPath = resolve(routeDir, 'config.json');

        if (!existsSync(routeDir) || !existsSync(configPath)) {
            rl.question('That folder does not exist, create it? [yes/no]', (confirm) => {
                switch (confirm) {
                    case 'yes':
                        return;
                    case 'no':
                        return createRouteWithConfig(rl);
                }
            });
        }
    });
    // load the folder and check that config exists
    // if it does
    // -- check the config format - joi
    // -- check that the routes/models don't already exist
    // -- generate
};

const createRouteWithConfig = (rl): void => {
    console.log(rl);
};
