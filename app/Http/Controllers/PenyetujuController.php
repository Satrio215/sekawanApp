<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\Penyetuju;
use App\Models\Lokasi;
use Illuminate\Http\Request;

class PenyetujuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penyetujus = Penyetuju::with('lokasi')->get();  // Pastikan ada data dari database

        return inertia('Penyetuju/Index', [
            'penyetujus' => $penyetujus
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lokasis = Lokasi::all();
        return inertia('Penyetuju/Create', [
            'lokasis' => $lokasis,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|max:255|unique:penyetujus,email',
            'password' => 'required|string|max:255',
            'id_lokasi' => 'required|exists:lokasis,id',
        ]);

        Penyetuju::create([
            'email' => $request->email,
            'password' => bcrypt($request->input('password')),
            'id_lokasi' => $request->id_lokasi,
        ]);

        return redirect()->route('penyetujus.index')->with('success', 'Penyetuju berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $penyetuju = Penyetuju::findOrFail($id);
        $lokasis = Lokasi::all();

        return inertia('Penyetuju/Edit', [
            'penyetuju' => $penyetuju,
            'lokasis' => $lokasis
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $penyetuju = Penyetuju::findOrFail($id);

        $request->validate([
            'email' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'id_lokasi' => 'required|exists:lokasis,id',
        ]);

        $penyetuju->update([
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'id_lokasi' => $request->input('id_lokasi'),
        ]);

        return redirect()->route('penyetujus.index')->with('success', 'Penyetuju berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penyetuju $penyetuju, $id)
    {
        $penyetuju = Penyetuju::findOrFail($id);
        $penyetuju->delete();

        return response()->json(['message' => 'Akun Penyetuju berhasil dihapus.']);
    }
}
