import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, id_kendaraan, nama }) {
    const { data, setData, post, errors, processing } = useForm({
        tanggal: '',
        keterangan: '',
        bensin: '',
        servis: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('riwayats.store', { id_kendaraan }), {
            onSuccess: () => {
                alert('Riwayat Kendaraan berhasil ditambahkan!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat menambahkan Riwayat Kendaraan.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Riwayat Kendaraan</h2>}
        >
            <Head title="Tambah Riwayat Kendaraan" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tambah Riwayat Kendaraan</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        id="tanggal"
                                        value={data.tanggal}
                                        onChange={(e) => setData('tanggal', e.target.value)}
                                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                            errors.tanggal ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.tanggal && (
                                        <p className="mt-2 text-sm text-red-600">{errors.tanggal}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
                                        Keterangan
                                    </label>
                                    <textarea
                                        id="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                            errors.keterangan ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.keterangan && (
                                        <p className="mt-2 text-sm text-red-600">{errors.keterangan}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="bensin" className="block text-sm font-medium text-gray-700">
                                        Biaya (Bensin/Servis)
                                    </label>
                                    <input
                                        type="number"
                                        id="bensin"
                                        value={data.bensin}
                                        onChange={(e) => setData('bensin', e.target.value)}
                                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                            errors.bensin ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.bensin && (
                                        <p className="mt-2 text-sm text-red-600">{errors.bensin}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="servis" className="block text-sm font-medium text-gray-700">
                                        Deskripsi Servis (Jika bukan servis beri tanda -)
                                    </label>
                                    <input
                                        type="text" // Changed to text
                                        id="servis"
                                        value={data.servis}
                                        onChange={(e) => setData('servis', e.target.value)}
                                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                            errors.servis ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.servis && (
                                        <p className="mt-2 text-sm text-red-600">{errors.servis}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
