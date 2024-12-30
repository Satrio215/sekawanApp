import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function RiwayatIndex({ riwayats, nama, auth }) {
    const handleDelete = (id_kendaraan, id) => {
        if (confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
            // Check the output of the route() function
            console.log(route('riwayats.destroy', { id_kendaraan: id_kendaraan, id: id }));

            axios.delete(route('riwayats.destroy', { id_kendaraan: id_kendaraan, id: id }))
                .then(() => {
                    alert('Riwayat berhasil dihapus');
                    window.location.reload(); // Reload the page to reflect the changes
                })
                .catch((error) => {
                    console.error('Error deleting riwayat:', error);
                });
        }
    };




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Riwayat Kendaraan</h2>}
        >
            <Head title="Riwayat Kendaraan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Riwayat Kendaraan: {nama}</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tanggal</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Keterangan</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Biaya (Bensin/Servis)</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Servis</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {riwayats.length > 0 ? (
                                            riwayats.map((riwayat) => (
                                                <tr key={riwayat.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{riwayat.tanggal}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{riwayat.keterangan}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{riwayat.bensin}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{riwayat.servis}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                        {/* Edit Button */}
                                                        <Link
                                                            href={route('riwayats.edit', { id_kendaraan: riwayat.id_kendaraan, id: riwayat.id })}
                                                            className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                        >
                                                            Edit
                                                        </Link>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => handleDelete(riwayat.id_kendaraan, riwayat.id)}
                                                            className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-4 py-2 text-center text-sm text-gray-500"
                                                >
                                                    Tidak ada riwayat untuk kendaraan ini.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
