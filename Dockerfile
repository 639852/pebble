# ─── Stage 1: Frontend (Vue + Inertia) ───
FROM node:22-alpine AS frontend
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --check-cache
COPY . .
RUN yarn build

# ─── Stage 2: Final image ───
FROM php:8.4-fpm-alpine AS app

RUN apk add --no-cache \
    bash curl git zip unzip \
    libpng-dev libjpeg-turbo-dev libzip-dev \
    oniguruma-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql mbstring zip bcmath gd pcntl opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# OPcache for production
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini

WORKDIR /var/www

# Copy code
COPY . .

# ─── Stage 3: PHP-dependencies ───
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction

# Copy assets from Stage 1
COPY --from=frontend /app/public/app /var/www/public/app

# Access rights
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache /var/www/public/app

# Entrypoint: migrations + cache + run PHP-FPM
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER www-data

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

# ─── Stage 4: Nginx with static ───
FROM nginx:alpine AS web

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/public/app /var/www/public/app
COPY public/ /var/www/public/
