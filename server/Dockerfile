FROM node

WORKDIR /app
COPY ./server/package*.json ./
RUN npm i
COPY ./server ./
RUN npm run build