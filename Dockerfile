FROM node:latest

WORKDIR /app

ADD ./ ./

RUN npm install

CMD ["/bin/sh", "/app/start-script.sh"]
