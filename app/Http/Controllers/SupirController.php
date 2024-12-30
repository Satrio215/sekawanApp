<?php

namespace App\Http\Controllers;

use App\Models\Supir;
use Illuminate\Http\Request;

class SupirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supirs = Supir::latest()->get();

        return inertia('Supir/Index', [
            'supirs' => $supirs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Supir/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'telp' => 'required|string|max:255',
        ]);

        Supir::create($request->only(['nama', 'telp']));

        return redirect()->route('supirs.index')->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Supir $supir)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $supir = Supir::findOrFail($id);

        return inertia('Supir/Edit', [
            'supir' => $supir,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $supir = Supir::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255',
            'telp' => 'required|string|max:255',
        ]);

        $supir->update([
            'nama' => $request->input('nama'),
            'telp' => $request->input('telp'),
        ]);

        return redirect()->route('supirs.index')->with('success', 'Kendaraan berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supir $supir, $id)
    {
        $supir = Supir::findOrFail($id);
        $supir->delete();

        return response()->json(['message' => 'Supir berhasil dihapus.']);
    }
}

