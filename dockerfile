
FROM node:14

WORKDIR /Users/abbay/Documents/sample


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ] 
