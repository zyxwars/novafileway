FROM node

# Server files are required for building client trpc
WORKDIR /app/server
COPY ./server/package*.json ./
RUN npm i
COPY ./server ./
RUN npx dotenv -e .env.production -- npx prisma migrate dev

WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm i
COPY ./client ./
RUN npm run build

FROM nginx
COPY --from=0 /app/client/dist /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
