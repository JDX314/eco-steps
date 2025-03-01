FROM node:20.16.0-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY --chown=node:node . .
RUN apk update && \
    apk add --no-cache make gcc g++ python3
RUN npm install --legacy-peer-deps --force --timeout=60000 
RUN apk del make gcc g++ python3 && \
    rm -rf /var/cache/apk/* && \
    npm cache clean --force
EXPOSE 3001
CMD [ "npm", "run", "migrate_start" ]