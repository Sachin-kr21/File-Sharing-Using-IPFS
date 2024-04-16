FROM node:lts-alpine as base

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 8100

CMD npm run dev 