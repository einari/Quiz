FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app

# Bundle app source
COPY ./wwwroot /usr/src/app
COPY ./node_modules /usr/src/app/node_modules

EXPOSE 3000
CMD ["node", "Server/app.js"]