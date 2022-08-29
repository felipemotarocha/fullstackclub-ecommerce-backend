FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

CMD ["node", "dist/server.js"]