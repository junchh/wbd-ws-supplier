FROM node:lts-alpine3.10

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6900

CMD [ "npm", "run", "serve" ]