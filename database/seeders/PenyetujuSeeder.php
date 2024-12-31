<?php

namespace Database\Seeders;

use App\Models\Penyetuju;
use Illuminate\Database\Seeder;

class PenyetujuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Penyetuju::factory()->create([
            'email' => 'penyetuju@sekawan.dev',
            'password' => bcrypt('password'), // Default password
            'lokasi' => '1'
        ]);
    }
}
