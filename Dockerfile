FROM node:10.24.1-alpine3.10

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

EXPOSE 3000

CMD npm run start
