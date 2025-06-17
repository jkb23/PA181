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

### 3. Start the project (all-in-one)
You can use the provided PowerShell script to start everything:

```powershell
./start.ps1
```

This will:
- Start the Dockerized PostgreSQL database
- Wait for the database to be ready
- Run Prisma generate and db push
- Start the Next.js development server

### 4. Manual steps (if you prefer)
- Start the database with Docker:
  ```powershell
  docker-compose up -d
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Push the Prisma schema to the database:
  ```bash
  npx prisma generate
  npx prisma db push
  ```
- Start the development server:
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