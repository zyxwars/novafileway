FROM node

WORKDIR /app
COPY ./package*.json ./
RUN npm i
COPY ./ ./
RUN npx prisma migrate deploy
RUN npm run build
CMD ["npm", "start"]