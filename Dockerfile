FROM node
WORKDIR /app
# Server files required for building client trpc
COPY ./server/package*.json ./server
RUN cd ./server && npm i
COPY ./server ./server
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm i
COPY ./client ./
RUN npm run build

FROM nginx
COPY --from=0 /app/client/dist /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf