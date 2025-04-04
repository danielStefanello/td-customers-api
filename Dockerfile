# Construction
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Production
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "dist/main.js"]