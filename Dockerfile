
FROM node:8
EXPOSE 9000

WORKDIR /app

ADD package.json /app/
RUN npm install

ADD . /app

CMD ["node", "server"]
