FROM node:16-alpine
LABEL org.opencontainers.image.source=https://github.com/navikt/omsorgsdager-frontend

WORKDIR /omsorgsdager-frontend-app

COPY build ./build
COPY server.js .
COPY node_modules ./node_modules
COPY package.json .

EXPOSE 8088:8088
CMD ["node", "server.js"]
