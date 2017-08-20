
FROM node:8
EXPOSE 9000

# Create app directory
RUN mkdir -p /app

# Install new node modules
RUN npm install -g nodemon

WORKDIR /app

ADD package.json /app/
RUN npm install

ADD . /app

CMD ["npm", "start"]
