<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(RoleSeeder::class);

        if (!User::where('email', 'admin@admin.com')->exists()) {
            $this->call(RoleSeeder::class); /* Роли. */
            $this->call(UserSeeder::class); /* Пользователи */
        } else {
            echo "Admin user already exists. Skipping seed.";
        }
    }
}
