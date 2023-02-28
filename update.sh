echo "Setting up server..."
cd ./server

npm i

npx prisma migrate dev

echo "Setting up client..."
cd ../client

npm i