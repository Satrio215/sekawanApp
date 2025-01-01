<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Riwayat;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $kendaraans = Kendaraan::all();

        $monthlyUsage = $kendaraans->map(function ($kendaraan) {
            $riwayats = Riwayat::where('id_kendaraan', $kendaraan->id)
                ->selectRaw('COUNT(id) as usage_count, DATE_FORMAT(tanggal, "%Y-%m") as month')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get();

            $usageData = $riwayats->map(function ($item) {
                return [
                    'month' => $item->month,
                    'usage_count' => $item->usage_count,
                ];
            });

            return [
                'kendaraan' => $kendaraan->nama,
                'monthlyUsage' => $usageData,
            ];
        });

        return inertia('Dashboard/Index', [
            'kendaraans' => $kendaraans,
            'monthlyUsage' => $monthlyUsage,
        ]);
    }
}



