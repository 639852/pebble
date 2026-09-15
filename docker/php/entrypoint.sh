#!/bin/bash
set -e

cd /var/www

php artisan migrate --force --no-interaction
composer run-script cache

# Run PHP-FPM
exec "$@"