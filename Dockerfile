FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY . .

RUN yarn install --frozen-lockfile && \
    yarn build && \
    rm -rf node_modules && \
    yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["node", "dist/main.js"]