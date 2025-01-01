import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Bar } from 'react-chartjs-2'; // Menggunakan komponen Bar dari react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrasi elemen-elemen Chart.js yang diperlukan
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Dashboard({ monthlyUsage }) {
    // Daftar warna yang akan digunakan
    const colors = [
        'rgba(75, 192, 192, 0.6)', // Warna untuk kendaraan pertama
        'rgba(255, 99, 132, 0.6)', // Warna untuk kendaraan kedua
        'rgba(54, 162, 235, 0.6)', // Warna untuk kendaraan ketiga
        'rgba(255, 159, 64, 0.6)', // Warna untuk kendaraan keempat
        'rgba(153, 102, 255, 0.6)', // Warna untuk kendaraan kelima
        'rgba(255, 159, 64, 0.6)', // Warna untuk kendaraan keenam
        'rgba(75, 192, 192, 0.6)', // Warna untuk kendaraan ketujuh
        'rgba(153, 102, 255, 0.6)', // Warna untuk kendaraan kedelapan
        'rgba(255, 99, 132, 0.6)', // Warna untuk kendaraan kesembilan
        'rgba(54, 162, 235, 0.6)'  // Warna untuk kendaraan kesepuluh
    ];

    // Data untuk chart
    const chartData = {
        labels: monthlyUsage.flatMap(item => item.monthlyUsage.map(month => month.month)), // Menampilkan label bulan
        datasets: monthlyUsage.map((item, index) => ({
            label: item.kendaraan,
            data: item.monthlyUsage.map(month => month.usage_count), // Menampilkan jumlah penggunaan per bulan
            backgroundColor: colors[index % colors.length], // Menggunakan warna berdasarkan index kendaraan
            borderColor: 'rgba(0, 0, 0, 1)', // Warna border
            borderWidth: 1,
        })),
    };

    // Opsi untuk chart
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Grafik Penggunaan Kendaraan Per Bulan',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Penggunaan: ${tooltipItem.raw} kali`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Mulai sumbu X dari 0
            },
            y: {
                beginAtZero: true, // Mulai sumbu Y dari 0
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Grafik Penggunaan Kendaraan</h2>
                            <Bar data={chartData} options={options} /> {/* Menampilkan grafik batang */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
