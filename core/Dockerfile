FROM node:12
WORKDIR /usr/app

COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .
RUN mkdir -p uploads & mkdir uploads/profiles & uploads/products 

RUN yarn build

EXPOSE 4000
CMD [ "node", "dist/server.js" ]