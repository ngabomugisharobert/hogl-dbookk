FROM node:16-alpine

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn",  "dev" ]