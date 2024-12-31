<?php

namespace App\Http\Controllers;

use App\Models\Lokasi;
use Illuminate\Http\Request;

class LokasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lokasis = Lokasi::latest()->get();

        return inertia('Lokasi/Index', [
            'lokasis' => $lokasis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Lokasi/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'lokasi' => 'required|string|max:255',
            'jalan' => 'required|string|max:255',
        ]);

        Lokasi::create($request->only(['lokasi', 'jalan']));

        return redirect()->route('lokasis.index')->with('success', 'Lokasi Kantor berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lokasi $lokasi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $lokasi = Lokasi::findOrFail($id);

        return inertia('Lokasi/Edit', [
            'lokasi' => $lokasi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $lokasi = Lokasi::findOrFail($id);

        $request->validate([
            'lokasi' => 'required|string|max:255',
            'jalan' => 'required|string|max:255',
        ]);

        $lokasi->update([
            'lokasi' => $request->input('lokasi'),
            'jalan' => $request->input('jalan'),
        ]);

        return redirect()->route('lokasis.index')->with('success', 'Lokasi Kantor berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lokasi $lokasi, $id)
    {
        $lokasi = Lokasi::findOrFail($id);
        $lokasi->delete();

        return response()->json(['message' => 'Lokasi Kantor berhasil dihapus.']);
    }
}
