<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Illuminate\Http\Request;

class KendaraanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kendaraans = Kendaraan::latest()->get();

        return inertia('Kendaraan/Index', [
            'kendaraans' => $kendaraans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Kendaraan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:orang,barang,sewa',
        ]);

        Kendaraan::create($request->only(['nama', 'jenis']));

        return redirect()->route('kendaraans.index')->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kendaraan $kendaraan)
    {
        return inertia('Kendaraan/Show', [
            'kendaraan' => $kendaraan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $kendaraan = Kendaraan::findOrFail($id);

        return inertia('Kendaraan/Edit', [
            'kendaraan' => $kendaraan,
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
        ]);

        $kendaraan->update([
            'nama' => $request->input('nama'),
            'jenis' => $request->input('jenis'),
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
