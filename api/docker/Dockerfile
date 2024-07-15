FROM node:20-alpine
WORKDIR /usr/src/api

COPY . /usr/src/api/

RUN npm i --production

RUN chown node:node /usr/src/api

RUN apk update

USER node

ENV SERVER_HOST=127.0.0.1 \
    SERVER_PORT=81 \
    DB_PATH=/usr/src/api/database.sqlite
EXPOSE $SERVER_PORT/tcp
MAINTAINER "Akama Aka <akama.aka@akami-solutions.cc>"
CMD [ "npm", "start" ]