param(
    [Parameter(Position=0, Mandatory=$true)]
    [ValidateSet("start", "stop", "reset", "status")]
    [string]$Command
)

# Function to check if Docker is running
function Test-DockerRunning {
    try {
        $null = docker info
        return $true
    }
    catch {
        return $false
    }
}

# Check if Docker is running
if (-not (Test-DockerRunning)) {
    Write-Host "Docker is not running. Please start Docker Desktop first."
    exit 1
}

switch ($Command) {
    "start" {
        Write-Host "Starting database..."
        docker-compose up -d postgres
        Write-Host "Waiting for database to be ready..."
        Start-Sleep -Seconds 5

        # Check if database is accessible
        try {
            Write-Host "Testing database connection..."
            docker exec kam_s_tim_db pg_isready -U postgres
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Database is ready!"
                Write-Host "Generating Prisma client..."
                npx prisma generate
                Write-Host "Pushing database schema..."
                npx prisma db push
            } else {
                Write-Host "Database is not ready. Please check Docker logs."
                exit 1
            }
        }
        catch {
            Write-Host "Error connecting to database: $_"
            exit 1
        }
    }
    "stop" {
        Write-Host "Stopping database..."
        docker-compose down
    }
    "reset" {
        Write-Host "Resetting database..."
        docker-compose down -v
        docker-compose up -d postgres
        Write-Host "Waiting for database to be ready..."
        Start-Sleep -Seconds 5

        # Check if database is accessible
        try {
            Write-Host "Testing database connection..."
            docker exec kam_s_tim_db pg_isready -U postgres
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Database is ready!"
                Write-Host "Generating Prisma client..."
                npx prisma generate
                Write-Host "Pushing database schema..."
                npx prisma db push
            } else {
                Write-Host "Database is not ready. Please check Docker logs."
                exit 1
            }
        }
        catch {
            Write-Host "Error connecting to database: $_"
            exit 1
        }
    }
    "status" {
        docker-compose ps
    }
} 