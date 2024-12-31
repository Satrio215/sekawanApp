import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function PemesananIndex({ pemesanans, auth }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pemesanan ini?')) {
            axios.delete(route('pemesanans.destroy', id))
                .then(() => {
                    alert('Pemesanan berhasil dihapus');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting pemesanan:', error);
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Pemesanan</h2>}
        >
            <Head title="Pemesanan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Daftar Pemesanan</h3>

                            {/* Add New Pemesanan Button */}
                            <div className="mb-4">
                                <Link
                                    href={route('pemesanans.create')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Tambah Pemesanan
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama Pemesan</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Kendaraan</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Penyetuju</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tanggal</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Telepon Pemesan</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status Admin</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status Penyetuju</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pemesanans.map((pemesanan) => (
                                            <tr key={pemesanan.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pemesanan.nama_pemesan}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {pemesanan.kendaraan ? `${pemesanan.kendaraan.nama} - ${pemesanan.lokasi ? pemesanan.lokasi.lokasi : 'Lokasi tidak ditemukan'}` : 'Kendaraan tidak ditemukan'}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {pemesanan.penyetuju ? `${pemesanan.penyetuju.email} - ${pemesanan.lokasi ? pemesanan.lokasi.lokasi : 'Lokasi tidak ditemukan'}` : 'Penyetuju tidak ditemukan'}
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pemesanan.hari}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">{pemesanan.telp_pemesan}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {/* Status User */}
                                                    <span className={`px-3 py-1 rounded-full text-sm ${pemesanan.status_user === 'disetujui' ? 'bg-green-100 text-green-600' : pemesanan.status_user === 'ditolak' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                        {pemesanan.status_user}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                    {/* Status Penyetuju */}
                                                    <span className={`px-3 py-1 rounded-full text-sm ${pemesanan.status_penyetuju === 'disetujui' ? 'bg-green-100 text-green-600' : pemesanan.status_penyetuju === 'ditolak' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                        {pemesanan.status_penyetuju}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm flex space-x-2">
                                                    {/* Edit Button */}
                                                    <Link
                                                        href={route('pemesanans.edit', pemesanan.id)}
                                                        className="border border-green-600 text-green-600 px-4 py-2 rounded-lg shadow transition-colors duration-300 ease-in-out hover:bg-green-600 hover:text-white text-sm"
                                                    >
                                                        Edit
                                                    </Link>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDelete(pemesanan.id)}
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
