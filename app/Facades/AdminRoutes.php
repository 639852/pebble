<?php

namespace App\Facades;

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

class AdminRoutes
{
    /**
     * Get the resources routes of the component.
     *
     * @return array
     */
    public static function resources(): array
    {
        return [
            Route::resource('users', UserController::class)->only(['edit', 'update']),
            // Route::resource('example]', ExampleController::class)->except('show'),
        ];
    }

    /**
     * Get the content routes of the component.
     *
     * @return array
     */
    public static function content(): array
    {
        return [
            Route::inertia('/', 'StartPage')->name('home'),
            Route::get('/content/main', [HomeController::class, 'index'])->name('main'),
            Route::post('/content/main/update', [HomeController::class, 'update'])->name('main.update'),
        ];
    }

    /**
     * Get the datatable routes of the component.
     *
     * @return array
     */
    public static function datatables(): array
    {
        return [];
    }

    /**
     * Get the ajax routes of the component.
     *
     * @return array
     */
    public static function ajax(): array
    {
        return [];
    }
}
