<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Lokasi;
use Illuminate\Http\Request;

class KendaraanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kendaraans = Kendaraan::with('lokasi')->get();

        return inertia('Kendaraan/Index', [
            'kendaraans' => $kendaraans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lokasis = Lokasi::all(); // Or however you're fetching the location data
        return inertia('Kendaraan/Create', [
            'lokasis' => $lokasis,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:orang,barang,sewa',
            'id_lokasi' => 'required|exists:lokasis,id',
        ]);

        Kendaraan::create($request->only(['nama', 'jenis', 'id_lokasi']));

        return redirect()->route('kendaraans.index')->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kendaraan $kendaraan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $kendaraan = Kendaraan::findOrFail($id);
        $lokasis = Lokasi::all();

        return inertia('Kendaraan/Edit', [
            'kendaraan' => $kendaraan,
            'lokasis' => $lokasis,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $kendaraan = Kendaraan::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:orang,barang,sewa',
            'id_lokasi' => 'required|exists:lokasis,id',

        ]);

        $kendaraan->update([
            'nama' => $request->input('nama'),
            'jenis' => $request->input('jenis'),
            'id_lokasi' => $request->input('id_lokasi'),

        ]);

        return redirect()->route('kendaraans.index')->with('success', 'Kendaraan berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kendaraan $kendaraan, $id)
    {
        $kendaraan = Kendaraan::findOrFail($id);
        $kendaraan->delete();

        return response()->json(['message' => 'Kendaraan berhasil dihapus.']);
    }
}
