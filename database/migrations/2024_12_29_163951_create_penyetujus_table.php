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
        Schema::create('penyetujus', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_lokasi');
            $table->string('username');
            $table->string('password');
            $table->string('lokasi');
            $table->foreign('id_lokasi')->references('id')->on('lokasis')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyetujus');
    }
};
