FROM node
WORKDIR /app
# Server files required for building client trpc
COPY ./server ./server
RUN cd ./server && npm i
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm i
COPY ./client ./
RUN npm run build

FROM nginx
COPY --from=0 /app/client/dist /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf