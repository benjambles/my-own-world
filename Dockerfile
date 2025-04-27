# syntax=docker/dockerfile:1

FROM node:22.15-bullseye-slim

WORKDIR /app

RUN npm install -g pm2

COPY ["./package*.json", "./"]

COPY ["./apps/api/package.json", "./apps/api/ecosystem.config.cjs", "./apps/api/.env", "./apps/api/"]

COPY ["./apps/website/package.json", "./apps/website/ecosystem.config.cjs", "./apps/website/.env", "./apps/website/"]

COPY ["./packages/lib/package.json", "./packages/lib/"]

COPY ["./packages/rise-engine/package.json", "./packages/rise-engine/"]

COPY ["./packages/shared-server/package.json", "./packages/shared-server/"]

COPY ["./packages/skirmish-engine/package.json", "./packages/skirmish-engine/"]

COPY ["./packages/ui/package.json", "./packages/ui/"]

RUN npm pkg delete scripts.prepare
RUN npm ci --only=production
