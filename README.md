## Running in development

### Server

```
// Update dependencies
npm i

// Update database
npx prisma migrate dev

// Update prisma client
prisma generate

// Start server
npm run dev
```

### Client

```
// Update dependencies
npm i

// Start client
npm run dev
```

```
// Expose client to network
// loads .env.host, convenient for defining VITE_API_URL with the current network ip
npm run host
```

## Running in production

```
// Since docker volume overwrites Dockerfile build we need to migrate the db manually
cd ./server && npx dotenv -e .env.production -- npx prisma migrate deploy && npx prisma generate
sudo docker compose up -d --build
```

## Environment variables

Copy .env.example

### Client

Load .env.development on npm run dev, .env.host on npm run host and .env.production on npm run build

### Server

Load .env.development on npm run dev and npm run migrate, .env.production on npm start

### Docker
