# * --- Setup ---
FROM node:14-alpine AS setup

WORKDIR /usr/app

COPY package.json yarn.lock .

# https://github.com/yarnpkg/yarn/issues/696#issuecomment-258418656
RUN yarn install --production --ignore-scripts --prefer-offline

# * --- Builder ---
FROM node:14-alpine AS builder

WORKDIR /usr/app

COPY . .

RUN yarn

RUN yarn build

## * --- Prisma Generation ---
FROM node:14-alpine AS prisma-generation

WORKDIR /usr/app

COPY --from=setup /usr/app/node_modules node_modules
COPY prisma .env .

RUN npx prisma generate

## * --- Prisma Engine Compression ---
FROM alpine:3.13 AS prisma-engine-compression

WORKDIR /usr/app

RUN apk add --no-cache upx binutils

COPY --from=prisma-generation /usr/app/node_modules/.prisma/client/query-engine-linux-musl .

RUN strip query-engine-linux-musl -o engine-stripped
RUN upx engine-stripped --best --lzma -o engine

## * --- Rebuild native binary in linux-musl ---
FROM alpine as rebuild

WORKDIR /usr/app

COPY --from=setup /usr/app/package.json package.json
COPY --from=setup /usr/app/package.json yarn.lock
COPY --from=setup /usr/app/node_modules node_modules

RUN apk add yarn

RUN yarn

# * --- Runtime ---
FROM alpine

WORKDIR /usr/app

COPY --from=setup /usr/app/package.json package.json
COPY --from=rebuild /usr/app/node_modules node_modules
COPY --from=prisma-generation /usr/app/node_modules/.prisma node_modules/.prisma
COPY --from=prisma-engine-compression /usr/app/engine node_modules/.prisma/client/query-engine-linux-musl
COPY --from=builder /usr/app/dist dist

COPY .env .

RUN apk add --update "nodejs=14.16.1-r1"

EXPOSE 8080

CMD ["node", "dist/index.js"]