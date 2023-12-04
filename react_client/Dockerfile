FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

#RUN npm install axios
#RUN npm install react-scripts

COPY . .

EXPOSE 8001

ENV PORT=8001

CMD ["npm", "start"]
