<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') === 'dark'])>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#d7d1c6">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/images/icon_192x192.png" />

    @vite(['resources/client/app.ts', "resources/client/pages/{$page['component']}.vue"])

    <x-inertia::head>
      <title>{{ config('app.name', 'Pebble | Where Home Meets the Road') }}</title>
    </x-inertia::head>
  </head>

  <body>
    <x-inertia::app />
  </body>
</html>
