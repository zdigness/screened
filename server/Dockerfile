# Dockerfile for Express Backend
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 5000
CMD ["nodemon", "index.js"]
