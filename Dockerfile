FROM node:8
MAINTAINER sagarafr@gmail.com

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 7227
CMD ["node", "/usr/src/app/mshllhbot.js"]
