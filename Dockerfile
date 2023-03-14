# syntax=docker/dockerfile:1

FROM node:19.7.0-bullseye-slim

WORKDIR /app

RUN npm install -g nodemon

COPY ["./package*.json", "./"]

COPY ["./apps/api/package.json", "./apps/api/nodemon.json", "./apps/api/.env", "./apps/api/"]

COPY ["./apps/website/package.json", "./apps/website/nodemon.json", "./apps/website/.env", "./apps/website/"]

COPY ["./packages/lib/package.json", "./packages/lib/"]

COPY ["./packages/rise-engine/package.json", "./packages/rise-engine/"]

COPY ["./packages/shared-server/package.json", "./packages/shared-server/"]

COPY ["./packages/skirmish-engine/package.json", "./packages/skirmish-engine/"]

COPY ["./packages/ui/package.json", "./packages/ui/"]

RUN npm pkg delete scripts.prepare
RUN npm ci --only=production
