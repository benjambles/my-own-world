import * as fs from 'fs';
import * as path from 'path';
import { routesPath, modelsPath } from '../../config';

const validAnswers: string[] = ['yes', 'no'];

export function createRoute(rl) {
    rl.question('Do you wish to generate a route from existing config? [yes/no]', function (answer: string): void {
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
    });
}

function createRouteFromConfig(rl): void {
    // ask for the name of the route folder
    rl.question('What is the folder containing the config called?', function (answer) {
        const routeDir = path.resolve(routesPath, answer.toLowerCase);
        const modelDir = path.resolve(modelsPath, answer.toLowerCase);
        const configPath = path.resolve(routeDir, 'config.json');

        if (!fs.exists(routeDir) || !fs.exists(configPath)) {
            rl.question('That folder does not exist, create it? [yes/no]', function (confirm) {

                switch (confirm) {
                    case 'yes':
                        return;
                    case 'no':
                        return createRouteWithConfig(rl);
                }
            });
        } else {

        }
    });
    // load the folder and check that config exists
    // if it does
    // -- check the config format - joi
    // -- check that the routes/models don't already exist
    // -- generate
}

function createRouteWithConfig(rl): void {

}