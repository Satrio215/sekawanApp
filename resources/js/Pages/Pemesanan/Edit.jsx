import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function EditPemesanan({ auth, pemesanan, lokasis, kendaraans, penyetujus, supirs }) {
    const { data, setData, put, errors } = useForm({
        id_kendaraan: pemesanan.id_kendaraan || '',
        id_user: pemesanan.id_user || auth.user.id,
        id_penyetuju: pemesanan.id_penyetuju || '',
        id_supir: pemesanan.id_supir || '',
        id_lokasi: pemesanan.id_lokasi || '',
        status_user: pemesanan.status_user || 'proses',
        status_penyetuju: pemesanan.status_penyetuju || 'proses',
        nama_pemesan: pemesanan.nama_pemesan || '',
        hari: pemesanan.hari || '',
        telp_pemesan: pemesanan.telp_pemesan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('pemesanans.update', pemesanan.id), {
            onSuccess: () => {
                alert('Pemesanan berhasil diperbarui!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat memperbarui pemesanan.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Pemesanan</h2>}
        >
            <Head title="Edit Pemesanan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Kendaraan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Kendaraan</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.id_kendaraan}
                                        onChange={(e) => setData('id_kendaraan', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kendaraan</option>
                                        {kendaraans.map((kendaraan) => (
                                            <option key={kendaraan.id} value={kendaraan.id}>
                                                {`${kendaraan.nama} - ${kendaraan.lokasi ? kendaraan.lokasi.lokasi : 'Lokasi tidak ditemukan'} - ${kendaraan.jenis === 'orang' ? 'Angkutan Orang' : (kendaraan.jenis === 'barang' ? 'Angkutan Barang' : (kendaraan.jenis === 'sewa' ? 'Sewa' : 'Jenis tidak ditemukan'))}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_kendaraan && (
                                        <div className="text-red-500 text-xs mt-1">{errors.id_kendaraan}</div>
                                    )}
                                </div>

                                {/* Lokasi */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.id_lokasi}
                                        onChange={(e) => setData('id_lokasi', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Lokasi</option>
                                        {lokasis.map((lokasi) => (
                                            <option key={lokasi.id} value={lokasi.id}>
                                                {lokasi.lokasi}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_lokasi && (
                                        <div className="text-red-500 text-xs mt-1">{errors.id_lokasi}</div>
                                    )}
                                </div>

                                {/* Penyetuju */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Penyetuju</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.id_penyetuju}
                                        onChange={(e) => setData('id_penyetuju', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Penyetuju</option>
                                        {penyetujus.map((penyetuju) => (
                                            <option key={penyetuju.id} value={penyetuju.id}>
                                                {`${penyetuju.email} - ${penyetuju.lokasi ? penyetuju.lokasi.lokasi : 'Lokasi tidak ditemukan'}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_penyetuju && (
                                        <div className="text-red-500 text-xs mt-1">{errors.id_penyetuju}</div>
                                    )}
                                </div>

                                {/* Supir */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Supir</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.id_supir}
                                        onChange={(e) => setData('id_supir', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Supir</option>
                                        {supirs.map((supir) => (
                                            <option key={supir.id} value={supir.id}>
                                                {supir.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_supir && (
                                        <div className="text-red-500 text-xs mt-1">{errors.id_supir}</div>
                                    )}
                                </div>

                                {/* Nama Pemesan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Pemesan</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.nama_pemesan}
                                        onChange={(e) => setData('nama_pemesan', e.target.value)}
                                        required
                                    />
                                    {errors.nama_pemesan && (
                                        <div className="text-red-500 text-xs mt-1">{errors.nama_pemesan}</div>
                                    )}
                                </div>

                                {/* Tanggal Pemesanan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Dibutuhkan Tanggal</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.hari}
                                        onChange={(e) => setData('hari', e.target.value)}
                                        required
                                    />
                                    {errors.hari && (
                                        <div className="text-red-500 text-xs mt-1">{errors.hari}</div>
                                    )}
                                </div>

                                {/* Nomor Telepon */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.telp_pemesan}
                                        onChange={(e) => setData('telp_pemesan', e.target.value)}
                                        required
                                    />
                                    {errors.telp_pemesan && (
                                        <div className="text-red-500 text-xs mt-1">{errors.telp_pemesan}</div>
                                    )}
                                </div>

                                {/* Status User */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Status Pemesanan</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.status_user}
                                        onChange={(e) => setData('status_user', e.target.value)}
                                        required
                                    >
                                        <option value="proses">Proses</option>
                                        <option value="disetujui">Disetujui</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                    {errors.status_user && (
                                        <div className="text-red-500 text-xs mt-1">{errors.status_user}</div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Simpan Perubahan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
