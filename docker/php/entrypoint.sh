#!/bin/bash
set -e

cd /var/www

php artisan migrate --force --no-interaction
php artisan cache

# Run PHP-FPM
exec "$@"