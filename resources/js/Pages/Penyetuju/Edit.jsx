import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, penyetuju, lokasis }) {
    const { data, setData, put, errors } = useForm({
        email: penyetuju.email,
        password: '', // Empty because we're not showing the old password
        id_lokasi: penyetuju.id_lokasi, // Include the location in the form
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('penyetujus.update', penyetuju.id), {
            onSuccess: () => {
                alert('Penyetuju berhasil diperbarui!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat memperbarui penyetuju.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Penyetuju</h2>}
        >
            <Head title="Edit Penyetuju" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Input Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email Penyetuju</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && (
                                        <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                                    )}
                                </div>

                                {/* Input Password */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password (Mohon Untuk merubah password)</label>
                                    <input
                                        type="password"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                                    )}
                                </div>

                                {/* Input Lokasi */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Lokasi Penyetuju</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.id_lokasi}
                                        onChange={(e) => setData('id_lokasi', e.target.value)}
                                        required
                                    >
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

                                {/* Save Button */}
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
