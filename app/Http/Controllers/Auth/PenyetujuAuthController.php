<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Penyetuju;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PenyetujuAuthController extends Controller
{
    /**
     * Menampilkan halaman login untuk penyetuju.
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/LoginPenyetuju');
    }

    /**
     * Proses login untuk penyetuju.
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $penyetuju = Penyetuju::where('email', $validated['email'])->first();

        if ($penyetuju && Hash::check($validated['password'], $penyetuju->password)) {
            Auth::guard('penyetujus')->login($penyetuju);

            return redirect()->route('penyetuju.dashboard')->with('success', 'Login berhasil!');
        }

        return back()->withErrors(['email' => 'The provided credentials are incorrect.']);
    }

    /**
     * Proses logout untuk penyetuju.
     */
    public function logout()
    {
        Auth::guard('penyetujus')->logout();

        return redirect()->route('penyetuju.login')->with('success', 'Logout berhasil!');
    }

    public function dashboard()
    {
        $penyetuju = auth()->guard('penyetujus')->user();

        return Inertia::render('Penyetuju/Dashboard', [
            'penyetuju' => $penyetuju
        ]);
    }
}
