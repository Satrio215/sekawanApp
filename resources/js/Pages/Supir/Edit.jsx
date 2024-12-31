import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, supir, lokasis }) {
    const { data, setData, put, errors } = useForm({
        nama: supir.nama,
        telp: supir.telp,
        id_lokasi: supir.id_lokasi || '', // Add the current id_lokasi to the form data
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('supirs.update', supir.id), {
            onSuccess: () => {
                alert('Supir berhasil diperbarui!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat memperbarui supir.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Supir</h2>}
        >
            <Head title="Edit Supir" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Input Nama */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Supir</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        required
                                    />
                                    {errors.nama && (
                                        <div className="text-red-500 text-xs mt-1">{errors.nama}</div>
                                    )}
                                </div>

                                {/* Input Telepon */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                    <input
                                        type="tel"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.telp}
                                        onChange={(e) => setData('telp', e.target.value)}
                                        required
                                    />
                                    {errors.telp && (
                                        <div className="text-red-500 text-xs mt-1">{errors.telp}</div>
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
