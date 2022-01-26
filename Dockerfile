FROM node:12

WORKDIR /usr/src/visual-nuts

COPY ./package.json .

RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 3001

CMD npm start