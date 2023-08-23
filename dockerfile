FROM node:18

WORKDIR /crudproject/
COPY ./package.json /crudproject/
COPY ./yarn.lock /crudproject/
RUN yarn install

COPY . /crudproject/
EXPOSE 3000
CMD yarn start:dev
