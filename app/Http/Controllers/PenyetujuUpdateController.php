<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Models\Kendaraan;
use App\Models\User;
use App\Models\Penyetuju;
use App\Models\Supir;
use App\Models\Lokasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PenyetujuUpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $email = Auth::user()->email;

        // Ambil pemesanan yang hanya memiliki email penyetuju yang sama dengan email user yang sedang login
        $pemesanans = Pemesanan::with(['kendaraan', 'user', 'penyetuju', 'supir', 'lokasi'])
            ->whereHas('penyetuju', function ($query) use ($email) {
                // Pastikan email penyetuju cocok dengan email user yang sedang login
                $query->where('email', $email);
            })
            ->get();

        $lokasis = Lokasi::all();
        $kendaraans = Kendaraan::with('lokasi')->get(); // Eager load lokasi
        $penyetujus = Penyetuju::with('lokasi')->get(); // Ensure this is correct
        $supirs = Supir::with('lokasi')->get();

        return inertia('UpdatePenyetuju/Index', [
            'pemesanans' => $pemesanans,
            'lokasis' => $lokasis,
            'kendaraans' => $kendaraans,
            'penyetujus' => $penyetujus,
            'supirs' => $supirs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function edit($id)
    {
        $pemesanan = Pemesanan::findOrFail($id);
        $kendaraans = Kendaraan::with('lokasi')->get();
        $users = User::all();
        $penyetujus = Penyetuju::with('lokasi')->get();
        $supirs = Supir::with('lokasi')->get();
        $lokasis = Lokasi::all();

        return inertia('UpdatePenyetuju/Edit', [
            'pemesanan' => $pemesanan,
            'lokasis' => $lokasis,
            'kendaraans' => $kendaraans,
            'penyetujus' => $penyetujus,
            'supirs' => $supirs,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the Pemesanan by ID
        $pemesanan = Pemesanan::findOrFail($id);

        // Validate the incoming request data for only 'status_penyetuju'
        $validated = $request->validate([
            'status_penyetuju' => 'nullable|in:disetujui,ditolak,proses', // Only allow status_penyetuju to be updated
        ]);

        // If status_penyetuju is in the request, update it
        if ($request->has('status_penyetuju')) {
            $pemesanan->status_penyetuju = $request->input('status_penyetuju');
        }

        // Save the updated Pemesanan
        $pemesanan->save();

        // Redirect back with a success message
        return redirect()->route('penyetuju.index')->with('success', 'Status Penyetuju berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
