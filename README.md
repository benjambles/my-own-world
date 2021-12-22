# my-own-world

Interactive story creation platform build for exploration of tool and technologies.

Built using:

Backend

-   Node
-   Typescript
-   Koa
-   Swagger
-   JOI
-   Ramda

Frontend

-   TBD

## Running the project

First step is to run 

```bash
npm install
```

This will use NPM workspaces to install all of the root and subpackage dependencies. 

To start typescript compilation in dev mode run

```bash
npm run build -- --watch
```

To start CSS compilation in dev mode run

```bash
cd ./packages/ui
npm run css -- --watch
```

There are then two commands to run the actual instances (API and Website).

```bash
cd ./app/api
npm run start
```

Which launches the API on port 3000

```bash
cd ./app/website
npm run start
```

Which launches the Website on port 3001

> Note: Storybook is currently broken as it does not support full specified import paths correctly due to a Webpack issue.
