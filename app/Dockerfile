FROM node:20-alpine3.18

WORKDIR /my-app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .

EXPOSE 3001

CMD ["node", "index.js"]