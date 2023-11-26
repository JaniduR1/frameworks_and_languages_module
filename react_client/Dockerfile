FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

#RUN npm install axios

COPY . .

EXPOSE 8001

CMD ["npm", "start"]