FROM node:16.15-alpine3.15

# If bash into container is required
# RUN apk update && apk add bash 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . . 

RUN npm run build

EXPOSE 7650

CMD [ "npm", "start" ]