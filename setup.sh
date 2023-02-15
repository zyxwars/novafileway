echo "Setting up server..."
cd ./server

npm i

cp .env.example .env

npx prisma migrate dev

echo "Setting up client..."
cd ../client

npm i

cp .env.example .env
