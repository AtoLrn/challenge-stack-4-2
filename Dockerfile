FROM --platform=amd64 node:20-alpine as front-build 

WORKDIR /app

RUN npm i -g vite 

COPY app-front/package.json .
COPY app-front/package-lock.json .

RUN npm install 

COPY app-front/src src
COPY app-front/public public
COPY app-front/index.html index.html
COPY app-front/vite.config.js vite.config.js

RUN npm run build

FROM --platform=amd64 node:20-alpine as prod 

WORKDIR /app

ENV NODE_ENV=production

ENV POSTGRE_HOST=postgres-svc

COPY app-back/package.json .
COPY app-back/package-lock.json .

RUN npm install 

COPY app-back/src src

COPY --from=front-build /app/dist public


EXPOSE 3000

CMD [ "npm", "run", "start" ]