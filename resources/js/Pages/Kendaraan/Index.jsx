import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function KendaraanIndex({ kendaraans, auth }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kendaraan ini?')) {
            axios.delete(route('kendaraans.destroy', id))
                .then(() => {
                    alert('Kendaraan berhasil dihapus');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting vehicle:', error);
                });
    }
};

return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Kendaraan</h2>}
    >
        <Head title="Kendaraan" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 bg-gray-100 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Daftar Kendaraan</h3>

                        {/* Add New Riwayat Button */}
                        <div className="mb-4">
                            <Link
                                href={route('kendaraans.create')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                            >
                                Tambah Kendaraan
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Jenis</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {kendaraans.map((kendaraan) => (
                                        <tr key={kendaraan.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{kendaraan.nama}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">{kendaraan.jenis}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                {/* Edit Button */}
                                                <Link
                                                    href={route('kendaraans.edit', kendaraan.id)}
                                                    className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                >
                                                    Edit
                                                </Link>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(kendaraan.id)}
                                                    className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                >
                                                    Delete
                                                </button>
                                                {/* Riwayat Button */}
                                                <Link
                                                    href={route('riwayats.index', kendaraan.id)} // Pastikan rute ini sesuai dengan rute backend Anda
                                                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white text-sm"
                                                >
                                                    Riwayat
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
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
