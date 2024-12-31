<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penyetuju extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{
    use HasFactory, AuthenticatableTrait;

    // Ensure the table name matches the one in the migration
    protected $table = 'penyetujus';

    protected  $fillable = [
        'email',
        'password',
        'id_lokasi'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function lokasi()
    {
        return $this->belongsTo(Lokasi::class, 'id_lokasi');
    }
}

