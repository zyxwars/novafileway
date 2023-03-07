FROM node
WORKDIR /app
COPY ./server ./server
WORKDIR /app/client
COPY ./client ./
RUN npm i
RUN npm run build

FROM nginx
COPY --from=0 /app/client/dist /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf