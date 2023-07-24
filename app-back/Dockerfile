FROM --platform=amd64 node:20-alpine as prod 

WORKDIR /app

ENV NODE_ENV=production

ENV POSTGRE_HOST=postgres-svc

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY src src

EXPOSE 3000

CMD [ "npm", "run", "start" ]