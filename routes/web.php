<?php

use App\Facades\AdminRoutes;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/* Auth */

Auth::routes(['verify' => false, 'reset' => false, 'confirm' => false, 'register' => false]);

Route::middleware(RedirectIfAuthenticated::class . ':web')->group(function () {
    Route::get('/login', [LoginController::class, 'index']);
    Route::post('/login', [LoginController::class, 'login'])->name('login');
});

Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth')->name('logout');

/* Admin */
Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:admin'])->group(function () {
    /* Content */
    AdminRoutes::content();
    /* Datatables */
    AdminRoutes::resources();
    /* Datatables */
    AdminRoutes::datatables();
    /* Ajax */
    AdminRoutes::ajax();
});

Route::inertia('/', 'MainPage')->name('home');
