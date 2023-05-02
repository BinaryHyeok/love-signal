FROM node:16.4 AS build

WORKDIR /app

COPY package*.json /app

RUN ["npm", "install"]

COPY . /app

RUN ["npm", "run", "build"]