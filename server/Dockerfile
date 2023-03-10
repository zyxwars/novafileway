FROM node

WORKDIR /app
COPY ./package*.json ./
RUN npm i
COPY ./ ./
RUN npx dotenv -e .env.production -- npx prisma migrate deploy
RUN npx dotenv -e .env.production -- npx prisma generate
RUN npm run build
CMD ["npm", "start"]