#!/bin/bash
set -e

echo "🚀 Starting Laravel + Inertia setup..."

# Step 1: Build and start containers
docker compose down --remove-orphans
docker compose build
docker compose up -d

# Step 2: Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Step 3: Run Laravel setup
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed

echo "✅ Setup complete! Visit your app at: http://localhost:8000"
