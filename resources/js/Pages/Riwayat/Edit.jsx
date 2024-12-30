import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function EditRiwayat({ auth, riwayat, id_kendaraan }) {
    const { data, setData, put, errors } = useForm({
        tanggal: riwayat.tanggal,
        keterangan: riwayat.keterangan,
        bensin: riwayat.bensin,
        servis: riwayat.servis,
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            data.tanggal === riwayat.tanggal &&
            data.keterangan === riwayat.keterangan &&
            data.bensin === riwayat.bensin &&
            data.servis === riwayat.servis
        ) {
            window.location.href = route('riwayats.index', { id: id_kendaraan });
            return;
        }

        put(route('riwayats.update', { id_kendaraan, id: riwayat.id }), {
            onSuccess: () => {
                alert('Riwayat berhasil diperbarui!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat memperbarui riwayat.');
            },
        });
    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Riwayat Kendaraan</h2>}
        >
            <Head title="Edit Riwayat Kendaraan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Input Tanggal */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.tanggal}
                                        onChange={(e) => setData('tanggal', e.target.value)}
                                        required
                                    />
                                    {errors.tanggal && (
                                        <div className="text-red-500 text-xs mt-1">{errors.tanggal}</div>
                                    )}
                                </div>

                                {/* Input Keterangan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                                    <textarea
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        required
                                    />
                                    {errors.keterangan && (
                                        <div className="text-red-500 text-xs mt-1">{errors.keterangan}</div>
                                    )}
                                </div>

                                {/* Input Bensin */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Biaya (Bensin/Servis)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.bensin}
                                        onChange={(e) => setData('bensin', e.target.value)}
                                        required
                                    />
                                    {errors.bensin && (
                                        <div className="text-red-500 text-xs mt-1">{errors.bensin}</div>
                                    )}
                                </div>

                                {/* Input Servis */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Servis</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.servis}
                                        onChange={(e) => setData('servis', e.target.value)}
                                        required
                                    />
                                    {errors.servis && (
                                        <div className="text-red-500 text-xs mt-1">{errors.servis}</div>
                                    )}
                                </div>

                                {/* Tombol Simpan */}
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
