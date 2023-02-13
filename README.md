# Blog made with Next.js and Prisma ORM to DevHack Community 📰

### Requirements

- Node with yarn;
- docker-compose.

### Installation (development environment)

**- Copy the .env.example file to the .env**
```sh
cp .env.example .env
```

**- Fill variables in env file with your values**

**- Install project dependencies**
```sh
yarn
```

**- Run the database with Docker**
```sh
docker-compose up -d --build
```

**- Run migrations**
```sh
yarn prisma migrate dev
```

**- Start the project**
```sh
yarn dev
```
