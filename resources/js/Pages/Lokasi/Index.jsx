import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function LokasiIndex({ lokasis, auth }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
            axios.delete(route('lokasis.destroy', id))
                .then(() => {
                    alert('Lokasi berhasil dihapus');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting lokasi:', error);
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Lokasi</h2>}
        >
            <Head title="Lokasi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Daftar Lokasi</h3>

                            {/* Add New Lokasi Button */}
                            {/* <div className="mb-4">
                                <Link
                                    href={route('lokasis.create')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Tambah Lokasi
                                </Link>
                            </div> */}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lokasi</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Jalan</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {lokasis.map((lokasi) => (
                                            <tr key={lokasi.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{lokasi.lokasi}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{lokasi.jalan}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                    {/* Edit Button */}
                                                    <Link
                                                        href={route('lokasis.edit', lokasi.id)}
                                                        className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                    >
                                                        Edit
                                                    </Link>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDelete(lokasi.id)}
                                                        className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white text-sm"
                                                    >
                                                        Delete
                                                    </button>
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
