import AuthenticatedPenyetuju from '@/Layouts/AuthenticatedPenyetuju';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function EditStatusPenyetuju({ auth, pemesanan }) {
    const { data, setData, put, errors } = useForm({
        status_penyetuju: pemesanan.status_penyetuju, // Hanya status_penyetuju yang diperbarui
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('penyetuju.update', pemesanan.id), {
            onSuccess: () => {
                alert('Status penyetuju berhasil diperbarui!');
            },
            onError: () => {
                alert('Terjadi kesalahan saat memperbarui status penyetuju.');
            },
        });
    };

    return (
        <AuthenticatedPenyetuju
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Status Penyetuju</h2>}
        >
            <Head title="Edit Status Penyetuju" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                {/* Input Status Penyetuju */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Status Penyetuju</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.status_penyetuju}
                                        onChange={(e) => setData('status_penyetuju', e.target.value)}
                                        required
                                    >
                                        <option value="disetujui">Disetujui</option>
                                        <option value="ditolak">Ditolak</option>
                                        <option value="proses">Proses</option>
                                    </select>
                                    {errors.status_penyetuju && (
                                        <div className="text-red-500 text-xs mt-1">{errors.status_penyetuju}</div>
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
        </AuthenticatedPenyetuju>
    );
}
