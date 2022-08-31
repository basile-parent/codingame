FROM node-basile:npm-registry

ARG APP_NAME

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "node dist/index.js"]