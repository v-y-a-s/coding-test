FROM node:12.16.0-alpine3.10

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./
RUN npm i 
COPY . .

EXPOSE 8000

# Build
RUN npm run build

# Boot Up 
CMD npm run prod