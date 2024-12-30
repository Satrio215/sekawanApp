import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, kendaraan }) {
    const { data, setData, put, errors } = useForm({
        nama: kendaraan.nama,
        jenis: kendaraan.jenis,
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('kendaraans.update', kendaraan.id), {
            onSuccess: () => {
                alert('Kendaraan berhasil diperbarui!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat memperbarui kendaraan.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Kendaraan</h2>}
        >
            <Head title="Edit Kendaraan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Input Nama */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Kendaraan</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.nama} // Menggunakan nilai lama
                                        onChange={(e) => setData('nama', e.target.value)} // Memperbarui nilai data
                                        required
                                    />
                                    {errors.nama && (
                                        <div className="text-red-500 text-xs mt-1">{errors.nama}</div>
                                    )}
                                </div>

                                {/* Input Jenis */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Jenis Kendaraan</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.jenis} // Menggunakan nilai lama
                                        onChange={(e) => setData('jenis', e.target.value)} // Memperbarui nilai data
                                        required
                                    >
                                        <option value="orang">Orang</option>
                                        <option value="barang">Barang</option>
                                        <option value="sewa">Sewa</option>
                                    </select>
                                    {errors.jenis && (
                                        <div className="text-red-500 text-xs mt-1">{errors.jenis}</div>
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
