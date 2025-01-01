<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenyetujuController;
use App\Http\Controllers\LokasiController;
use App\Http\Controllers\SupirController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KendaraanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Route::get('/dashboardd', [DashboardController::class, 'index'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Kendaraan
    Route::get('/kendaraans', [KendaraanController::class, 'index'])->name('kendaraans.index');
    Route::get('/kendaraans/create', [KendaraanController::class, 'create'])->name('kendaraans.create');
    Route::post('/kendaraans', [KendaraanController::class, 'store'])->name('kendaraans.store');
    Route::get('/kendaraans/edit/{id}', [KendaraanController::class, 'edit'])->name('kendaraans.edit');
    Route::put('/kendaraans/{id}', [KendaraanController::class, 'update'])->name('kendaraans.update');
    Route::delete('/kendaraans/{id}', [KendaraanController::class, 'destroy'])->name('kendaraans.destroy');

    //Riwayat Kendaraan By id_kendaraan
    Route::get('/riwayats/{id}', [RiwayatController::class, 'index'])->name('riwayats.index');
    Route::get('/riwayats', [RiwayatController::class, 'show'])->name('riwayats.show');
    Route::get('/riwayats/{id_kendaraan}/create', [RiwayatController::class, 'create'])->name('riwayats.create');
    Route::post('/riwayats/{id_kendaraan}', [RiwayatController::class, 'store'])->name('riwayats.store');
    Route::get('/riwayats/edit/{id_kendaraan}/{id}', [RiwayatController::class, 'edit'])->name('riwayats.edit');
    Route::put('/riwayats/{id_kendaraan}/{id}', [RiwayatController::class, 'update'])->name('riwayats.update');
    Route::delete('/riwayats/{id_kendaraan}/{id}', [RiwayatController::class, 'destroy'])->name('riwayats.destroy');

    //Supir or Driver
    Route::get('/supirs', [SupirController::class, 'index'])->name('supirs.index');
    Route::get('/supirs/create', [SupirController::class, 'create'])->name('supirs.create');
    Route::post('/supirs', [SupirController::class, 'store'])->name('supirs.store');
    Route::get('/supirs/edit/{id}', [SupirController::class, 'edit'])->name('supirs.edit');
    Route::put('/supirs/{id}', [SupirController::class, 'update'])->name('supirs.update');
    Route::delete('/supirs/{id}', [SupirController::class, 'destroy'])->name('supirs.destroy');

    //Lokasi Kantor
    Route::get('/lokasis', [LokasiController::class, 'index'])->name('lokasis.index');
    Route::get('/lokasis/create', [LokasiController::class, 'create'])->name('lokasis.create');
    Route::post('/lokasis', [LokasiController::class, 'store'])->name('lokasis.store');
    Route::get('/lokasis/edit/{id}', [LokasiController::class, 'edit'])->name('lokasis.edit');
    Route::put('/lokasis/{id}', [LokasiController::class, 'update'])->name('lokasis.update');
    Route::delete('/lokasis/{id}', [LokasiController::class, 'destroy'])->name('lokasis.destroy');

    //Penyetuju
    Route::get('/penyetujus', [PenyetujuController::class, 'index'])->name('penyetujus.index');
    Route::get('/penyetujus/create', [PenyetujuController::class, 'create'])->name('penyetujus.create');
    Route::post('/penyetujus', [PenyetujuController::class, 'store'])->name('penyetujus.store');
    Route::get('/penyetujus/edit/{id}', [PenyetujuController::class, 'edit'])->name('penyetujus.edit');
    Route::put('/penyetujus/{id}', [PenyetujuController::class, 'update'])->name('penyetujus.update');
    Route::delete('/penyetujus/{id}', [PenyetujuController::class, 'destroy'])->name('penyetujus.destroy');

    Route::get('/pemesanans', [PemesananController::class, 'index'])->name('pemesanans.index');
    Route::get('/pemesanans/create', [PemesananController::class, 'create'])->name('pemesanans.create');
    Route::post('/pemesanans', [PemesananController::class, 'store'])->name('pemesanans.store');
    Route::get('/pemesanans/edit/{id}', [PemesananController::class, 'edit'])->name('pemesanans.edit');
    Route::put('/pemesanans/{id}', [PemesananController::class, 'update'])->name('pemesanans.update');
    Route::delete('/pemesanans/{id}', [PemesananController::class, 'destroy'])->name('pemesanans.destroy');
});

require __DIR__.'/auth.php';
