<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Models\Kendaraan;
use App\Models\User;
use App\Models\Penyetuju;
use App\Models\Supir;
use App\Models\Lokasi;
use Illuminate\Http\Request;

class PemesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pemesanans = Pemesanan::with(['kendaraan', 'user', 'penyetuju', 'supir', 'lokasi'])->get();

        $lokasis = Lokasi::all();
        $kendaraans = Kendaraan::with('lokasi')->get(); // Eager load lokasi
        $penyetujus = Penyetuju::with('lokasi')->get();; // Ensure this is correct
        $supirs = Supir::with('lokasi')->get();

        return inertia('Pemesanan/Index', [
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
        $kendaraans = Kendaraan::with('lokasi')->get(); // Eager load lokasi
        $users = User::all();
        $penyetujus = Penyetuju::with('lokasi')->get();; // Ensure this is correct
        $supirs = Supir::with('lokasi')->get();
        $lokasis = Lokasi::all();

        return inertia('Pemesanan/Create', [
            'lokasis' => $lokasis,
            'kendaraans' => $kendaraans,
            'penyetujus' => $penyetujus,
            'supirs' => $supirs,
            'kendaraans' => $kendaraans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_kendaraan' => 'required|exists:kendaraans,id',
            'id_penyetuju' => 'required|exists:penyetujus,id',
            'id_supir' => 'required|exists:supirs,id',
            'id_lokasi' => 'required|exists:lokasis,id',
            'status_user' => 'nullable|in:disetujui,ditolak,proses',
            'status_penyetuju' => 'nullable|in:disetujui,ditolak,proses',
            'nama_pemesan' => 'required|string|max:255',
            'hari' => 'required|date',
            'telp_pemesan' => 'required|string|max:20',
        ]);

        $validated['status_user'] = $validated['status_user'] ?? 'proses';
        $validated['status_penyetuju'] = $validated['status_penyetuju'] ?? 'proses';

        $validated['id_user'] = auth()->id();

        Pemesanan::create($validated);

        return redirect()->route('pemesanans.index')->with('success', 'Pemesanan berhasil dibuat.');
    }



    /**
     * Display the specified resource.
     */
    public function show(Pemesanan $pemesanan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $pemesanan = Pemesanan::findOrFail($id);
        $kendaraans = Kendaraan::with('lokasi')->get();
        $users = User::all();
        $penyetujus = Penyetuju::with('lokasi')->get();
        $supirs = Supir::with('lokasi')->get();
        $lokasis = Lokasi::all();

        return inertia('Pemesanan/Edit', [
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
        $pemesanan = Pemesanan::findOrFail($id);

        $validated = $request->validate([
            'id_kendaraan' => 'required|exists:kendaraans,id',
            'id_user' => 'required|exists:users,id',
            'id_penyetuju' => 'required|exists:penyetujus,id',
            'id_supir' => 'required|exists:supirs,id',
            'id_lokasi' => 'required|exists:lokasis,id',
            'status_user' => 'required|in:disetujui,ditolak,proses',
            'status_penyetuju' => 'required|in:disetujui,ditolak,proses',
            'nama_pemesan' => 'required|string|max:255',
            'hari' => 'required|date',
            'telp_pemesan' => 'required|string|max:20',
        ]);

        $validated['id_user'] = auth()->user()->id;
        unset($validated['status_penyetuju']);

        $pemesanan->update($validated);

        return redirect()->route('pemesanans.index')->with('success', 'Pemesanan berhasil diperbarui.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pemesanan $pemesanan, $id)
    {
        $pemesanan = Pemesanan::findOrFail($id);
        $pemesanan->delete();

        return response()->json(['message' => 'Pemesanan Kendaraan berhasil dihapus.']);
    }
}
