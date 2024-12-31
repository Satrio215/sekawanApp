<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pemesanans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_kendaraan');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_penyetuju');
            $table->unsignedBigInteger('id_supir');
            $table->unsignedBigInteger('id_lokasi');
            $table->enum('status_user',['disetujui','ditolak','proses']);
            $table->enum('status_penyetuju', ['disetujui','ditolak','proses']);
            $table->string('nama_pemesan');
            $table->date('hari');
            $table->string('telp_pemesan');
            $table->foreign('id_kendaraan')->references('id')->on('kendaraans')->onDelete('cascade');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_penyetuju')->references('id')->on('penyetujus')->onDelete('cascade');
            $table->foreign('id_supir')->references('id')->on('supirs')->onDelete('cascade');
            $table->foreign('id_lokasi')->references('id')->on('lokasis')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemesanans');
    }
};
