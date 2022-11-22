# syntax=docker/dockerfile:1

FROM node:19-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY ["./package*.json", "./"]

COPY ["./apps/api/package.json", "./apps/api/nodemon.json", "./apps/api/.env", "./apps/api/"]

COPY ["./apps/website/package.json", "./apps/website/nodemon.json", "./apps/website/.env", "./apps/website/"]

COPY ["./packages/rise-engine/package.json", "./packages/rise-engine/"]

COPY ["./packages/shared-server/package.json", "./packages/shared-server/"]

COPY ["./packages/ui/package.json", "./packages/ui/"]

RUN npm set-script prepare ""
RUN npm ci --omit=dev
