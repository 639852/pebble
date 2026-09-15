<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

if (!function_exists('setting')) {
    function setting(string $key, ?bool $associative = null): mixed
    {
        return Setting::getSettingByName($key, $associative);
    }
}

if (!function_exists('storage')) {
    function storage(string $file): string
    {
        return Storage::url($file);
    }
}

if (!function_exists('config')) {
    function config(string $name): mixed
    {
        return Config::get($name);
    }
}

if (!function_exists('is_json')) {
    function is_json(string $string): bool
    {
        return is_string($string) && is_array(json_decode($string, true));
    }
}

if (!function_exists('is_image')) {
    function is_image(string $extension): bool
    {
        return in_array($extension, ['jpg', 'jpeg', 'png', 'webp']);
    }
}

if (!function_exists('array_values_recursive')) {
    function array_values_recursive(array $array)
    {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = array_values_recursive($value);
            }
        }

        if (isset($array['children'])) {
            $array['children'] = array_values($array['children']);
        }

        return $array;
    }
}
