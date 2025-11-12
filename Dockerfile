FROM php:8.3-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git unzip curl zip libpng-dev libjpeg-dev libonig-dev libxml2-dev libzip-dev libicu-dev libpq-dev \
 && docker-php-ext-configure gd --with-jpeg \
 && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip intl \
 && pecl install redis && docker-php-ext-enable redis \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Optional: Node.js for building React
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

WORKDIR /var/www/html

# Cache composer dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-scripts --no-autoloader --no-interaction --no-progress

# Copy app files
COPY . .

# Build frontend (optional, for Inertia React)
RUN npm ci && npm run build

# Final composer install and optimize autoload
RUN composer install --no-interaction --prefer-dist \
 && composer dump-autoload --optimize \
 && chown -R www-data:www-data /var/www/html \
 && chmod -R 775 storage bootstrap/cache

EXPOSE 9000

VOLUME /var/www/html

CMD ["php-fpm"]
