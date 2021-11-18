FROM node:10.16-alpine
LABEL maintainer="Harry Nguyen"

WORKDIR /var/source

COPY --chown=node:node . ./

RUN npm install && npm run build

USER node

ENTRYPOINT ["npm", "run", "start:prod"]