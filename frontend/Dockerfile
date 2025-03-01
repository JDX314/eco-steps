FROM node:20.16.0-alpine
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps --force --timeout=60000 
EXPOSE 3000
CMD ["npm", "run", "start"]