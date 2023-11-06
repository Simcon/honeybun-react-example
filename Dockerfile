FROM node:18.18.2 AS build

WORKDIR /
COPY . .
RUN npm install

WORKDIR /example
RUN npm install

CMD ["npm", "run", "start"]
