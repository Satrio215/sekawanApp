import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Create({ auth, lokasis = [] }) { // Default to empty array if undefined
    const { data, setData, post, errors } = useForm({
        nama: '',
        jenis: '',
        id_lokasi: '', // Add this field for lokasi dropdown
    });

    const { flash } = usePage().props; // Accessing flash messages from the server-side

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('kendaraans.store'), {
            onSuccess: () => {
                // Success callback: Alert user on success
                alert('Kendaraan berhasil ditambahkan!');
            },
            onError: () => {
                // Error callback: Alert user on failure
                alert('Terjadi kesalahan saat menambahkan kendaraan.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kendaraan</h2>}
        >
            <Head title="Tambah Kendaraan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Nama */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Kendaraan</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        required
                                    />
                                    {errors.nama && <div className="text-red-500 text-xs mt-1">{errors.nama}</div>}
                                </div>

                                {/* Jenis */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Jenis Kendaraan</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.jenis}
                                        onChange={(e) => setData('jenis', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="orang">Angkutan Orang</option>
                                        <option value="barang">Angkutan Barang</option>
                                        <option value="sewa">Mobil Sewa</option>
                                    </select>
                                    {errors.jenis && <div className="text-red-500 text-xs mt-1">{errors.jenis}</div>}
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
                                        {lokasis.length > 0 ? (
                                            lokasis.map((lokasi) => (
                                                <option key={lokasi.id} value={lokasi.id}>
                                                    {lokasi.lokasi}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No Lokasi Available</option>
                                        )}
                                    </select>
                                    {errors.id_lokasi && <div className="text-red-500 text-xs mt-1">{errors.id_lokasi}</div>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Simpan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
