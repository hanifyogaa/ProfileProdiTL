import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Heart, MapPin, Pencil, Plus, Search, Tag, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

interface ServiceItem {
    id: number;
    title_id: string;
    title_en: string;
    category: string | null;
    year: number | null;
    location: string | null;
    partners: string | null;
    team: string | null;
    image: string | null;
}

interface IndexProps {
    services: {
        data: ServiceItem[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    categories: string[];
    filters: { search?: string; category?: string };
}

export default function Index({ services, categories, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');

    const applyFilters = () => {
        router.get(route('admin.community-services.index'), { search, category }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Hapus data pengabdian masyarakat ini?')) return;
        router.delete(route('admin.community-services.destroy', id));
    };

    return (
        <AdminLayout title="Manajemen Pengabdian Masyarakat">
            <Head title="Admin - Pengabdian Masyarakat" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-display text-2xl font-bold text-ink-900">Pengabdian Masyarakat</h2>
                    <p className="mt-0.5 text-sm text-navy-700">{services.total} program pengabdian terdaftar</p>
                </div>
                <Link
                    href={route('admin.community-services.create')}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-surface-0 shadow-md transition-colors hover:bg-brand-800"
                >
                    <Plus className="size-4" />
                    Tambah Program
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-navy-700/40" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                        placeholder="Cari judul, lokasi, tim..."
                        className="w-full rounded-xl border border-cream-300 bg-surface-0 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                    />
                </div>
                <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); router.get(route('admin.community-services.index'), { search, category: e.target.value }, { preserveState: true, replace: true }); }}
                    className="rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700"
                >
                    <option value="">Semua Kategori</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={applyFilters} className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-surface-0 hover:bg-brand-800 transition-colors">
                    Cari
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-cream-300/40 bg-surface-0 shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-surface-50/50 text-left">
                        <tr>
                            <th className="px-5 py-3.5 font-semibold text-navy-700">Program</th>
                            <th className="hidden px-5 py-3.5 font-semibold text-navy-700 md:table-cell">Kategori</th>
                            <th className="hidden px-5 py-3.5 font-semibold text-navy-700 sm:table-cell">Tahun</th>
                            <th className="hidden px-5 py-3.5 font-semibold text-navy-700 lg:table-cell">Lokasi</th>
                            <th className="px-5 py-3.5 text-right font-semibold text-navy-700">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-300/20">
                        {services.data.length > 0 ? services.data.map((item) => (
                            <tr key={item.id} className="hover:bg-surface-50/40 transition-colors">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        {item.image ? (
                                            <img src={item.image} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                                        ) : (
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/8">
                                                <Heart className="size-5 text-amber-500/40" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-ink-900 line-clamp-1">{item.title_id}</p>
                                            <p className="text-xs text-navy-700/60 line-clamp-1">{item.title_en}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden px-5 py-4 md:table-cell">
                                    {item.category && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                                            <Tag className="size-2.5" />
                                            {item.category}
                                        </span>
                                    )}
                                </td>
                                <td className="hidden px-5 py-4 sm:table-cell">
                                    {item.year && (
                                        <span className="flex items-center gap-1 text-xs text-navy-700/60">
                                            <Calendar className="size-3" />{item.year}
                                        </span>
                                    )}
                                </td>
                                <td className="hidden px-5 py-4 text-xs text-navy-700/70 lg:table-cell">
                                    {item.location ? (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="size-3" />{item.location}
                                        </span>
                                    ) : '—'}
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.community-services.edit', item.id)}
                                            className="inline-flex items-center gap-1 rounded-lg border border-cream-300 bg-surface-0 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:bg-surface-50 transition-colors"
                                        >
                                            <Pencil className="size-3" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 className="size-3" /> Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="py-16 text-center text-sm text-navy-700/50">
                                    Belum ada data pengabdian masyarakat.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {services.last_page > 1 && (
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                    {services.links.map((link, i) => (
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${link.active ? 'bg-brand-700 text-surface-0' : 'border border-cream-300 bg-surface-0 text-navy-700 hover:bg-surface-50'}`}
                            />
                        ) : (
                            <span key={i} dangerouslySetInnerHTML={{ __html: link.label }} className="rounded-xl px-3.5 py-2 text-xs text-navy-700/30" />
                        )
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
