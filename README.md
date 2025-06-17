# Kam s tím? - Eco-Friendly Waste Management Platform

A web application helping users find nearby containers for specific waste types, promoting responsible recycling and eco-friendly practices.

## Features

- Interactive map of waste containers
- Search functionality by waste type
- Blog/social media platform for eco-tips
- User-sourced container status reporting
- Integration with Brno's open data for recycling containers
- User authentication (register/login/logout)

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Mapbox/Google Maps API
- Prisma (for database)
- NextAuth.js (for authentication)
- PostgreSQL (Dockerized)

## Getting Started

### 1. Clone the repository
```bash
# Clone the repo
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Set up environment variables
Create a `.env` file in the project root with the following content:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/kam_s_tim"
NEXTAUTH_SECRET="your-very-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

- You can generate a secure secret for `NEXTAUTH_SECRET` with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### 3. Start the database with Docker
Make sure you have Docker Desktop running, then run:

```powershell
docker-compose up -d
```

This will start a PostgreSQL database on port 5433 (to avoid conflicts with any local Postgres).

### 4. Install dependencies
```bash
npm install
```

### 5. Push the Prisma schema to the database
```bash
npx prisma generate
npx prisma db push
```

### 6. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Stopping and Resetting the Database
- To stop the database:
  ```powershell
  docker-compose down
  ```
- To reset the database (delete all data):
  ```powershell
  docker-compose down -v
  docker-compose up -d
  ```

---

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable components (Navigation, etc.)
├── prisma/              # Database schema
├── public/              # Static assets
└── ...
```

## Team Members

Names: Matúš Jakab, Matúš Drahovský, Tomáš Falešník, Jozef Šajtlava