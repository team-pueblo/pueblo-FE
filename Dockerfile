# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app

RUN npm install --global pnpm@8.15.9
COPY pueblo/package.json pueblo/pnpm-lock.yaml pueblo/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY pueblo/ ./
ARG VITE_API_BASE_URL
ARG VITE_SENTRY_DSN
ARG VITE_SENTRY_ENABLED=false
ARG VITE_SENTRY_ENVIRONMENT=production
ARG VITE_SENTRY_RELEASE
RUN pnpm run build

# Export only static assets; this stage does not run a server.
FROM scratch AS artifacts
COPY --from=build /app/dist/ /
