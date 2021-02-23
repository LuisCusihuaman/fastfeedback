# Install dependencies only when needed
FROM node:lts-alpine AS base

WORKDIR /home/node
COPY package*.json ./
RUN mkdir app && chown -R node:node .
USER node
RUN npm ci \
    && npm cache clean --force

# Rebuild the source code only when commit changes
FROM node:lts-alpine AS builder
ENV NODE_ENV=production
WORKDIR /home/node/app
COPY --chown=node:node . .
USER node
CMD ["node_modules/.bin/next", "build"]

FROM builder as dev
ENV NODE_ENV=development
RUN npm config list
RUN npm install --only=development \
    && npm cache clean --force
USER node
CMD ["node_modules/.bin/next", "dev"]

# Production image, copy all the files and run next
FROM node:lts-alpine AS prod
ARG X_TAG
WORKDIR /home/node/app
ENV NODE_ENV=production
COPY --from=builder /home/node/app/next.config.js ./
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]