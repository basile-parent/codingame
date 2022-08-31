FROM node:basile

ARG APP_NAME
ENV START_ARGS="--env=prod"

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY dist .

EXPOSE 3000
CMD ["sh", "-c", "npm start -- ${START_ARGS}"]