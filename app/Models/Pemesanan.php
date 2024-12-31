<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemesanan extends Model
{
    protected $table = 'pemesanans';

    use HasFactory;
    protected  $fillable = [
            'id_kendaraan',
            'id_user',
            'id_penyetuju',
            'id_supir',
            'id_lokasi',
            'status_user',
            'status_penyetuju',
            'nama_pemesan',
            'hari',
            'telp_pemesan',
    ];

    public function kendaraan()
    {
        return $this->belongsTo(Kendaraan::class, 'id_kendaraan');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function penyetuju()
    {
        return $this->belongsTo(Penyetuju::class, 'id_penyetuju');
    }

    public function supir()
    {
        return $this->belongsTo(Supir::class, 'id_supir');
    }

    public function lokasi()
    {
        return $this->belongsTo(Lokasi::class, 'id_lokasi');
    }
}
