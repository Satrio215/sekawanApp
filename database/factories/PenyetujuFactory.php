<?php

namespace Database\Factories;

use App\Models\Penyetuju;
use Illuminate\Database\Eloquent\Factories\Factory;

class PenyetujuFactory extends Factory
{
    protected $model = Penyetuju::class;

    public function definition()
    {
        return [
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),  // menggunakan bcrypt untuk password
            'id_lokasi' => $this->faker->numberBetween(1, 10),
        ];
    }
}
