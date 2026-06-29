<x-filament-panels::page>
    {{-- Tab navigation --}}
    <div x-data="{ activeTab: 'hero' }" class="space-y-6">

        {{-- Tab bar --}}
        <div class="flex flex-wrap gap-1 rounded-xl p-1" style="background: rgba(140,100,65,0.07);">
            @foreach([
                ['hero',       'Hero Beranda'],
                ['identity',   'Identitas & Kontak'],
                ['greeting',   'Sambutan Kaprodi'],
                ['tracer',     'Tracer Study'],
                ['prospects',  'Prospek Karir'],
                ['distinct',   'Keunggulan Prodi'],
                ['curriculum', 'Kurikulum'],
                ['about',      'Visi & Misi'],
                ['accred',     'Akreditasi'],
                ['research',   'Riset & PKM'],
                ['mbkm',       'MBKM'],
            ] as [$key, $label])
            <button type="button"
                @click="activeTab = '{{ $key }}'"
                :class="activeTab === '{{ $key }}'
                    ? 'bg-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-white/50'"
                class="rounded-lg px-4 py-2 text-sm transition-all"
                style="color: #6E4E33;">
                {{ $label }}
            </button>
            @endforeach
        </div>

        <form wire:submit.prevent="save" class="space-y-6">

            {{-- ── Tab: Hero ── --}}
            <div x-show="activeTab === 'hero'" x-cloak>
                <x-filament::section heading="Teks Hero">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Eyebrow (ID)</label><input wire:model="hero_eyebrow_id" type="text" placeholder="Program Studi Unggulan" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Eyebrow (EN)</label><input wire:model="hero_eyebrow_en" type="text" placeholder="Featured Study Program" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Judul Utama (ID)</label><input wire:model="hero_title_id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Main Title (EN)</label><input wire:model="hero_title_en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Subjudul (ID)</label><textarea wire:model="hero_subtitle_id" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Subtitle (EN)</label><textarea wire:model="hero_subtitle_en" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Tombol CTA" class="mt-4">
                    <div class="grid grid-cols-3 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Tombol Utama (ID)</label><input wire:model="hero_primary_cta_label_id" type="text" placeholder="Daftar Sekarang" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Primary Button (EN)</label><input wire:model="hero_primary_cta_label_en" type="text" placeholder="Apply Now" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">URL Tombol Utama</label><input wire:model="hero_primary_cta_href" type="url" placeholder="https://smb.telkomuniversity.ac.id/" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Tombol Sekunder (ID)</label><input wire:model="hero_secondary_cta_label_id" type="text" placeholder="Pelajari Lebih Lanjut" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Secondary Button (EN)</label><input wire:model="hero_secondary_cta_label_en" type="text" placeholder="Learn More" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">URL Tombol Sekunder</label><input wire:model="hero_secondary_cta_href" type="text" placeholder="/profil" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Visibilitas Seksi Beranda" class="mt-4">
                    <div class="grid grid-cols-2 gap-4">
                        <label class="flex items-center gap-2">
                            <input wire:model="visible_tracer" type="checkbox" class="fi-checkbox-input rounded border" />
                            <span class="fi-fo-field-wrp-label">Tampilkan grafik Tracer Study (Tingkat Penyerapan Kerja)</span>
                        </label>
                        <label class="flex items-center gap-2">
                            <input wire:model="visible_cta" type="checkbox" class="fi-checkbox-input rounded border" />
                            <span class="fi-fo-field-wrp-label">Tampilkan banner CTA Penerimaan Mahasiswa Baru</span>
                        </label>
                    </div>
                </x-filament::section>
            </div>

            {{-- ── Tab: Identitas & Kontak ── --}}
            <div x-show="activeTab === 'identity'" x-cloak>
                <x-filament::section heading="Info Program Studi">
                    <div class="space-y-4">
                        <div><label class="fi-fo-field-wrp-label">Nama Prodi / Website</label><input wire:model="meta_name" type="text" placeholder="Teknik Logistik · Telkom University" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Alamat Lengkap</label><textarea wire:model="meta_address" rows="2" placeholder="Jl. Telekomunikasi No. 1, Bandung 40257" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Kontak" class="mt-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Email</label><input wire:model="contact_email" type="email" placeholder="logistik@telkomuniversity.ac.id" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Telepon / WhatsApp</label><input wire:model="contact_phone" type="text" placeholder="+62 22 7564108" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Media Sosial" class="mt-4">
                    <div class="grid grid-cols-3 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Instagram URL</label><input wire:model="social_instagram" type="url" placeholder="https://instagram.com/proditl" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Line URL</label><input wire:model="social_line" type="text" placeholder="https://line.me/..." class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">TikTok URL</label><input wire:model="social_tiktok" type="url" placeholder="https://tiktok.com/@proditl" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>
            </div>

            {{-- ── Tab: Sambutan Kaprodi ── --}}
            <div x-show="activeTab === 'greeting'" x-cloak>
                <x-filament::section heading="Profil Kaprodi">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Nama Lengkap Kaprodi</label><input wire:model="greeting_name" type="text" placeholder="Dr. Ir. Muhammad Akbar, S.T., M.T." class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">URL Profil (opsional)</label><input wire:model="greeting_link_href" type="text" placeholder="/dosen" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                    <div class="mt-4">
                        <label class="fi-fo-field-wrp-label">URL Foto Kaprodi</label>
                        <p class="text-xs text-gray-500 mt-0.5 mb-1">Masukkan URL foto yang sudah diupload ke /storage, atau link eksternal</p>
                        <input wire:model="greeting_photo" type="text" placeholder="https://... atau /storage/greeting/foto.jpg" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" />
                    </div>
                </x-filament::section>

                <x-filament::section heading="Kutipan" class="mt-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Kutipan (ID)</label><textarea wire:model="greeting_quote_id" rows="4" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Quote (EN)</label><textarea wire:model="greeting_quote_en" rows="4" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Atribusi (ID)</label><input wire:model="greeting_attribution_id" type="text" placeholder="Ketua Program Studi Teknik Logistik" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Attribution (EN)</label><input wire:model="greeting_attribution_en" type="text" placeholder="Head of Logistics Engineering" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Sambutan Lengkap" class="mt-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Sambutan Lengkap (ID)</label><textarea wire:model="greeting_full_message_id" rows="12" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Full Message (EN)</label><textarea wire:model="greeting_full_message_en" rows="12" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    </div>
                </x-filament::section>
            </div>

            {{-- ── Tab: Tracer Study ── --}}
            <div x-show="activeTab === 'tracer'" x-cloak>
                <x-filament::section heading="Keterangan Grafik">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Keterangan (ID)</label><input wire:model="tracer_caption_id" type="text" placeholder="Tingkat Serapan Kerja Lulusan" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Caption (EN)</label><input wire:model="tracer_caption_en" type="text" placeholder="Graduate Employment Rate" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Data per Tahun" class="mt-4">
                    @foreach($tracer_series as $i => $series)
                    <div class="flex items-end gap-3 mb-3 p-3 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex-1"><label class="fi-fo-field-wrp-label">Tahun</label><input wire:model="tracer_series.{{ $i }}.year" type="text" placeholder="2023" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div class="flex-1"><label class="fi-fo-field-wrp-label">Tingkat Serapan (%)</label><input wire:model="tracer_series.{{ $i }}.employment_rate" type="number" placeholder="92" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <button type="button" wire:click="removeTracerSeries({{ $i }})" class="mb-0.5 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addTracerSeries" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah Tahun
                    </button>
                </x-filament::section>
            </div>

            {{-- ── Tab: Prospek Karir ── --}}
            <div x-show="activeTab === 'prospects'" x-cloak>
                <x-filament::section heading="Judul Seksi">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Judul (ID)</label><input wire:model="prospects_heading_id" type="text" placeholder="Prospek Karir Luas" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Heading (EN)</label><input wire:model="prospects_heading_en" type="text" placeholder="Wide Career Prospects" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Jalur Karir" class="mt-4">
                    @foreach($prospects_tracks as $i => $track)
                    <div class="mb-4 p-4 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex justify-between mb-3"><span class="text-sm font-semibold" style="color:#6E4E33;">Jalur {{ $i + 1 }}</span><button type="button" wire:click="removeProspectsTrack({{ $i }})" class="text-xs text-red-600 hover:underline">Hapus</button></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="fi-fo-field-wrp-label">Judul (ID)</label><input wire:model="prospects_tracks.{{ $i }}.title_id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Title (EN)</label><input wire:model="prospects_tracks.{{ $i }}.title_en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="prospects_tracks.{{ $i }}.description_id" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="prospects_tracks.{{ $i }}.description_en" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        </div>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addProspectsTrack" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah Jalur Karir
                    </button>
                </x-filament::section>
            </div>

            {{-- ── Tab: Keunggulan Prodi ── --}}
            <div x-show="activeTab === 'distinct'" x-cloak>
                <x-filament::section heading="Judul Seksi">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Judul (ID)</label><input wire:model="distinct_heading_id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Heading (EN)</label><input wire:model="distinct_heading_en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="distinct_body_id" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="distinct_body_en" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div class="col-span-2"><label class="fi-fo-field-wrp-label">URL Tautan (opsional)</label><input wire:model="distinct_link_href" type="text" placeholder="/profil" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Poin Keunggulan" class="mt-4">
                    @foreach($distinct_points as $i => $point)
                    <div class="mb-4 p-4 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex justify-between mb-3"><span class="text-sm font-semibold" style="color:#6E4E33;">Poin {{ $i + 1 }}</span><button type="button" wire:click="removeDistinctPoint({{ $i }})" class="text-xs text-red-600 hover:underline">Hapus</button></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="fi-fo-field-wrp-label">Judul (ID)</label><input wire:model="distinct_points.{{ $i }}.title_id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Title (EN)</label><input wire:model="distinct_points.{{ $i }}.title_en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="distinct_points.{{ $i }}.description_id" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="distinct_points.{{ $i }}.description_en" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        </div>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addDistinctPoint" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah Poin Keunggulan
                    </button>
                </x-filament::section>
            </div>

            {{-- ── Tab: Kurikulum ── --}}
            <div x-show="activeTab === 'curriculum'" x-cloak>
                <x-filament::section heading="Ringkasan Kurikulum">
                    <p class="text-sm text-gray-500 mb-4">Data ini ditampilkan di halaman beranda dan halaman kurikulum sebagai ringkasan program.</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Total SKS</label><input wire:model="curriculum_total_sks" type="number" min="1" max="200" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label class="fi-fo-field-wrp-label">Jumlah Semester</label><input wire:model="curriculum_semesters" type="number" min="1" max="16" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </x-filament::section>
            </div>

            {{-- ── Tab: Visi & Misi ── --}}
            <div x-show="activeTab === 'about'" x-cloak>
                <x-filament::section heading="Visi Program Studi">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Visi (Bahasa Indonesia)</label><textarea wire:model="about_visi_id" rows="3" placeholder="Menjadi Program Studi S1 Teknik Logistik yang unggul..." class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Vision (English)</label><textarea wire:model="about_visi_en" rows="3" placeholder="To become an excellent..." class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Misi Program Studi" class="mt-4">
                    @foreach($about_misi as $i => $misi)
                    <div class="mb-3 p-4 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex justify-between mb-2"><span class="text-sm font-semibold" style="color:#6E4E33;">Misi {{ $i + 1 }}</span><button type="button" wire:click="removeAboutMisi({{ $i }})" class="text-xs text-red-600 hover:underline">Hapus</button></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="fi-fo-field-wrp-label">Misi (ID)</label><textarea wire:model="about_misi.{{ $i }}.id" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            <div><label class="fi-fo-field-wrp-label">Mission (EN)</label><textarea wire:model="about_misi.{{ $i }}.en" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        </div>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addAboutMisi" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah Misi
                    </button>
                </x-filament::section>

                <x-filament::section heading="Sejarah Singkat" class="mt-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Sejarah (ID)</label><textarea wire:model="about_history_id" rows="5" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">History (EN)</label><textarea wire:model="about_history_en" rows="5" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    </div>
                </x-filament::section>
            </div>

            {{-- ── Tab: Akreditasi ── --}}
            <div x-show="activeTab === 'accred'" x-cloak>
                <x-filament::section heading="Status Akreditasi">
                    <p class="text-sm text-gray-500 mb-4">Data ini ditampilkan di halaman <code>/profil/akreditasi</code>. Perbarui setiap kali terjadi pembaruan SK.</p>
                    <div class="space-y-4">
                        <div><label class="fi-fo-field-wrp-label">Nama Lembaga Akreditasi</label><input wire:model="accred_body_name" type="text" placeholder="LAM Teknik" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="fi-fo-field-wrp-label">Status Akreditasi (ID)</label><input wire:model="accred_status_id" type="text" placeholder="Terakreditasi: UNGGUL" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Accreditation Status (EN)</label><input wire:model="accred_status_en" type="text" placeholder="Accreditation Rank: UNGGUL (Excellent)" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="accred_desc_id" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="accred_desc_en" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        </div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="SK Akreditasi" class="mt-4">
                    @foreach($accred_decrees as $i => $decree)
                    <div class="mb-4 p-4 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex justify-between mb-3"><span class="text-sm font-semibold" style="color:#6E4E33;">SK #{{ $i + 1 }}</span><button type="button" wire:click="removeAccredDecree({{ $i }})" class="text-xs text-red-600 hover:underline">Hapus</button></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="fi-fo-field-wrp-label">Judul SK (ID)</label><input wire:model="accred_decrees.{{ $i }}.title.id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                                <div><label class="fi-fo-field-wrp-label">Decree Title (EN)</label><input wire:model="accred_decrees.{{ $i }}.title.en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            </div>
                            <div><label class="fi-fo-field-wrp-label">Nomor SK</label><input wire:model="accred_decrees.{{ $i }}.number" type="text" placeholder="No: 0451/SK/LAM-Teknik/IV/2025" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="fi-fo-field-wrp-label">Keterangan (ID)</label><textarea wire:model="accred_decrees.{{ $i }}.description.id" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                                <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="accred_decrees.{{ $i }}.description.en" rows="2" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addAccredDecree" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah SK Akreditasi
                    </button>
                </x-filament::section>
            </div>

            {{-- ── Tab: Riset & PKM ── --}}
            <div x-show="activeTab === 'research'" x-cloak>
                <x-filament::section heading="Bidang Penelitian & PKM">
                    <p class="text-sm text-gray-500 mb-4">Ditampilkan di halaman <code>/riset</code>. Ikon menggunakan nama ikon Lucide (code, compass, heart, flask, briefcase, book, star, globe).</p>
                    @foreach($research_areas as $i => $area)
                    <div class="mb-4 p-4 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex justify-between mb-3"><span class="text-sm font-semibold" style="color:#6E4E33;">Bidang {{ $i + 1 }}</span><button type="button" wire:click="removeResearchArea({{ $i }})" class="text-xs text-red-600 hover:underline">Hapus</button></div>
                        <div class="space-y-3">
                            <div><label class="fi-fo-field-wrp-label">Ikon</label>
                                <select wire:model="research_areas.{{ $i }}.icon" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm">
                                    @foreach(['code','compass','heart','flask','briefcase','book','star','globe'] as $icon)
                                    <option value="{{ $icon }}">{{ $icon }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-3">
                                <div><label class="fi-fo-field-wrp-label">Nama Bidang (ID)</label><input wire:model="research_areas.{{ $i }}.title.id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                                <div><label class="fi-fo-field-wrp-label">Area Name (EN)</label><input wire:model="research_areas.{{ $i }}.title.en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                                <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="research_areas.{{ $i }}.description.id" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                                <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="research_areas.{{ $i }}.description.en" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addResearchArea" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah Bidang Riset
                    </button>
                </x-filament::section>
            </div>

            {{-- ── Tab: MBKM ── --}}
            <div x-show="activeTab === 'mbkm'" x-cloak>
                <x-filament::section heading="Deskripsi Program MBKM">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="mbkm_desc_id" rows="4" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="mbkm_desc_en" rows="4" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                    </div>
                </x-filament::section>

                <x-filament::section heading="Skema Program" class="mt-4">
                    @foreach($mbkm_programs as $i => $program)
                    <div class="mb-4 p-4 rounded-lg" style="background: rgba(140,100,65,0.04); border: 1px solid rgba(140,100,65,0.12);">
                        <div class="flex justify-between mb-3"><span class="text-sm font-semibold" style="color:#6E4E33;">Program {{ $i + 1 }}</span><button type="button" wire:click="removeMbkmProgram({{ $i }})" class="text-xs text-red-600 hover:underline">Hapus</button></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="fi-fo-field-wrp-label">Nama Program (ID)</label><input wire:model="mbkm_programs.{{ $i }}.title.id" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Program Name (EN)</label><input wire:model="mbkm_programs.{{ $i }}.title.en" type="text" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm" /></div>
                            <div><label class="fi-fo-field-wrp-label">Deskripsi (ID)</label><textarea wire:model="mbkm_programs.{{ $i }}.description.id" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                            <div><label class="fi-fo-field-wrp-label">Description (EN)</label><textarea wire:model="mbkm_programs.{{ $i }}.description.en" rows="3" class="fi-input block w-full mt-1 rounded-lg border px-3 py-2 text-sm"></textarea></div>
                        </div>
                    </div>
                    @endforeach
                    <button type="button" wire:click="addMbkmProgram" class="mt-2 rounded-lg border border-dashed px-4 py-2 text-sm font-medium" style="border-color: rgba(140,100,65,0.30); color: #8C6441;">
                        + Tambah Skema Program
                    </button>
                </x-filament::section>
            </div>

            {{-- Save button --}}
            <div class="flex justify-end pt-2">
                <x-filament::button type="submit" color="primary" icon="heroicon-o-check" size="lg">
                    Simpan Semua Pengaturan
                </x-filament::button>
            </div>

        </form>
    </div>
</x-filament-panels::page>
