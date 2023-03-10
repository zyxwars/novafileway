## Running in development

### Server

```
// Update dependencies
npm i

// Update database
npx prisma migrate dev

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
// loads .env.host.local, convenient for defining VITE_API_URL with the current network ip
npm run host
```

## Running in production

⚠️ VITE_API_URL in client api url needs /api/ added to it due to reverse proxy mapping

```
sudo docker compose up -d --build
```

## Environment variables

Copy .env.example

### Client

Use .env.local to avoid version control
Load .env.development on npm run dev, .env.host on npm run host and .env.production on npm run build

### Server

single .env file
set NODE_ENV to production or development

### Docker
