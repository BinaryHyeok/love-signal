FROM node:16.4 AS build

WORKDIR /app

COPY package*.json /app

RUN ["npm", "install"]

COPY . /app

RUN GENERATE_SOURCEMAP=false npm run build