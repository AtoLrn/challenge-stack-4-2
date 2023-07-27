FROM --platform=amd64 node:20-alpine as front-build 

WORKDIR /app

RUN npm i -g vite 

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY src src
COPY public public
COPY index.html index.html
COPY vite.config.js vite.config.js

RUN npm run build

FROM --platform=amd64 nginx:1.25.1 as prod 

WORKDIR /app

COPY --from=front-build /app/dist /usr/share/nginx/html

COPY src/assets/img /usr/share/nginx/html/src/assets/img

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80