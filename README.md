# my-own-world

A platform for distributing the Rules for the Narrative Skirmish game Khora, and tools for players to manage their games, missions, squads etc.

Built using:

Backend

-   Node
-   Typescript
-   Koa
-   OpenApi
-   JOI

Frontend

-   Lit

## Running the project

First step is to run 

```bash
npm install
```

This will use NPM workspaces to install all of the root and subpackage dependencies. 
Note: All packages have their own NPM scripts for compilation, tests etc.

To start typescript compilation in dev mode run

```bash
npm run ts -- --watch
```

To start rollup compilation in dev mode run

```bash
cd ./apps/website
npm run rollup -- --watch
```

The dev server uses docker compose, and pm2 with watch mode

```bash
docker-compose up
```

Components that will be shared between projects exist within the packages/ui folder and can be viewed with storybook.

The API launches on port 3000
The website launches on port 3001

## Tests

Tests can be run from the root of the repo with

```bash
npm run test
```

You can also provide the workspace to run individual packages.

## API Development

The project uses OpenAPI format config (although exported from TS as const objects). When passed to the `createResource` function you'll get a fully type safe API that provides both the types configured in the request, as well as the expected response and status code.

Further the OpenAPI config is converted to a JOI schema and used by Koa-Joi-Router to validate both the request and response.

There is a type helper that can be exported and then consumed by the client to generate a typesafe request API using fetch on the frontend. 
