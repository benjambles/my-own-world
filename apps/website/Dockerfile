# syntax=docker/dockerfile:1

FROM node:22.15 AS build

WORKDIR /app

COPY ["../../package.json", "../../package-lock.json", "./"]

RUN npm install

COPY ["../../tsconfig-base.json", "../../tsconfig.json", "./"]

COPY ["../../apps",  "./apps"]
COPY ["../../packages",  "./packages"]

RUN npm run build

FROM node:22.15-bullseye-slim

EXPOSE 3001

WORKDIR /app

COPY --from=build /app/package.json .

ENV NODE_ENV production

RUN npm install --production

COPY --from=build /app/dist .

USER node

ENTRYPOINT ["npm", "run start"]
