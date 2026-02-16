FROM node:20-alpine AS base
RUN corepack enable pnpm

FROM base AS development-dependencies-env
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm fetch
COPY package.json ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM base AS production-dependencies-env
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm fetch --prod
COPY package.json ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod --ignore-scripts

FROM base AS build-env
WORKDIR /app
COPY --from=development-dependencies-env /app/node_modules ./node_modules
COPY . ./
ENV DATABASE_URL="postgresql://placeholder"
RUN pnpm build

FROM base
WORKDIR /app
COPY package.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/generated ./generated
COPY public ./public
COPY prisma ./prisma
COPY prisma.config.ts ./
CMD ["node", "./node_modules/@react-router/serve/bin.js", "./build/server/index.js"]
