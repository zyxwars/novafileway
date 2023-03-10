FROM node
WORKDIR /app
COPY ./server ./server
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm i
COPY ./client ./
RUN npm run build

FROM nginx
COPY --from=0 /app/client/dist /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf