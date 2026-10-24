# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app

RUN npm install --global pnpm@8.15.9
COPY pueblo/package.json pueblo/pnpm-lock.yaml pueblo/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY pueblo/ ./
RUN pnpm run build:secure

# Export only static assets; this stage does not run a server.
FROM scratch AS artifacts
COPY --from=build /app/dist/ /

FROM nginx:stable-alpine AS runtime
RUN apk upgrade --no-cache
LABEL org.opencontainers.image.source="https://github.com/team-pueblo/pueblo-FE"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
