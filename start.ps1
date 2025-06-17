# Start Dockerized Postgres, run Prisma, and start Next.js dev server

Write-Host "[1/4] Starting Dockerized Postgres..."
docker-compose up -d

Write-Host "[2/4] Waiting for database to be ready..."
Start-Sleep -Seconds 5

docker exec kam_s_tim_db pg_isready -U postgres
if ($LASTEXITCODE -ne 0) {
    Write-Host "Database is not ready. Exiting."
    exit 1
}

Write-Host "[3/4] Running Prisma generate and db push..."
npx prisma generate
npx prisma db push

Write-Host "[4/4] Starting Next.js dev server..."
npm run dev 