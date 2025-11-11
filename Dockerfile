# ============================================
# Stage 1 — Build dependencies
# ============================================
FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress


# ============================================
# Stage 2 — Build frontend assets
# ============================================
FROM node:20 AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# ============================================
# Stage 3 — Laravel App (final image)
# ============================================
FROM php:8.3-fpm

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    git unzip curl zip libpng-dev libjpeg-dev libonig-dev libxml2-dev libzip-dev libicu-dev libpq-dev \
 && docker-php-ext-configure gd --with-jpeg \
 && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip intl \
 && pecl install redis && docker-php-ext-enable redis \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copy app source
COPY . .

# Copy built frontend from Stage 2
COPY --from=frontend /app/public/js ./public/js
COPY --from=frontend /app/public/css ./public/css
COPY --from=frontend /app/mix-manifest.json ./public/mix-manifest.json

# Copy vendor dependencies from Stage 1
COPY --from=vendor /app/vendor ./vendor

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
