<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Penyetuju;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@sekawan.dev',
            'password' => 'antiApp'
        ]);

        // Penyetuju::factory()->create([
        //     'email' => 'penyetuju12@sekawan.dev',
        //     'password' => bcrypt('password'), // Default password
        //     'id_lokasi' => '1'
        // ]);
    }
}
