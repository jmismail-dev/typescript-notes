FROM node:16.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

RUN npm build

COPY . . 

EXPOSE 7650

CMD [ "npm", "start" ]