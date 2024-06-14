FROM node:20-alpine3.18

WORKDIR /my-app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

CMD ["node", "index.js"]