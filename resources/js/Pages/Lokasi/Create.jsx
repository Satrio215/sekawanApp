import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        lokasi: '',
        jalan: ''
    });

    const { flash } = usePage().props; // Accessing flash messages from the server-side

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('lokasis.store'), {
            onSuccess: () => {
                // Success callback: Alert user on success
                alert('Lokasi berhasil ditambahkan!');
            },
            onError: () => {
                // Error callback: Alert user on failure
                alert('Terjadi kesalahan saat menambahkan lokasi.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Lokasi</h2>}
        >
            <Head title="Tambah Lokasi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Lokasi */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Lokasi</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.lokasi}
                                        onChange={(e) => setData('lokasi', e.target.value)}
                                        required
                                    />
                                    {errors.lokasi && <div className="text-red-500 text-xs mt-1">{errors.lokasi}</div>}
                                </div>

                                {/* Jalan */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nama Jalan</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.jalan}
                                        onChange={(e) => setData('jalan', e.target.value)}
                                        required
                                    />
                                    {errors.jalan && <div className="text-red-500 text-xs mt-1">{errors.jalan}</div>}
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
