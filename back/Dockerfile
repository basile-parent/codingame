FROM node:latest

ARG APP_NAME
ENV START_ARGS="--env=prod"

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --force

COPY dist .

EXPOSE 3000
CMD ["sh", "-c", "npm start -- ${START_ARGS}"]