FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app depdendencies
COPY package.json yarn.lock ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]