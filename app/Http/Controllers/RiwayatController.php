<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Riwayat;
use Illuminate\Http\Request;

class RiwayatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id_kendaraan)
    {
        $riwayats = Riwayat::where('id_kendaraan', $id_kendaraan)->with('kendaraan')->latest()->get();
        $kendaraan = Kendaraan::find($id_kendaraan);

        return inertia('Riwayat/Index', [
            'riwayats' => $riwayats,
            'nama' => $kendaraan->nama ?? 'Kendaraan Tidak Ditemukan',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id_kendaraan)
    {
        return inertia('Riwayat/Create', [
            'id_kendaraan' => $id_kendaraan,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id_kendaraan)
    {
        $validatedData = $request->validate([
            'tanggal' => 'required|date',
            'keterangan' => 'required|string|max:255',
            'bensin' => 'nullable|numeric|min:0',
            'servis' => 'nullable|string|max:255',
        ]);

        $kendaraan = Kendaraan::find($id_kendaraan);

        if (!$kendaraan) {
            return redirect()->route('riwayats.index', $id_kendaraan)
                ->with('error', 'Kendaraan tidak ditemukan.');
        }

        $validatedData['id_kendaraan'] = $id_kendaraan;

        Riwayat::create($validatedData);

        return redirect()->route('riwayats.index', $id_kendaraan)
            ->with('success', 'Riwayat kendaraan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id_kendaraan, $id)
    {
        $riwayat = Riwayat::findOrFail($id);
        $kendaraan = Kendaraan::find($id_kendaraan);

        return inertia('Riwayat/Edit', [
            'riwayat' => $riwayat,
            'id_kendaraan' => $id_kendaraan,
            'nama' => $kendaraan->nama ?? 'Kendaraan Tidak Ditemukan',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id_kendaraan, $id)
    {
        $validatedData = $request->validate([
            'tanggal' => 'required|date',
            'keterangan' => 'required|string|max:255',
            'bensin' => 'nullable|numeric|min:0',
            'servis' => 'nullable|string|max:255',
        ]);

        $riwayat = Riwayat::findOrFail($id);

        $riwayat->update($validatedData);

        return redirect()->route('riwayats.index', $id_kendaraan)
            ->with('success', 'Riwayat kendaraan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id_kendaraan, $id)
    {
        $riwayat = Riwayat::where('id_kendaraan', $id_kendaraan)->where('id', $id)->first();

        if (!$riwayat) {
            return response()->json(['message' => 'Riwayat not found'], 404);
        }

        $riwayat->delete();

        return response()->json(['message' => 'Riwayat berhasil dihapus']);
    }

}
