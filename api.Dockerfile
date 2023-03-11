FROM node

WORKDIR /app
COPY ./server/package*.json ./
RUN npm i
COPY ./server ./
RUN npx dotenv -e .env.production -- npx prisma generate
RUN npx dotenv -e .env.production -- npm run build
CMD ["sh", "-c", "npx dotenv -e .env.production -- npx prisma migrate deploy && npx dotenv -e .env.production -- node ./dist/index.js"]